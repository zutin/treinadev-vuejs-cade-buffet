const app = Vue.createApp({
  data(){
    return{
      searchQuery: '',
      listBuffets: []
    }
  },
  computed:{
    listResult(){
      if(this.searchQuery){
        return this.listBuffets.filter(buffet => {
          return buffet.trading_name.toLowerCase().includes(this.searchQuery.toLowerCase());
        })
      }else{
        return this.listBuffets;
      }
    }
  },
  async mounted(){
    this.listResult = await this.getData();
  },
  methods:{
    async getData(){
      let response = await fetch('http://127.0.0.1:3000/api/v1/buffets');

      let data = await response.json();

      this.listBuffets = [];

      data.forEach(item => {
        var buffet = new Object();
        buffet.trading_name = item.trading_name;
        buffet.contact_number = item.contact_number;
        buffet.email = item.email;
        buffet.address = item.address;
        buffet.district = item.district;
        buffet.state = item.state;
        buffet.city = item.city;
        buffet.zipcode = item.zipcode;
        if(item.description.length > 100){
          buffet.description = item.description.substring(0, 100) + '...';
        }else{
          buffet.description = item.description;
        }
        buffet.payment_methods = item.payment_methods;

        this.listBuffets.push(buffet);
      });
    }
  }
})

// const app = Vue.createApp({
//   data(){
//     return{
//       buffetName: 'Buffet 1',
//       pic: 'https://randomuser.me/api/portraits/women/12.jpg',

//       listBuffets: [
//         {
//           name: 'oi 1'
//         },
//         {
//           name: 'oi 2'
//         }
//       ]
//     }
//   },
//   methods:{
//     changeData(){
//       console.log('Dados alterados')
//     }
//   }
// })

app.mount('#app');