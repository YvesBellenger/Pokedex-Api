<template>

<form @submit.prevent='handleSubmit'>
    <div class='container'>
        <label>Nom</label>
        <input required type="text"
                class='input-form'
                placeholder='Nom'
                v-model='LoginData.name'>
        <label>Email</label>
        <input required type="email"
                class='input-form'
                placeholder='Adresse email'
                v-model="LoginData.email">
        <label>Mot de passe</label>
        <input required type="password"
                class='input-form'
                placeholder='Mot de passe'
                v-model='LoginData.password'>

        <div class='footer'>
            <button type='submit' class='blue' :class='[{submitting: submitting}]'>
                <span>Valider</span>
                <img class='loading' src='../assets/loading.svg'>
            </button>
        </div>

    </div>
</form>


</template>



<script>
export default {
  name: "Inscription",
  data() {
    return {
      LoginData: {
        name: "",
        email: "",
        password: ""
      },
      submitting: false
    };
  },
  methods: {
    async handleSubmit() {
      this.submitting = true;
      let response = await this.$store.dispatch(
        "submitRequest",
        this.LoginData
      );
      this.submitting = false;
      if (response) {
        alert('Vous etes inscrit, connectez vous');
        this.$router.push('/connexion');
      }
    }
  }
};
</script>


<style lang='scss' scoped>
.container {
  display: flex;
  flex-flow: column wrap;
  width: 400px;
  height: auto;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(10, 10, 10, 0.2);
  padding: 20px 30px 10px 30px;
  background-color: white;

  .footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-top: 10px;
  }
}

label {
  font-weight: bold;
  color: rgb(80, 80, 80);
  font-size: 15px;
  align-self: flex-start;
}

button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 33px;
  border-radius: 4px;
  margin: 0 5px 0 5px;
  text-align: center;
  cursor: pointer;
  outline: none;
  border: 1px solid transparent;
  padding: 0px 13px 0px 13px;
  user-select: none;

  span {
    font-size: 15px;
    color: #e04b4b;
    font-weight: bold;
    text-transform: uppercase;
  }

  .loading {
    display: none;
    margin-left: 6px;
    height: 24px;
    width: 24px;
  }

  &.submitting {
    cursor: wait;
    .loading {
      display: block;
    }
  }

  &:hover {
    background-color: rgb(230, 230, 230);
  }

  &:active {
    background-color: rgb(220, 220, 220);
  }

  &.blue span {
    color: #4b87e0;
  }
}
</style>