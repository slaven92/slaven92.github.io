<template>
    <div class="container">
        <h1>Chat</h1>
        <div class="chat">
            <p v-for="(text,index) in textList" :key="index">{{ text }}</p>
        </div>

        <div class="input-group">
            <input
              id="search"
              type="text"
              v-model="msgText"
              class="form-control"
              placeholder="Enter text..."
            />
        </div>
        <button class="btn btn-primary" @click="sendMessage">Send</button>
    </div>
</template>

<script>

export default{
    data() {
        return {
            textList:["slaven","car"],
            msgText:"",
            ws:null,
        }
    },
    methods:{
        sendMessage(){
            this.ws.send(this.msgText)
            this.textList.push(event.data)
            this.msgText=""
        },
        recieveMessage(event) {
            this.textList.push(event.data)
        },
        getRandomString(){
            return Math.random().toString(36).substr(4)
        }
    },
    async mounted () {
        this.ws =  new WebSocket(`ws://localhost:8000/ws/${this.getRandomString()}`);
        this.ws.onmessage = this.recieveMessage
    },
}

</script>