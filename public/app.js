// const { response } = require("express");

const app = new Vue({
    el: '#app',
    data: {
        url: null,
        slug: null,
        isActive: false,
        responseMessage: null,
        isLinkUsable: false,
        createdUrl: null,
        createdUrls: [],
        copiedUrl: null,
        alertMessage: false,
    },
    methods:{
        getShortUrl: async function(){
            var formData = null;
            if(this.slug != ""){
                formData = {url:this.url, slug:this.slug};
            }else{
                formData = {url:this.url}
            }
            var isCreatedBefore = false;
            this.createdUrls.forEach(el => {
                if(el.url == this.url){
                    isCreatedBefore = true;
                }
            });
            if(isCreatedBefore){
                this.responseMessage = "Don't use URL you created before!🤦‍♀️";
                if(this.alertMessage){
                    this.disableAlertMess();
                    setTimeout(() => {
                        this.activeAlertMess();
                    }, 220);
                }else{
                    this.activeAlertMess();
                }
            }else{
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
                    if(data.url){
                        this.createdUrl = data;
                        this.createdUrls.push(this.createdUrl);
                        this.isLinkUsable = true;
                        this.responseMessage = "Link is Created😍";
                    }
                    this.disableAlertMess();
                    setTimeout(() => {
                        this.activeAlertMess();
                    }, 220);
                })
                .catch((err) => {
                    console.error("Error : ", err);
                })
            }
        },
        copyToClipboard: function(e){
            var buttonId = e.target.id;
            var selectedInput = document.getElementsByName(buttonId)[0];
            selectedInput.focus();
            selectedInput.select();
            selectedInput.setSelectionRange(0, 99999);
            document.execCommand("copy");
            this.copiedUrl = buttonId;
        },
        activeAlertMess: function(){
            this.alertMessage = true;
        },
        disableAlertMess: function(){
            this.alertMessage = false;
        }
    }
})
