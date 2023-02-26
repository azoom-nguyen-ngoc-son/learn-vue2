<template>
    <div class="container-page">
        <div class="header">
            <h1 class="title">My Boards</h1>
            <div class="popupAddBoards text-center">
                <v-dialog v-model="dialog" width="350">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn elevation="2" small v-bind="attrs" v-on="on">
                            ADD BOARDS
                        </v-btn>
                    </template>
                    <v-card>
                        <div class="popupAddBoards-Header">
                            <v-card-title class="text-h6 lighten-2 ">
                                Add Board
                            </v-card-title>
                            <box-icon class="iconX" @click="dialog = false" name='x'></box-icon>
                        </div>
                        <div class="inputAddBoards">
                            <v-text-field v-model="boardItemName" :rules="nameRules" label="Board title"
                                required></v-text-field>
                        </div>
                        <div class="chooseColorInput">
                            <v-btn @click="isColorInput = true" v-show="!isColorInput" elevation="1">CHOOSE BOARD
                                COLOR</v-btn>
                            <v-color-picker v-model="boardItemColorCode" v-show="isColorInput" class="ma-2" hide-inputs>
                            </v-color-picker>
                        </div>
                        <div class="uploadImg">
                            <box-icon type='solid' name='camera'></box-icon>
                            <p> Add a board backgound</p>
                        </div>
                        <v-btn class="btnSubmit" @click="addBoardItem" :class="{ blueBtn: isActive }">SUBMIT</v-btn>
                        <v-divider></v-divider>
                    </v-card>
                </v-dialog>
            </div>
        </div>
        <div class="content">
            <div v-for="(boardItem, index) in listBoardItem" :key="index" class="content-boxItem"
                v-bind:style="{ 'background-color': boardItem.colorCode }">
                <div @click="nenxtPage(boardItem)">
                    <h3 class="title"> {{ boardItem.name }}</h3>
                    <p class="created"> {{ boardItem.dayCreated }}</p>
                </div>
            </div>
        </div>
        <div ref="detailBoard" class="detailBoard"> 

        </div>
    </div>
</template> 

<script>

import DetailBoard from "../components/DetailBoard.vue"
export default {
    name: 'ContainerPage',
    components: {DetailBoard},
    data() {
        return {
            dialog: false,
            boardItemName: "",
            boardItemColorCode: "",
            isColorInput: false,
            isDisable: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            isActive: false,
            listBoardItem: [],
        }

    },
    created() {
        this.dayCreated = this.getDate()
        this.listBoardItem = JSON.parse(localStorage.getItem("data"))
    },
    watch: {
        boardItemName(val) {
            console.log(val);
            if (val !== '') {
                this.isActive = true
                console.log(true);
            }
            else {
                this.isActive = false
            }
        }
    },

    methods: {
        takeValueInput() {
            console.log("dssds");
        },
        getDate() {
            const today = new Date();
            // const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            return today
            // var currentDate = new Date();
            // console.log(currentDate);
            // var currentDateWithFormat = new Date().toJSON()
            // console.log(currentDateWithFormat);
            // return currentDateWithFormat
        },
        addBoardItem() {
            const boardItem = {
                name: this.boardItemName,
                colorCode: this.boardItemColorCode,
                dayCreated: this.getDate()
            }
            if (boardItem.name === "" || boardItem.colorCode === "") {
                return
            }
            if (this.listBoardItem === null) {
                this.listBoardItem = [(boardItem)]
                localStorage.setItem("data", JSON.stringify([boardItem]))
            }
            else {
                this.listBoardItem.push(boardItem)
                localStorage.setItem("data", JSON.stringify(this.listBoardItem))
            }
            
        },
        nenxtPage(val){
            this.$emit("getDetailBoads", val)
        }
    }

}
</script>

<style lang="scss" scoped>
.container-page {
    padding: 40px 150px;

    >.header {
        display: flex;
        padding-bottom: 20px;
        justify-content: space-between;
    }
}

.content-boxItem {
    display: inline-block;
    border-radius: 4px;
    margin: 20px;
    padding: 20px;

    >.title {
        font-size: 20px;
        padding-bottom: 10px;
    }

    >.created {
        font-size: 8px;
    }
}

.popupAddBoards-Header {
    display: flex;
    justify-content: space-between;
    padding: 20px;

    >.iconX {
        cursor: pointer;
        margin-top: 18px;
    }
}

.inputAddBoards {
    padding: 0 30px;
}

.chooseColorInput {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 0 20px;

    >.v-btn {
        width: 100%;
    }
}

.btnSubmit {
    display: flex;
    width: 90%;
    margin: auto;
    margin-bottom: 20px;
}

.uploadImg {
    border: 1px dotted;
    border-radius: 4px;
    padding: 20px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.blueBtn {
    background-color: #1976d2 !important;
}
</style>