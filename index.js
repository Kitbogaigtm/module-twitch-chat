module.exports = class extends window.casthub.module {

    /**
     * Initialize the new Module.
     */
    constructor() {
        super();

        // Create the iFrame for the embed.
        this.$iframe = document.createElement('iframe');
        this.$iframe.scrolling = 'no';
        this.$iframe.classList.add('iframe');
        this.addEl(this.$iframe);

        // Set the Module CSS.
        this.css = `
            .module {
                display: flex;
                width: 100%;
                height: 100%;
                flex-direction: row;
            }

            .iframe {
                display: block;
                width: 100%;
                height: 100%;
                border: none;
            }
        `;
    }

    /**
     * Run any asynchronous code when the Module is mounted to DOM.
     *
     * @return {Promise}
     */
    mounted() {
        if (!this.identities.length) {
            return Promise.reject('No Integration data present');
        }

        const { id } = this.identities[0];

        return super.mounted().then(() => {
            return window.casthub.fetch({
                integration: 'twitch',
                method: 'GET',
                url: 'kraken/channel',
                identity: id,
            });
        }).then(response => {
            this.channel = response.name;
        });
    }

    /**
     * Sets the Channel for the Chat.
     *
     * @param {String} channel
     */
    set channel(channel) {
        this.$iframe.src = `https://www.twitch.tv/embed/${channel}/chat`;
    }

};
