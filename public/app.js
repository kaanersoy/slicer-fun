const app = new Vue({
    el: '#app',
    data: {
        url: null,
        slug: null,
        isCreated: false
    },
    methods:{
        getShortUrl: async () => {
            const data = {
                url,
                slug
            }
            const response = await fetch('/url', {
                method: 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify(data)
            })
            return response.json();
        }
    }
})