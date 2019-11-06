import Vue from "vue"
import Main from "./main"

new Vue({
    el:"#app",
    render: function(h){
        return h(Main);
    }
});
