<template>
  <div>
    <h4>my certificate</h4>
    <div class="row row-centered row-second">
      <div class="col-sm-6">
        <table class="table table-striped table-hover">
          <thead class="thead-light">
            <tr>
              <th>ID</th>
              <th>Cert</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in Certs.allCert" v-bind:key="i.id">
              <td>{{ i.id }}</td>
              <td>{{ i.certificate }}</td>
              <td>
                  <button class="btn btn-danger">delete</button>
                <!-- <router-link :to="{ name: 'SignIssuerId', params: { id: i.id }}" class="btn btn-primary">Detail</router-link> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-6">
        <form @submit.prevent="sendCert" enctype="multipart/form-data">
          <label for="file" class="label">Add Certificate</label>
          <div
            v-if="Certifs.mesCert"
            :class="`message ${Certifs.errCert ? 'is-danger' : 'is-success'}`"
          >
            <div class="message-body">{{ Certifs.mesCert }}</div>
          </div>
          <div class="field">
            <div class="file is-boxed is-primary">
              <label class="file-field">
                <input type="file" name id ref="cert" @change="selectCert" class="file-input" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Choose a cert...</span>
                </span>
                <span class="file-name" v-if="Certifs.cert">{{Certifs.cert.name}}</span>
              </label>
            </div>
          </div>
          <div class="field">
            <button class="button is-info">Send</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { APIENDPOINT, getHeader } from "../../config/app.config";
import { session } from "../../constants";
import axios from "axios";
export default {
  data() {
    return {
    Certs: {
        allCert: [],
        selCert: ""
      },
      Certifs: {
        mesCert: "",
        cert: "",
        nameFil:"",
        errCert: false
      }
    };
  },

  methods: {
    selectCert() {
      this.Certifs.cert = this.$refs.cert.files[0];
      this.Certifs.mesCert = "";
      this.Certifs.errCert = false;
    },
    sendCert() {
      const userId = JSON.parse(session).userId
      const formCert = new FormData();
      formCert.append("cert", this.Certifs.cert);
      axios.post(
          APIENDPOINT + "/uploadcert?memberId=" + userId,
          formCert,
          getHeader()
        ).then((res)=>{
            this.Certs.allCert.push({certificate: res.data.FileName, id: '' , memberId: userId})
            this.Certifs.nameFil = res.data.FileName;
            this.Certifs.mesCert = "Certificate has been Uploaded";
            this.Certifs.cert = "";
            this.Certifs.errCert = false;
        }).catch ((err) => {
            throw err;
            this.Certifs.mesCert = "Something went wrong";
            this.Certifs.errCert = true;
        })
    }
  },
  created: function() {
        const userId = JSON.parse(session).userId
        axios
          .get(APIENDPOINT + "/uploadcert?memberId=" + userId, getHeader())
          .then(resp => {
            this.Certs.allCert = resp.data
          })
          .catch(err => {
            throw err
          });
    }

};
</script>
<style>
.row-centered {
  text-align: center;
}

.file {
  justify-content: center;
}

.row-second {
  margin-bottom: 22px;
}
</style>
