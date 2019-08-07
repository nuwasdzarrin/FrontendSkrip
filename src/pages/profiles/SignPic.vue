<template>
  <div>
    <h4>my signature</h4>
    <div class="row row-centered row-second">
      <div class="col-sm-8">
        <table class="table table-striped table-hover">
          <thead class="thead-light">
            <tr>
              <th>ID</th>
              <th>namePic</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in pic" v-bind:key="i.id">
              <td>{{ i.id }}</td>
              <td>{{ i.namePic }}</td>
              <td>
                <button class="btn btn-danger">delete</button>
                <!-- <router-link :to="{ name: 'SignIssuerId', params: { id: i.id }}" class="btn btn-primary">Detail</router-link> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-header">
            <h5>add signature</h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="label">namePic :</label>
              <input type="text" class="form-control" v-model="namePic" />
            </div>
            <VueSignaturePad id="signature" width="100%" height="100%" ref="signaturePad" />
            <br />
            <button class="btn btn-secondary card-link" @click="undo">Undo</button>
            <button class="btn btn-primary card-link" @click="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { APIENDPOINT, getHeader } from "../../config/app.config";
import axios from "axios";
export default {
  data() {
    return {
      pic: [],
      namePic: ""
    };
  },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const memberId = JSON.parse(window.localStorage.getItem("lbUser")).userId;
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      var dataj = data.replace("data:image/png;base64,", "");
      // console.log(isEmpty);
      // console.log("ini isi file dari data: "+jadi);
      axios
        .post(
          APIENDPOINT + "/picture/uploadPictureSign",
          {
            basePic: dataj,
            namePic: this.namePic+".png",
            memberId: memberId
          },
          getHeader()
        )
        .then(res => {
          console.log(res);
          alert("Pic Signature success to create");
        })
        .catch(err => {
          throw err;
        });
    }
  },
  created: function() {
    const memberId = JSON.parse(window.localStorage.getItem("lbUser")).userId;
    axios
      .get(APIENDPOINT + "/picture/getPictureSign?memberId=" + memberId, getHeader())
      .then(resp => {
        this.pic = resp.data;
      })
      .catch(err => {
        throw err;
      });
  }
};
</script>
<style>
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>

