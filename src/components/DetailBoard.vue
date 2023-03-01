<template>
    <div class="detailBoard">
        <div class="headerDetail">
            <h2>{{ itemBoard.name }}</h2>
            <p class="dayCreated">{{ itemBoard.dayCreated }}</p>
        </div>
        <div class="contentDetail">
            <div class="cardDetailList">
                <div class="cardDetailItem" v-for="(item, id ) in listItemDetailBoard" :key="id">
                    <div class="headerCardDetailItem">
                        <p>{{ item.titleItemDetailBoard }}</p>
                        <box-icon 
                            class="iconTrash" 
                            name='trash-alt'
                            @click="deleteCardItem(item)">X
                        </box-icon >
                           
                    </div>
                    <div 
                        class="childrentCardList" 
                        v-for="(card, index) in listCard" 
                        :key="index"
                        @click="editChildrentCardItem(card)"
                        >
                        <div class="childrentCardItem" v-if="card.cardId === item.checkIDCard">
                            {{ card.cardName }}
                        </div>
                    </div>
                    <div class="text-center">
                        <v-dialog v-model="dialogCard" max-width="600">
                            <v-card>
                                <div class="popupCreateCard">
                                    <h2>Card name</h2>
                                    <div class="inputAddBoards">
                                        <v-text-field 
                                            v-model="cardName" 
                                            :rules="nameRules" 
                                            label="stuff to do"
                                            required></v-text-field>
                                    </div>
                                    <v-card-actions class="btnCreateCard">
                                        <v-btn 
                                            color="primary" 
                                            text @click="dialogCard = false">
                                            CLOSE
                                        </v-btn>
                                        <v-btn 
                                            color="primary" 
                                            text @click="addCardItem()">
                                            SAVE
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                            </v-card>
                        </v-dialog>
                    </div>
                    <button class="btnAddCard" @click="addCard(item)">ADD CARD</button>
                </div>
                <div class="text-center">
                    <v-dialog v-model="dialog" max-width="600">
                        <v-card>
                            <div class="popupCreateList">
                                <h2>List name</h2>
                                <div class="inputCreateList">
                                    <v-text-field v-model="titleItemDetailBoard" 
                                                  :rules="nameRules" 
                                                  label="stuff to do"
                                                  required>
                                    </v-text-field>
                                </div>
                                <v-card-actions class="btnCreateList">
                                    <v-btn color="primary" 
                                            text 
                                            @click="dialog = false">
                                        CLOSE
                                    </v-btn>
                                    <v-btn color="primary" 
                                            text 
                                            @click="addItemDetailBoard()">
                                        SAVE
                                    </v-btn>
                                </v-card-actions>
                            </div>
                        </v-card>
                    </v-dialog>
                </div>
            </div>
            <div class="btnCreateNewList">
                  <button 
                    class="btn"
                    @click="showPopupAddItem()">
                <span>CREATE NEW LIST</span>
            </button>
            </div>
        </div>
        <div class="text-center">
            <v-dialog v-model="dialogCardItem" max-width="600">
                <v-card>
                    <div class="popupCreateCard">
                        <h2>{{ cardName }}</h2>
                        <div class="inputAddBoards">
                            <v-text-field 
                                v-model="cardName" 
                                :rules="nameRules" 
                                :label="labelInput"
                                required>
                            </v-text-field>
                        </div>
                        <v-card-actions class="btnCreateCard">
                            <v-btn 
                                color="primary" 
                                text @click="deleteChildCardItem">
                                DELETE
                            </v-btn>
                            <v-btn 
                                color="primary" 
                                text @click="EditCard()">
                                SAVE
                            </v-btn>
                            <v-btn 
                                color="primary" 
                                text 
                                @click="close()">
                                CLOSE
                            </v-btn>
                        </v-card-actions>
                     </div>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>



