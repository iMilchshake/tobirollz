<template>
  <div id="websocket_test">
    <div v-if="connected" id="layout">

      <div id="chat_buttons">
        <input id="user" class="text_input" v-model="user" placeholder="username">
        <input id="msg" class="text_input" v-model="message" placeholder="message" @keyup.enter="sendMessage()">
        <input type="button" id="send" v-on:click="sendMessage()" value="Send"/>
      </div>

      <div id="dicebox">
        <input type="button" v-on:click="sendMessage('d4')" value="D4"/>
        <input type="button" v-on:click="sendMessage('d6')" value="D6"/>
        <input type="button" v-on:click="sendMessage('d8')" value="D8"/>
        <input type="button" v-on:click="sendMessage('d10')" value="D10"/>
        <input type="button" v-on:click="sendMessage('d12')" value="D12"/>
        <input type="button" v-on:click="sendMessage('d20')" value="D20"/>
      </div>

      <table id="log">
        <thead>
        <tr>
          <th>User</th>
          <th>Message</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="msg in msgLog" v-bind:key="msg.id">
          <td>{{ msg.user }}</td>
          <td>{{ msg.message }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h3> Connecting... </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "TobiRollz",
  data: function () {
    return {
      connection: null,
      message: null,
      user: null,
    }
  },
  computed: {
    connected: function () {
      return this.$store.state.connected;
    },
    msgLog: function () {
      return this.$store.state.msgLog;
    }
  },
  methods: {
    sendMessage: function (msg) {
      // msg override TODO: this sucks
      if (msg !== undefined) {
        this.message = msg;
      }

      // send message
      if (this.user !== null && this.message !== "") {
        this.connection.send(JSON.stringify({
          user: this.user,
          message: this.message
        }));
      } else {
        alert('user or message not specified!');
      }

      // reset message field
      this.message = "";
    },
    changeConnectionStatus(status) {
      this.$store.commit("changeConnectionStatus", status);
    },
    setupConnection() {
      console.log("Starting connection to WebSocket Server", process.env.VUE_APP_BACKEND_URL)
      this.connection = new WebSocket(process.env.VUE_APP_BACKEND_URL)

      this.connection.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === "log") {
          this.$store.commit("setMsgLog", msg.log);
        }
      }

      this.connection.onopen = () => {
        this.changeConnectionStatus(true);
      }

      this.connection.onclose = (e) => {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        this.changeConnectionStatus(false);
        setTimeout(() => {
          this.setupConnection();
        }, 1000);
      };

      this.connection.onerror = (err) => {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        this.changeConnectionStatus(false);
        this.connection.close();
      };
    }
  },
  created: function () {
    this.setupConnection();
  }
}
</script>

<style scoped>

#websocket_test {
  margin: 1em;
  padding: 1em;
  border-radius: 0px;
  border: 1px solid black;
  background-color: #3c3f41;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

#layout {
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: auto;
  grid-column-gap: 0.5em;
  grid-row-gap: 0.5em;
}

#chat_buttons {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  width: 100%;
  gap: 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.text_input {
  width: 10px;
}

#dicebox {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  width: 100%;
  gap: 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

#dicebox input {
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100px;
}

#user {
  flex-shrink: 1;
  flex-grow: 2;
  flex-basis: 100px;
}

#msg {
  flex-shrink: 1;
  flex-grow: 10;
  flex-basis: 200px;
}

#send {
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 150px;
  background-color: #3c7ba7;
}

#log {
  margin-top: 0.5em;
  border-collapse: collapse;
  width: 100%;
  grid-column: 1 / span 1;
  grid-row: 3 / span 1;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

#log tr td:first-child {
  width: 130px;
}

#log td, #log th {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
  word-break: break-all;
}

#log tr:nth-child(even) {
  background-color: #bcbcbc;
}

#log tr:nth-child(odd) {
  background-color: #9d9d9d;
}

#log th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #3c7ba7;
  color: black;
  font-weight: normal;
}

input, button {
  display: inline-block;
  padding: 10px 15px;
  font-size: 20px;
  border-radius: 0;
  -webkit-appearance: none;
  border: 1px solid black;
  outline: none;
  background-color: #9d9d9d;
  color: black;
  min-width: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

h2 {
  color: #658ba5;
}

</style>