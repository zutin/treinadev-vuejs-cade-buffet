const app = Vue.createApp({
  data(){
    return{
      buffet: [],
      eventList: [],
      dateQuery: '',
      searchQuery: '',
      eventAvailable: 0,
      currentPage: 'index',
      buffetList: []
    }
  },
  computed:{
    listResult(){
      if(this.searchQuery){
        return this.buffetList.filter(buffet => {
          return buffet.trading_name.toLowerCase().includes(this.searchQuery.toLowerCase());
        })
      }else{
        return this.buffetList;
      }
    }
  },
  async mounted(){
    this.listResult = await this.getData();
  },
  methods:{
    seeMore(buffet){
      this.buffet = buffet;
      this.getEvents(buffet.id);
      this.dateQuery = '';
      this.eventAvailable = '';
      this.currentPage = 'buffet';
    },
    async availabilityCheck(id, date){
      let response = await fetch('http://127.0.0.1:3000/api/v1/events/'+id+'?date='+date+'&guests=10');
      let data = await response.json();

      if(data.available){
        this.eventAvailable = 1
      }else{
        this.eventAvailable = 2
      }
    },
    goBack(){
      this.currentPage = 'index'
      this.buffet = [];
      this.eventList = [];
    },
    async getEvents(id){
      let response = await fetch('http://127.0.0.1:3000/api/v1/buffets/'+id+'/events');
      let data = await response.json();

      this.eventList = [];

      data.forEach(item => {
        var event = new Object();
        event.id = item.id;
        event.name = item.name;
        event.description = item.description;
        event.minimum_participants = item.minimum_participants;
        event.maximum_participants = item.maximum_participants;
        event.default_duration = item.default_duration;
        event.menu = item.menu
        event.alcoholic_drinks = item.alcoholic_drinks;
        event.decorations = item.decorations;
        event.valet_service = item.valet_service;
        event.can_change_location = item.can_change_location;

        this.eventList.push(event);
      });
    },
    async getData(){
      let response = await fetch('http://127.0.0.1:3000/api/v1/buffets');

      let data = await response.json();

      this.buffetList = [];

      data.forEach(item => {
        var buffet = new Object();
        buffet.id = item.id;
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

        this.buffetList.push(buffet);
      });
    }
  }
})

app.mount('#app');