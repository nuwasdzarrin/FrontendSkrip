<template>
  <div>
    <h3>Sign PDF and Request Signature</h3>
    <div class="row row-centered row-second">
      <div class="col-sm-8">
        <form @submit.prevent="sendFile" enctype="multipart/form-data">
          <label for="file" class="label">Upload File PDF</label>
          <div v-if="PDFs.message" :class="`message ${PDFs.error ? 'is-danger' : 'is-success'}`">
            <div class="message-body">{{ PDFs.message }}</div>
          </div>
          <div class="field">
            <div class="file is-boxed is-primary">
              <label class="file-field">
                <input type="file" name id ref="file" @change="selectFile" class="file-input" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Choose a file...</span>
                </span>
                <span class="file-name" v-if="PDFs.file">{{PDFs.file.name}}</span>
              </label>
            </div>
          </div>
          <div class="field">
            <button class="button is-info">Send</button>
          </div>
        </form>
      </div>
      <div class="col-sm-4">
        <!-- row 1 kolom 4 kosong -->
      </div>
    </div>
    <!--   -->
    <div class="row row-second">
      <div class="col-sm-8">
        <div v-if="Responses.resSign" :class="`message ${Responses.signStat ? 'is-success' : 'is-danger'}`">
          <div class="message-body">{{ Responses.resSign }} to sign {{ Responses.namePDF }}</div>
        </div>
        <canvas id="the-canvas" style="border:1px  solid black"></canvas>
        
      </div>
      <div class="col-sm-4 identitas">
        <div class="card">
          <div class="card-header">
            <h5>Signature Component</h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="label">Request to:</label>
              <select
                v-model="Issuers.selectIssuer"
                name="issuer"
                id="issuer"
                class="form-control"
                tabindex="12"
              >
                <option
                  v-for="i in Issuers.allIssuer"
                  :key="i.id"
                  :value="i.memberId"
                >{{ i.firstName + " " + i.lastName }}</option>
              </select>
            </div>
              <div class="form-group">
                  <label for="certificate">Select Certificate</label>
                    <select
                    v-model="Certs.selCert"
                    name="cert"
                    id="cert"
                    class="form-control"
                    tabindex="12"
                    >
                    <option
                        v-for="i in Certs.allCert"
                        :key="i.id"
                        :value="i.certificate"
                    >{{ i.certificate }}</option>
                    </select>
              </div>
            <div class="form-group">
              <label for="pic">Select Signature Pic</label>
               <select
                  v-model="Pics.selPic"
                  name="pic"
                  id="pic"
                  class="form-control"
                  tabindex="12"
                >
                  <option
                    v-for="n in Pics.pic"
                    :key="n.id"
                    :value="n.namePic"
                  >{{ n.namePic }}</option>
                </select>
             </div>
             <div class="form-group">
               <label for="visible">visibilitas digital signature :&nbsp;&nbsp; </label>
                <label class="radio-inline"><input type="radio" v-model="Signs.visible"  value=true checked>Yes</label>
                <label for="space"> &nbsp;or&nbsp; </label>
                <label class="radio-inline"><input type="radio" v-model="Signs.visible"  value=false>No</label>
             </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Certificate selected : {{ Certs.selCert }}</li>
              <li class="list-group-item">Sign Img selected : {{ Pics.selPic }}</li>
              <li class="list-group-item">Position of Sign: X= {{PdfViewer.positions.x}} , Y= {{PdfViewer.positions.y}}</li>
            </ul>
          </div>
        </div>
        <br>
        <div class="card">
          <div class="card-header">
            <h5>Siganture Identity</h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="label">author :</label>
              <input type="text" class="form-control" v-model="Signs.author" />
            </div>
            <div class="form-group">
              <label for="label">title sign:</label>
              <input type="text" class="form-control" v-model="Signs.title" />
            </div>
            <div class="form-group">
              <label for="label">subject :</label>
              <input type="text" class="form-control" v-model="Signs.subject" />
            </div>
            <div class="form-group">
              <label for="label">keyword :</label>
              <input type="text" class="form-control" v-model="Signs.keyword" />
            </div>
            <div class="form-group">
              <label for="label">reason :</label>
              <input type="text" class="form-control" v-model="Signs.reason" />
            </div>
            <div class="form-group">
              <label for="label">email :</label>
              <input type="text" class="form-control" v-model="Signs.email" />
            </div>
            <div class="form-group">
              <label for="label">location :</label>
              <input type="text" class="form-control" v-model="Signs.location" />
            </div>
            <div class="form-group">
              <label for="label">password :</label>
              <input type="password" class="form-control" v-model="Signs.password" />
            </div>
            <div class="field">
              <!-- <button class="button is-danger">Sign</button> -->
              <button
                @click="postSign"
                class="btn btn-success"
                type="submit"
                value="uploadArtikel"
              >Sign this pdf</button>
            </div>
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
  name: "UploadPDF",

  data() {
    return {
        Pics:{
            pic:[],
            selPic:''
      },
      PdfViewer: {
        position: null,
        positions: {
          x:'',
          y:''
        },
        pdfScale : 1,
        url : ''
      },
      Certs: {
        allCert: [],
        selCert: ""
      },
      PDFs: {
        file: "",
        message: "",
        error: false
      },
      Signs: {
        author: "",
        title: "",
        subject: "",
        keyword: "",
        reason: "",
        email: "",
        location: "",
        password: "",
        visible: true
      },
      Responses: {
        namePDF: "",
        resSign: "",
        IdSign: "",
        signStat: false
      },
      Issuers: {
        allIssuer: [],
        selectIssuer: ""
      }
    };
  },

  methods: {
    selectFile() {
      this.PDFs.file = this.$refs.file.files[0];
      this.PDFs.message = "";
      this.PDFs.error = false;
    },
    async sendFile() {
      const authUser = JSON.parse(window.localStorage.getItem("lbUser"));
      const formData = new FormData();
      var vim = this;
      formData.append("file", this.PDFs.file);
      try {
        var responPDF = await axios.post(
          APIENDPOINT + "/pdf/uploadPDF",
          formData,
          getHeader()
        );
        this.Responses.namePDF = responPDF.data.FileName;
        this.Responses.IdSign = responPDF.data.IdSign;
        this.PDFs.message = "File has been Uploaded";
        this.PDFs.file = "";
        this.PDFs.error = false;

        this.PdfViewer.url = "http://localhost:58187/api/pdf/getPDF?nameFile=" + responPDF.data.FileName;
        
        vim.fetchPDF();
        var myImg = document.getElementById("the-canvas");
        myImg.onmousedown = vim.GetCoordinates;
        vim.PdfViewer.position = vim.FindPosition(myImg);
      } catch (err) {
        this.PDFs.message = "Something went wrong";
        this.PDFs.error = true;
      }
    },
    postSign() {
      const userId = JSON.parse(window.localStorage.getItem('lbUser')).userId;
      var vim = this;
      let newSigns = {
        author: this.Signs.author,
        title: this.Signs.title,
        subject: this.Signs.subject,
        keyword: this.Signs.keyword,
        reason: this.Signs.reason,
        email: this.Signs.email,
        location: this.Signs.location,
        pdfName: this.Responses.namePDF,
        certName: this.Certs.selCert,
        password: this.Signs.password,
        requestorId : userId,
        issuerId : this.Issuers.selectIssuer,
        picName : this.Pics.selPic,
        posX : this.PdfViewer.positions.x,
        posY : this.PdfViewer.positions.y,
        visible : this.Signs.visible
      };
      // console.log(newSigns)
      axios
        .put(
          APIENDPOINT + "/requestor/signSelf?id=" + this.Responses.IdSign,
          newSigns,
          getHeader()
        )
        .then(res => {
          this.Responses.signStat = true;
          this.Responses.resSign = "Successful";
          this.Signs.author = "";
          this.Signs.title = "";
          this.Signs.subject = "";
          this.Signs.keyword = "";
          this.Signs.reason = "";
          this.Signs.email = "";
          this.Signs.location = "";
          this.Certs.selCert = "";
          this.Signs.password = "";

          this.PdfViewer.url = "http://localhost:58187/api/pdf/getPDF?nameFile=sign_" + this.Responses.namePDF;
          vim.fetchPDF();
        })
        .catch(err => {
          throw err
          this.Responses.signStat = false
          this.Responses.resSign = "Unsuccessful";
        });
    },

    fetchPDF() {
      return import(
        'pdfjs-dist/webpack'
      ).
        then(pdfjs => pdfjs.getDocument(this.PdfViewer.url)).
        then(pdf => (this.displayPage(pdf, 1))).
        then(pdf => (this.pdf = pdf))
    },

    renderPage(page) {
      var scale = this.PdfViewer.pdfScale; // render with global pdfScale variable
      var viewport = page.getViewport(scale);
      var canvas = document.getElementById("the-canvas");
      var context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    },

    displayPage(pdf, num) {
      var vm = this;
      pdf.getPage(num).then(function getPage(page) {
        vm.renderPage(page);
      });
    },

    FindPosition(oElement) {
      if (typeof oElement.offsetParent != "undefined") {
        for (
          var posX = 0, posY = 0;
          oElement;
          oElement = oElement.offsetParent
        ) {
          posX += oElement.offsetLeft;
          posY += oElement.offsetTop;
        }
        return [posX, posY];
      } else {
        return [oElement.x, oElement.y];
      }
    },

    GetCoordinates(e) {
      // console.log(e);
      var PosX = 0;
      var PosY = 0;
      if (!e) e = window.event;
      if (e.pageX || e.pageY) {
        PosX = e.pageX;
        PosY = e.pageY;
      } else if (e.clientX || e.clientY) {
        PosX =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        PosY =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      PosX = PosX - this.PdfViewer.position[0];
      PosY = PosY - this.PdfViewer.position[1];
      this.PdfViewer.positions.x = PosX;
      this.PdfViewer.positions.y = PosY;
    }
  },
  created() {
    const userId = JSON.parse(window.localStorage.getItem('lbUser')).userId;
    axios
      .get(APIENDPOINT + "/cert/getCert?memberId=" + userId, getHeader())
      .then(resp => {
        this.Certs.allCert = resp.data;
        axios
            .get(APIENDPOINT + "/picture/getPictureSign?memberId=" + userId, getHeader())
            .then(respo => {
              this.Pics.pic = respo.data;
              axios
                .get(APIENDPOINT + "/member/getissuer", getHeader())
                .then(res => {
                  this.Issuers.allIssuer = res.data;
                })
                .catch(err => {
                  throw err
                });
            })
            .catch(err => {
              throw err;
            });
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

.identitas {
  background-color: rgb(231, 231, 231);
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