export default {
    name: "DetailBoard",
    props: {
        itemBoard: {
            type: Object,
        },
    },
    created() {
        this.itemBoardData = this.itemBoard
        this.detailData = JSON.parse(localStorage.getItem("detailData"))
        this.listItemDetailBoard = this.detailData
            ? JSON.parse(localStorage.getItem("detailData"))
                .filter(item => item.paramsId === this.$route.params.id)
            : null
        this.listCard = JSON.parse(localStorage.getItem("cardData"))
        this.labelInput = "Stuff to do"
    },
    data() {
        return {
            dialog: false,
            dialogCard: false,
            dialogCardItem: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            titleItemDetailBoard: "",
            cardName: "",
            listCard: [],
            listItemDetailBoard: null,
            detailData: [],
            cardID: "",
            tempId: "",
            childId: "",
            labelInput: '',
        }
    },
    methods: {
        deleteCardItem(val) {
            this.listItemDetailBoard = this.listItemDetailBoard.filter(x => x.checkIDCard !== val.checkIDCard)
            this.listCard = this.listCard.filter(x => x.cardId !== val.checkIDCard)
            localStorage.setItem("cardData", JSON.stringify(this.listCard))
            localStorage.setItem("detailData", JSON.stringify(this.listItemDetailBoard))
        },  
        showPopupAddItem() {
            this.titleItemDetailBoard = ""
            this.dialog = true
        },
        addItemDetailBoard() {
            this.dialog = false
            const itemDetailBoard = {
                titleItemDetailBoard: this.titleItemDetailBoard,
                listCard: this.listCard,
                paramsId: this.$route.params.id,
                checkIDCard: this.getRandomId(10),
            }
            if (!this.detailData) {
                this.listItemDetailBoard =  [(itemDetailBoard)]
                this.detailData = [(itemDetailBoard)]
                localStorage.setItem("detailData", JSON.stringify([itemDetailBoard]))
            }
            else {

                this.listItemDetailBoard.push(itemDetailBoard)

                this.detailData.push(itemDetailBoard)
                localStorage.setItem("detailData", JSON.stringify(this.detailData))
            }
        },
        getRandomId(length) {
            return Math.random().toString(36).substring(2, length + 2);
        },
        addCard(item) {
            this.dialogCard = true
            this.cardName= ''
            this.cardID = item.checkIDCard         
        },
        addCardItem() {
            this.labelInput = "Stuff to do"
            const itemCard = {
                cardName: this.cardName,
                paramsId: this.$route.params.id,
                cardId: this.cardID,
                childId: this.getRandomId(5)
            }
            if (this.listCard === null) {
                this.listCard = [(itemCard)]
                localStorage.setItem("cardData", JSON.stringify(this.listCard))
            }
            else {
                this.listCard.push(itemCard)
                localStorage.setItem("cardData", JSON.stringify(this.listCard))
            }
            this.dialogCard = false
            this.cardName = ''
        },
        editChildrentCardItem(val){
            this.labelInput = "Edit title"
            this.dialogCardItem = true
            this.cardName = val.cardName
            this.tempId = val.childId
        },
        deleteChildCardItem() {
            const listChildCard = this.listCard.filter(x => x.childId !== this.tempId)
            localStorage.setItem("cardData", JSON.stringify(listChildCard))
            this.listCard = listChildCard
            this.dialogCardItem = false
        },
        EditCard(){
            let listChildCard = this.listCard;
            for (let i = 0; i <= listChildCard.length; i++){
                if(listChildCard[i] && listChildCard[i].childId === this.tempId){
                    listChildCard[i].cardName = this.cardName
                }
            }
            localStorage.setItem("cardData", JSON.stringify(listChildCard))
            this.listCard = listChildCard
            this.dialogCardItem = false
        },
        close(){
            this.dialogCardItem= false
        }
    }
}
</script>

<style lang="scss" scoped>
.detailBoard {
    padding-left: 15px;

    >.headerDetail>.dayCreated {
        font-size: 12px;
        font-weight: 550;
    }
}

.contentDetail {
    display: flex;
    flex-direction: row;
    >.cardDetailList {
        display: flex;
        flex-direction: row;
        >.cardDetailItem {
            background-color: hsla(0, 0%, 89.4%, .35);
            padding: 20px;
            margin: 0 20px 20px 20px;
            border-radius: 8px;
            min-width: 250px;
            min-height: 70vh;
            position: relative;
            > .headerCardDetailItem{
                display: flex;
                justify-content: space-between;
                >.iconTrash{
                    width: 16px;
                    height: 16px;
                    cursor: pointer;
                }
            }
            >.childrentCardList>.childrentCardItem,
            >.btnAddCard {
                margin: 10px;
                padding: 10px 14px;
                font-size: 12px;
                border-radius: 4px;
                box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
                height: 50px;
                display: flex;
                align-items: center;
                background-color: #fff ;
            }
            > .btnAddCard:hover{
                background-color: #f5f5f5;
            }

            >.btnAddCard {
                width: 190px;
                height: 36px;
                font-weight: 600;
                font-size: 14px;
                justify-content: center;
                position: absolute;
                bottom: 10px;
                box-shadow: 0 0 0 0;
                display: block;
                background-color:  hsla(0, 0%, 89.4%, .35);
            }

        }
    }

    >.btnCreateNewList {
        background-color: hsla(0, 0%, 89.4%, .35);
        border-radius: 4px;
        font-weight: 500;
        font-size: 14px;
        height: 30px;
        padding: 6px 14px;
    }

}
.popupCreateList{
    padding: 40px 40px 10px 40px;
    > .inputCreateList{
        padding: 10px;
    }
    > .btnCreateList{
        justify-content: end;
    }
}
.popupCreateCard{
    padding: 40px 40px 10px 40px;
    > .inputAddBoards{
        padding: 10px;
    }
    > .btnCreateCard{
        justify-content: end;
    }
}

</style>