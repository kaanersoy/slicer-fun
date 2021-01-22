const app = new Vue({
    el: '#app',
    data: {
        url: null,
        slug: null,
        isActive: false,
        responseMessage: null,
        isLinkUsable: false,
        redirectURL: null,
        createdUrl: null,
        createdUrls: [],
        copiedUrl: null,
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
                if((data.message && data.message.startsWith("url must be a `string` type")) || data.message && data.message.startsWith("url is a required field")){
                    this.responseMessage = "Please enter a URL🤷‍♂️."
                }else{
                    this.responseMessage=data.message;
                }

                if(this.isActive == false){
                    this.isActive = true;
                } 
                if(data.url){
                    // if(this.slug != "" || !this.slug || this.slug == null){
                    //     this.slug = data.slug;
                    // }
                    this.createdUrl = data;
                    this.createdUrls.push(this.createdUrl);
                    this.isLinkUsable = true;
                    this.redirectURL = `${window.location.origin}/${this.slug}`;
                    this.responseMessage = "Link is Created😍";
                }
            })
            .catch((err) => {
                console.error("Error : ", err);
            })
        },
        // goBack: function(){
        //     this.isActive=false;
        //     this.isLinkUsable=false;
        // },
        copyToClipboard: function(e){
            var buttonId = e.target.id;
            var selectedInput = document.getElementsByName(buttonId)[0];
            selectedInput.focus();
            selectedInput.select();
            selectedInput.setSelectionRange(0, 99999);
            document.execCommand("copy");
            this.copiedUrl = buttonId;
        },
    }
})