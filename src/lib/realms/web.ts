import axios from 'axios'
import { Realm } from './realm'
import { Router } from 'vue-router';


export class WebRealm extends Realm {
    constructor() {
        super();
        this._incantations = [
            { title: 'Send Web Request', handler: this.sendWebRequest, args: [{ name: 'method' }], isGlobal: true }
        ]
    }

    protected async sendWebRequest(args: Record<string, any>, router: Router): Promise<string> {
        console.log('Called method', args)
        switch (args.method) {
            case 'POST':
                console.log('Sent POST request', args.url)
                // axios.post(url, data, config)
                return 'Post outcome'
            case 'GET':
                console.log('Sent GET request', args.url)
                // axios.get(url, config)
                return 'get outcome'
        }
        return ''
    }

    get incantations() {
        return this._incantations
    }
}
