const app = new Vue({
    el: '#app',
    data: {
        url: null,
        slug: null,
        isActive: false,
        responseMessage: null,
        isLinkUsable: false,
        redirectURL: null
    },
    methods:{
        getShortUrl: async function(){
            var formData = null;
            if(this.slug != ""){
                formData = {url:this.url, slug:this.slug};
            }else{
                formData = {url:this.url}
            }
            const response = await fetch('/url', {
                method: 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                this.isActive=true;
                this.responseMessage=data.message;
                if(data.url){
                    if(this.slug != "" || !this.slug || this.slug == null){
                        this.slug = data.slug;
                    }
                    this.isLinkUsable = true;
                    this.redirectURL = `${window.location.origin}/${this.slug}`
                    this.responseMessage = "Link is Created😍"
                    
                }
            })
            .catch((err) => {
                console.error("Error : ", err);
            })
        },
        goBack: function(){
            this.isActive=false;
            console.log(this.isActive);
        }
    }
})