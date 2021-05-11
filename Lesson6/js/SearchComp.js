Vue.component('search', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `
            <form action="#" class="search-form" >
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit" @click="$parent.$refs.products.filter(userSearch)">
                    <i class="fas fa-search"></i>
                </button>
            </form>
    `
});
