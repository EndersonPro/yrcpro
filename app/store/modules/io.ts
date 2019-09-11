export default {
    namespaced: true,
    state: () =>{
        io:'hola'
    },
    getters:{
        // @ts-ignore
        io: state => state.io,
    },
    actions:{

    },
    mutations:{

    }
}