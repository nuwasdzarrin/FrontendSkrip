// Index.vue

<template>
    <div>
        <h1>Items For Issuer</h1>

        <table class="table table-striped table-hover">
            <thead class="thead-light">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Title</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Control</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="i in items" v-bind:key="i.id">
                    <td>{{ i.id }}</td>
                    <td>{{ i.pdfName }}</td>
                    <td>{{ i.title }}</td>
                    <td>{{ i.reason }}</td>
                    <td>{{ i.status }}</td>
                    <td>
                        <router-link :to="{ name: 'SignIssuerId', params: { id: i.id }}" class="btn btn-primary">Detail</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { APIENDPOINT, getHeader } from "../../config/app.config";
import { session } from '../../constants'
import axios from 'axios';
export default {
    data(){
        return{
            items :[]
        }
    },
    created: function() {
        const userId = JSON.parse(session).userId
        axios.get(APIENDPOINT + "/sign?issuerId=" + userId, getHeader())
        .then((res)=>{
            this.items = res.data
        }). catch((err)=>{
            console.log(err);
        })
    }
}
</script>
<style>
.table{
  width: 99%;
}
</style>
