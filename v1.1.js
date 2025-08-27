// ==UserScript==
// @name         Bloxd Multiaccounting system 
// @version      1.1
// @description  Type "RESET" in party code to create a new account. Click one of the ids in the main menu to log into that account.
// @author       Цветочек Кактус (Cvetocheckcactus)
// @match        https://bloxd.io/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener("load", () => {
        let accounts=localStorage.getItem("BloxdMultiAccounts")
        if (accounts==null) {
        localStorage.setItem("BloxdMultiAccounts",'[]')
        accounts=[]
        } else {
        accounts=JSON.parse(localStorage.getItem("BloxdMultiAccounts"))
        }
        let party=document.querySelector(".JoinPartyInput")
        let title=document.querySelector(".Title")
        title.innerText="FreeBanGiveaway!"

        for (let a =0; a<accounts.length; a++){
        let curdata=accounts[a]
        let i = accounts[a][1]
        let accEl = document.createElement("div");

        accEl.setAttribute("Account_key",i)
        accEl.setAttribute("style", `
        z-index: 999999;
        font-size: 20px;
        color: red;
        position: relative;
        background-color: lightblue;
        top: 50px;
        left: 20px;
        width: 250px;
        height: 50px;
        overflow-x: scroll;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
        margin-bottom: 25px;
        white-space: pre;
        border: solid black 3px;
        border-radius: 10px
        `);


        accEl.onclick=() => {
            document.cookie = "___Secure-3PSIDMC="+i;
            window.location.reload()
        };

        accEl.textContent = `${a}: ${curdata[0]}`;
        document.body.appendChild(accEl);
        }



        if(party==null) return
        party.addEventListener("input", (event) => {
            if (event.target.value.toUpperCase()=="RESET"){
                let cookies = document.cookie.split(";");
                for (let cook of cookies){
                    cook=cook.trim()
                    let name = document.querySelector(".PlayerNamePreview").innerText
                    if (cook.startsWith("___Secure-")){
                        accounts.push([name,cook.split("=")[1]])
                        document.cookie=cook.split("=")[0]+"=; max-age=0; path=/"
                        localStorage.setItem("BloxdMultiAccounts",JSON.stringify(accounts))
                        window.location.reload()
                    }
                }



            }
        });
    });

})();