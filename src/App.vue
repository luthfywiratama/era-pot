<template>
  <div class="container">
    <h3 class="my-5 text-center">Upload Image</h3>
    <div class="card bg-white">
      <div class="card-body">
        <div class="upload-form">
          <div v-if="errorMsg" class="alert alert-danger mt-3">
            {{ errorMsg }}
          </div>
          <div v-if="successMsg" class="alert alert-success mt-3">
            {{ successMsg }}
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Choose file</label>
            <input @change="handleImage" type="file" class="form-control" />
          </div>
          <button @click="uploadImage" class="btn btn-primary" type="button">
            Upload
          </button>
        </div>
      </div>
    </div>

    <h3 class="my-5">Gallery</h3>
    <div class="row">
      <div v-for="(image, index) in imageData" :key="index" class="col-3">
        <div class="card">
          <div class="card-body text-center">
            <img class="img-fluid" :src="image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      image: "",
      imageData: [],
      errorMsg: "",
      successMsg: "",
    };
  },
  mounted() {
    if (localStorage.getItem("image")) {
      try {
        this.imageData = JSON.parse(localStorage.getItem("image"));
      } catch (e) {
        localStorage.removeItem("image");
      }
    }
  },
  methods: {
    handleImage(e) {
      const selectedImage = e.target.files[0];
      this.image = selectedImage;

      // this.createBase64Image(selectedImage);
    },

    createBase64Image(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    async uploadImage() {
      if (!this.image) {
        this.errorMsg = "Anda Belum Upload Image";

        return;
      }

      if (this.image) {
        const formData = new FormData();
        formData.append("image", this.image);
        await axios
          .post(
            "https://api.imgbb.com/1/upload?key=28927ac2f83a96c4f52f4a83945c8333",
            formData
          )
          .then((response) => {
            this.successMsg = "Berhasil Upload";
            this.errorMsg = "";
            this.imageData.push(URL.createObjectURL(this.image));
            this.image = "";
            const parsed = JSON.stringify(this.imageData);
            localStorage.setItem("image", parsed);
          })
          .catch((error) => {
            console.log(error);
            // Tindakan yang ingin Anda lakukan jika upload gagal
            this.errorMsg = "Gagal mengunggah gambar ke ImgBB.";
          });
      } else {
        this.errorMsg = "Pilih gambar terlebih dahulu.";
      }
    },
  },
};
</script>
