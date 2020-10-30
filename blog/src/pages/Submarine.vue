<template>
    <Layout>

        <div class="container">

            <div v-if='status === "start"'>
                <NameSelect @create-game="createGame" @join-game="joinGame"/>
            </div>


            <div class="row justify-content-center">
                <div class="col-md-3">
                    <Moveable>
                    Slaven
                    </Moveable>
                </div>

                <div class="col-md-6">
                    <Table class="tablee"/>
                </div>
            </div>
            <Chat/>
        </div>
    </Layout>
</template>

<script>
import Moveable from '~/components/submarine/Moveable.vue'
import Table from '~/components/submarine/Table.vue'
import Chat from '~/components/submarine/Chat.vue'
import NameSelect from '~/components/submarine/NameSelect.vue'

export default{
    data() {
        return {
            status: "start"
        }
    },
    components: {
        Moveable,
        Table,
        Chat,
        NameSelect,
    },
    methods:{
        createGame(name, channel) {
            console.log(name, channel, "create")
        },
        joinGame(name, channel) {
            console.log(name, channel, "join")
        }
    },
}

</script>

<style scoped>
.container {
    margin-top: 50px;
}
</style>