import Vue from 'vue'
var vm = new Vue()
export const successMsg = (msg) => {
    vm.$message({
        message: msg,
        type: 'success'
    });
};
export const warringMsg = (msg) => {
    vm.$message({
        message: msg,
        type: 'warning'
    });
};