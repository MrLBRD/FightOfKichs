const dataSaved = {
    "coins": 15,
    "day": 0,
    "cartes": [
        {
            "type": "card",
            "id": "PlayerKich1",
            "categorie": "Player",
            "name": "Kich",
            "position": [4, 8]
        }, {
            "type": "card",
            "group": "Group1",
            "id": "RessourcePaille2",
            "categorie": "Ressource",
            "name": "Paille",
            "position": [152, 24]
        }, {
            "type": "card",
            "group": "Group1",
            "id": "RessourcePaillegtregrt",
            "categorie": "Ressource",
            "name": "Paille",
            "position": [152, 24]
        }, {
            "type": "card",
            "id": "NourritureOeuf3",
            "categorie": "Nourriture",
            "name": "Oeuf",
            "position": [720, 60]
        }, {
            "type": "card",
            "id": "AnimauxPoule4",
            "categorie": "Animaux",
            "name": "Poule",
            "position": [360, 240],
            "proccessing": 0.4
        }, {
            "type": "card",
            "id": "NourritureOeuf36",
            "categorie": "Nourriture",
            "name": "Oeuf",
            "position": [105, 500]
        }, {
            "type": "card",
            "id": "NourritureOeuf37",
            "categorie": "Nourriture",
            "name": "Oeuf",
            "position": [600, 450]
        }, {
            "type": "card",
            "id": "RessourceBoiskfireeznk",
            "categorie": "Ressource",
            "name": "Bois",
            "position": [730, 610]
        }, {
            "type": "card",
            "id": "RessourceBoisliuhfr",
            "categorie": "Ressource",
            "name": "Bois",
            "position": [360, 590]
        }
    ],
    decks: []
}

const JStore = {
    gameBoard: undefined,
    coins: {
        container: undefined,
        value: undefined
    },
    days: {
        container: undefined,
        value: undefined,
        animation: undefined
    },
    highestZIndex: 0,
    hasGroupClass: undefined,
    lastValidatedElement: null,
    productions: {},
    crafts: {},
    hoverSellZone: false,
    dataStore: undefined,
    endDay: false,
    playerCardHover: undefined,
    endDayScreen: undefined,
    allPlayerSatiated: null
}

const GameRules = {
    dayDuration: 0.2 * 60,
    packs: {
        Farmer: {
            price: 10,
            categoriesStats: {
                Nourriture: {
                    3: 0.60,
                    4: 0.35,
                    5: 0.05
                },
                Ressource: {
                    1: 0.465,
                    2: 0.41,
                    3: 0.125
                },
                Animaux: {
                    0: 0.21,
                    1: 0.69,
                    2: 0.1
                }
            },
            cardsStats: {
                Nourriture: {
                    Oeuf: 0.5,
                    Tomate: 0.5
                },
                Ressource: {
                    Paille: 0.33,
                    Terre: 0.33,
                    Bois: 0.33
                },
                Animaux: {
                    Poule: 0.80,
                    Poussin: 0.20
                }
            }
        }
    },
    rewards: {
        10: {
            type: "choise",
            cards: [{
                name: "Kich",
                categorie: "Player"
            },{
                name: "Pizza",
                categorie: "Player"
            }],
            title: 'Succées',
            text: 'Vous avez atteins la réponse de la vie.'
        }
    }
}

const CardsRules = {
    Player: {
        Kich: {
            skills: {
                life: 6
            },
            stackable: [
                ["Oeuf", "Oeuf"],
                ["Tomate", "Tomate"]
            ],
            feed: {
                need: 2,
                favorites: [
                    {
                        name: "Oeuf",
                        gain: "*2"
                    }, {
                        name: "Omellette",
                        gain: "*2"
                    }
                ]
            }
        },
        Pizza: {
            skills: {
                life: 6
            },
            stackable: [
                ["Oeuf", "Oeuf"],
                ["Tomate", "Tomate"]
            ],
            feed: {
                need: 2,
                favorites: [
                    {
                        name: "Tomate",
                        gain: "*2"
                    }, {
                        name: "SauceTomate",
                        gain: "*2"
                    }
                ]
            }
        }
    },
    Nourriture: {
        Oeuf: {
            skills: {
                price: 2,
                food: 1
            },
            stackable: [
                "Oeuf"
            ]
        },
        Tomate: {
            skills: {
                price: 2,
                food: 1
            },
            stackable: [
                "Tomate"
            ],
            crafts: [
                {
                    cards: ["Terre"],
                    produce: {
                        products: [{
                            categorie: "Nourriture",
                            name: "Tomate",
                            quantity: 1
                        },{
                            categorie: "Ressource",
                            name: "Terre",
                            quantity: 1
                        }],
                        duration: 0.7 * GameRules.dayDuration,
                        consumed: true
                    }
                }
            ]
        },
        Omelette: {
            skills: {
                price: 5,
                food: 2
            }
        },
        SauceTomate: {
            skills: {
                price: 5,
                food: 2
            }
        }
    },
    Ressource: {
        Paille: {
            skills: {
                price: 3
            },
            stackable: [
                "Bois",
                "Paille"
            ]
        },
        Terre: {
            skills: {
                price: 3
            },
            stackable: [
                "Bois",
                "Terre"
            ]
        },
        Bois: {
            skills: {
                price: 3
            },
            stackable: [
                "Bois",
                "Paille",
                "Terre"
            ]
        }
    },
    Animaux: {
        Poule: {
            skills: {
                price: 2,
                life: 2
            },
            stackable: [
                "Oeuf",
                "Paille"
            ],
            produce: {
                type: {
                    categorie: "Nourriture",
                    name: "Oeuf"
                },
                duration: 0.7 * GameRules.dayDuration,
                consumed: false
            },
            crafts: [
                {
                    cards: ["Oeuf"],
                    produce: {
                        products: [{
                            categorie: "Animaux",
                            name: "Poussin",
                            quantity: 1
                        }],
                        duration: 2 * GameRules.dayDuration,
                        consumed: true
                    }
                }
            ]
        },
        Poussin: {
            skills: {
                life: 1
            },
            produce: {
                type: {
                    categorie: "Animaux",
                    name: "Poule"
                },
                duration: 5 * GameRules.dayDuration,
                consumed: true
            },
        }
    },
    Batiment: {
        Poulailler: {
            skills: {
                fill: {
                    current: 0,
                    max: 4
                }
            }
        },
        Potager: {
            skills: {
                fill: {
                    current: 0,
                    max: 4
                }
            }
        }
    }
}

const Crafts = [
    {
        cards: ["Oeuf", "Oeuf"],
        produce: {
            products: [{
                categorie: "Nourriture",
                name: "Omelette",
                quantity: 1
            }],
            duration: 0.3 * GameRules.dayDuration,
            consumed: true
        }
    }, {
        cards: ["Tomate", "Tomate"],
        produce: {
            products: [{
                categorie: "Nourriture",
                name: "SauceTomate",
                quantity: 1
            }],
            duration: 0.3 * GameRules.dayDuration,
            consumed: true
        }
    }, {
        cards: ["Bois", "Terre", "Terre"],
        produce: {
            products: [{
                categorie: "Batiment",
                name: "Potager",
                quantity: 1
            }],
            duration: 2 * GameRules.dayDuration,
            consumed: true
        }
    }, {
        cards: ["Bois", "Bois", "Paille"],
        produce: {
            products: [{
                categorie: "Batiment",
                name: "Poulailler",
                quantity: 1
            }],
            duration: 2 * GameRules.dayDuration,
            consumed: true
        }
    }
]

const CardComponents = {
    Flag: {
        left: `<div class="leftFlagContainer"><svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.95603 16.5298C8.16576 14.8944 4.63946 11.8619 1.89337 9.96627C4.95371 8.51945 12.2521 6.21821 19.0294 6.01018L19.4848 21.4916C19.5043 22.1563 19.853 22.7678 20.4152 23.1232L26.7306 27.1161C26.7308 27.1162 26.731 27.1163 26.7312 27.1164C26.7344 27.1277 26.7388 27.1573 26.7286 27.1997C26.7176 27.245 26.6967 27.2751 26.6833 27.2883C26.6805 27.2911 26.6784 27.2928 26.6769 27.2939C26.6754 27.2949 26.6746 27.2953 26.6745 27.2953L26.6728 27.296C26.6718 27.2963 26.6691 27.297 26.6643 27.2975C24.4357 27.5559 21.5448 27.9522 18.5582 28.3616C17.1866 28.5496 15.7949 28.7403 14.4378 28.9218C10.363 29.4667 6.64259 29.9212 4.59936 29.9945C5.84998 27.186 8.69587 21.5523 10.2256 19.3232C10.7747 18.5231 10.7976 17.2987 9.95603 16.5298Z" fill="#C5A271" stroke="#070707" stroke-width="2" stroke-linejoin="round"/><path d="M28.9571 21.8435C28.7886 23.4744 28.1291 24.915 27.0077 27.2248C26.1033 26.8237 24.7772 26.1539 23.4559 25.3573C22.2171 24.6104 21.038 23.7851 20.2129 22.9968C21.6721 22.5963 23.4687 22.2789 25.1407 22.0774C26.7152 21.8876 28.1034 21.8098 28.9571 21.8435Z" fill="#C5A271" stroke="#070707" stroke-width="2" stroke-linejoin="round"/></svg></div>`,
        middle(name) {
            return `<div class="middleFlagContainer"><div class="textFlag">${name}</div><svg width="60" height="32" viewBox="0 0 60 32" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6.66605C1 6.25012 1.36658 5.59798 2.88199 4.84546C4.31597 4.13338 6.43576 3.51198 9.08372 2.99145C14.3611 1.95405 21.4737 1.3658 28.7314 1.1269C35.9807 0.888283 43.3305 0.999491 49.0651 1.3486C51.9345 1.52329 54.3826 1.75656 56.2045 2.03189C57.1173 2.16984 57.8524 2.31534 58.3961 2.4632C58.6528 2.53302 58.8522 2.59947 59 2.65978V21.6478C57.654 21.6047 55.8136 21.4867 53.6315 21.3469C49.0673 21.0544 43.0081 20.6661 36.8504 20.6661C32.3911 20.6661 25.0039 20.8668 18.0294 21.2679C14.5417 21.4685 11.1481 21.7197 8.27018 22.022C5.41379 22.3221 2.99906 22.6789 1.50739 23.1055C1.45903 23.1193 1.40687 23.124 1.35738 23.1196C1.31972 23.1162 1.29009 23.1082 1.26935 23.1001C1.00074 19.2394 1 9.18295 1 6.66605ZM58.9994 2.35541C58.9994 2.35537 58.9995 2.35643 58.9996 2.35874L58.9994 2.35541Z" fill="#C5A271" stroke="#070707" stroke-width="2" stroke-linejoin="round"/></svg></div>`
        },
        right: `<div class="rightFlagContainer"><svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.04033 19.7542L10.5611 4.00476C15.2529 4.08043 24.2909 5.03569 28.5933 5.7271C27.2142 7.05604 25.3093 8.85345 23.5367 10.5259C22.079 11.9013 20.7109 13.1923 19.7984 14.0686C18.8832 14.9477 19.0582 16.3445 19.9192 17.0849C22.9292 19.6739 26.2303 24.5196 28.3094 27.9387C21.7247 27.3865 7.17031 26.3294 2.24552 26.6401L2.30849 27.6381L2.24552 26.6401C2.21322 26.6421 2.18339 26.6319 2.1638 26.6175C2.15495 26.611 2.15111 26.6058 2.15005 26.6041C2.14945 26.6032 2.1496 26.6035 2.14947 26.6027C1.70647 24.2064 1.26231 21.2965 1.04033 19.7542Z" fill="#C5A271" stroke="#070707" stroke-width="2" stroke-linejoin="round"/><path d="M11 4.5V22L2.5 26.5" stroke="#070707" stroke-width="2" stroke-linejoin="round"/></svg></div>`
    },
    Skills: {
        price(pricing, idElement) {
            return `<div class="leftSkill priceSkill"><svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><mask id="priceTextMask-${idElement}"><rect width="24" height="21" fill="white"/><text x="50%" y="50%" dy=".3em" text-anchor="middle" font-size="16px" font-weight="bold" fill="black">${pricing}</text></mask></defs><path d="M18.7901 16.2009C23.5916 9.30928 21.4336 4.55253 17.9774 1.76682C14.5212 -1.01889 8.75512 0.400599 5.09848 4.93735C1.44183 9.47409 1.27934 15.4101 4.73554 18.1958C8.28985 21.0606 13.7798 21.8076 18.7901 16.2009Z" fill="white" mask="url(#priceTextMask-${idElement})"/></svg></div>`
        },
        fill(fill) {
            return `<div class="middleSkill fillSkill"><span class="currentFill">${fill.current}</span>/<span class="maxFill">${fill.max}</span></div>`
        },
        life(life, idElement) {
            return `<div class="rightSkill lifeSkill"><svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><mask id="lifeTextMask-${idElement}"><rect width="24" height="21" fill="white"/><text x="50%" y="50%" dy=".3em" text-anchor="middle" font-size="16px" font-weight="bold" fill="black">${life}</text></mask></defs><path d="M23.7118 6.46194C23.7118 2.89307 20.8187 0 17.2505 0C15.0843 0 13.1728 1.06935 12 2.70383C10.8272 1.06935 8.9157 0 6.75015 0C3.18128 0 0.288208 2.89242 0.288208 6.46194C0.288208 6.96748 0.352382 7.4573 0.462395 7.92943C1.35952 13.5041 7.55756 19.3852 12 21C16.4418 19.3852 22.6404 13.5041 23.5363 7.93009C23.6476 7.45795 23.7118 6.96813 23.7118 6.46194Z" fill="white" mask="url(#lifeTextMask-${idElement})"/></svg></div>`
        },
        food(satiety, idElement) {
            return `<div class="rightSkill foodSkill"><svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><mask id="foodTextMask-${idElement}"><rect width="24" height="21" fill="white"/><text x="50%" y="50%" dy=".3em" text-anchor="middle" font-size="16px" font-weight="bold" fill="black">${satiety}</text></mask></defs><path d="M11.3539 20.75C10.8708 20.5396 10.1742 20.2895 9.56105 19.9143C9.27209 19.74 8.99984 19.368 8.87929 19.0443C8.11669 16.7733 7.43897 14.4779 6.67998 12.1875C6.13411 10.4791 5.23291 8.84512 5.01572 7.09739C4.80847 5.51221 4.03324 4.60471 2.94017 3.67826C2.17262 3.05341 2.33515 2.17977 3.2589 1.74903C5.72584 0.580989 8.31379 0.05813 11.0169 0.319964C13.9566 0.605723 16.7816 1.29196 19.4219 2.64686C19.7145 2.80172 20.0861 3.0717 20.1556 3.34576C20.6708 5.65108 21.1665 7.95278 21.5968 10.2825C21.6433 10.5723 21.4984 11.0274 21.2803 11.2279C17.9998 14.3938 14.7035 17.5367 11.3539 20.75Z" fill="white" mask="url(#foodTextMask-${idElement})"/></svg></div>`
        }
    },
}

const MovementActions = {
    offsetX: undefined,
    offsetY: undefined,
    startMoveCard(dragElement, e) {
        // Réduit l'opacité de l'élément réel pendant le drag
        dragElement.style.opacity = '0.001'
        // Applique un z-index encore plus élevé à l'élément déplacé
        JStore.highestZIndex += 1;
        dragElement.style.zIndex = JStore.highestZIndex.toString();

        let rect = dragElement.getBoundingClientRect();
        offsetX = e.clientX - rect.left + JStore.gameBoardRect.left + 7;
        offsetY = e.clientY - rect.top + JStore.gameBoardRect.top + 7;
    },
    endMoveCard(dragElement, e) {
        // Obtenez l'élément sur lequel le drag a été relâché
        const dropElement = JStore.lastValidatedElement

        // Vérifiez l'attribut data-name
        if (dropElement) {
            if (JStore.productions[dragElement.id]) JStore.productions[dragElement.id].pause()
            let groupContainer
            if ((dropElement.parentElement.className).includes('groupedCardsContainer')) {
                groupContainer = dropElement.parentElement
                // Reset position elements
                dragElement.style.position = "relative"
                dragElement.style.top = ""
                dragElement.style.left = ""
                groupContainer.lastElementChild.draggable = false

                const rect = groupContainer.getBoundingClientRect()
                let groupPosition = [rect.left + JStore.gameBoardRect.left, rect.top + JStore.gameBoardRect.top]

                let newCardInfos = {
                    "id": dragElement.id,
                    "position": groupPosition,
                    "group": groupContainer.id
                }
                DataManagement.pushCard(newCardInfos)

                if (dragElement.dataset.type === 'Player') {
                    let craft = Verifiers.isACraft(Crafts, JSON.parse(groupContainer.dataset.cards))
                    if (craft) {
                        Generation.Crafting(() => {
                            if (craft.produce.consumed) {
                                // Utilisez la position de l'élément valide pour la nouvelle div
                                const rect = groupContainer.getBoundingClientRect()
                                dragElement.style.left = rect.left + JStore.gameBoardRect.left + 'px'
                                dragElement.style.top = rect.top + JStore.gameBoardRect.top + 'px'
                                dragElement.position = ""
                                dragElement.draggable = true

                                DataManagement.pushCard({
                                    id: dragElement.id,
                                    position: [rect.left + JStore.gameBoardRect.left, rect.top + JStore.gameBoardRect.top],
                                    group: null
                                })

                                JStore.gameBoard.appendChild(dragElement)
                                if (JStore.productions[dragElement.id] && !JStore.endDay) JStore.productions[dragElement.id].resume()
                                let cardsForDelete = [...groupContainer.children]
                                cardsForDelete.forEach(card => {
                                    DataManagement.removeCard(card.id)
                                })
                                groupContainer.remove()
                            }
                        }, dragElement, craft.produce)
                    } else {
                        let arrCardsInGroup = JSON.parse(groupContainer.dataset.cards)
                        arrCardsInGroup.push(dragElement.dataset.type)
                        groupContainer.dataset.cards = JSON.stringify(arrCardsInGroup)
                    }
                } else {
                    let arrCardsInGroup = JSON.parse(groupContainer.dataset.cards)
                    arrCardsInGroup.push(dragElement.dataset.name)
                    groupContainer.dataset.cards = JSON.stringify(arrCardsInGroup)
                }
                
                // Ajoutez l'élément dragué et l'élément valide à la nouvelle div
                groupContainer.appendChild(dragElement)
                
                // Restaure l'opacité de l'élément réel
                dragElement.style.opacity = '1'
            } else {
                // Récupération de la position de l'élément qui se voit drop une carte dessus pour créer un table [x, y] pour le group
                const rect = dropElement.getBoundingClientRect()
                let groupPosition = [rect.left - (JStore.gameBoardRect.left + 7), rect.top - (JStore.gameBoardRect.top + 7)]

                let newGoupId = Generation.Id(null, 'Group')
                groupContainer = Generation.Group(newGoupId, groupPosition)

                // Insérez groupContainer à l'emplacement de dropElement
                JStore.gameBoard.insertBefore(groupContainer, dropElement)

                let elementsArray = [dropElement, dragElement]
                elementsArray.forEach(element => {
                    element.style.position = "relative"
                    element.style.top = ""
                    element.style.left = ""

                    groupContainer.appendChild(element)
                    
                    let newCardInfos = {
                        "id": element.id,
                        "position": groupPosition,
                        "group": newGoupId
                    }
                    DataManagement.pushCard(newCardInfos)
                })

                dropElement.draggable = false
                dragElement.style.opacity = '1'

                if (CardsRules[dragElement.dataset.type][dragElement.dataset.name].crafts) {
                    let craft = Verifiers.isACraft(CardsRules[dragElement.dataset.type][dragElement.dataset.name].crafts, [dropElement.dataset.name])
                    if (craft) {
                        Generation.Crafting(() => {
                            if (craft.produce.consumed) {
                                // Utilisez la position de l'élément valide pour la nouvelle div
                                const rect = groupContainer.getBoundingClientRect()
                                dragElement.style.left = rect.left + 'px'
                                dragElement.style.top = rect.top + 'px'
                                dragElement.position = ""
                                dragElement.draggable = true

                                JStore.gameBoard.appendChild(dragElement)
                                if (JStore.productions[dragElement.id] && !JStore.endDay) JStore.productions[dragElement.id].resume()
                                let cardsForDelete = [...groupContainer.children]
                                cardsForDelete.forEach(card => {
                                    DataManagement.removeCard(card.id)
                                })
                                groupContainer.remove()
                            }
                        }, dragElement, craft.produce)
                    } else {
                        let arrCardsInGroup = JSON.parse(groupContainer.dataset.cards)
                        arrCardsInGroup.push(dragElement.dataset.name)
                        groupContainer.dataset.cards = JSON.stringify(arrCardsInGroup)
                    }
                } else {
                    groupContainer.dataset.cards = JSON.stringify([dropElement.dataset.name, dragElement.dataset.name])
                }
            }
        } else {
            if ((dragElement.parentElement.className).includes('groupedCardsContainer')) {
                if (JStore.productions[dragElement.id]) JStore.productions[dragElement.id].resume()
                if (JStore.crafts[dragElement.id]) {
                    JStore.crafts[dragElement.id].clear()
                    delete JStore.crafts[dragElement.id]
                }
                const groupContainer = dragElement.parentElement
                
                dragElement.style.position = ""

                JStore.gameBoard.appendChild(dragElement)

                let newPosition = [(e.clientX - offsetX), (e.clientY - offsetY)]
                dragElement.style.left = newPosition[0] + 'px'
                dragElement.style.top = newPosition[1] + 'px'
                
                let newCardInfos = {
                    "id": dragElement.id,
                    "position": newPosition,
                    "group": null
                }
                DataManagement.pushCard(newCardInfos)

                if (groupContainer.children.length == 1) {
                    // Utilisez la position de l'élément valide pour la nouvelle div
                    const rect = groupContainer.getBoundingClientRect()
                    let lastCardInGroup = groupContainer.lastElementChild
                    lastCardInGroup.style.left = rect.left - (JStore.gameBoardRect.left + 5) + 'px'
                    lastCardInGroup.style.top = rect.top - (JStore.gameBoardRect.top + 5) + 'px'
                    lastCardInGroup.position = ""
                    lastCardInGroup.draggable = true
                    
                    JStore.gameBoard.appendChild(lastCardInGroup)
                    groupContainer.remove()
                    
                    DataManagement.pushCard({
                        id: lastCardInGroup.id,
                        position: [rect.left - (JStore.gameBoardRect.left + 5), rect.top - (JStore.gameBoardRect.top + 5)],
                        group: null
                    })
                } else {
                    groupContainer.lastElementChild.draggable = true
                }
                
                let arrCardsInGroup = JSON.parse(groupContainer.dataset.cards)
                const index = dragElement.dataset.type === "Player" ? arrCardsInGroup.lastIndexOf(dragElement.dataset.type) : arrCardsInGroup.lastIndexOf(dragElement.dataset.name)
                if (index > -1) arrCardsInGroup.splice(index, 1)
                groupContainer.dataset.cards = JSON.stringify(arrCardsInGroup)

                // Restaure l'opacité de l'élément réel
                dragElement.style.opacity = '1'
            } else {
                let newPosition = [(e.clientX - offsetX), (e.clientY - offsetY)]
                dragElement.style.left = newPosition[0] + 'px'
                dragElement.style.top = newPosition[1] + 'px'
                        
                // Restaure l'opacité de l'élément réel
                dragElement.style.opacity = '1'
                
                let newCardInfos = {
                    "id": dragElement.id,
                    "position": newPosition
                }
                DataManagement.pushCard(newCardInfos)
            }
            Verifiers.repositionIfOutOfBounds(dragElement)
        }

        if (JStore.lastValidatedElement) {
            JStore.lastValidatedElement = null
        }
        JStore.hasGroupDrag = null
    },
    hoverOnMove(cardContainer, infos, e) {
        if (!JStore.hasGroupClass && cardContainer.draggable) {
            // Obtenez l'élément survolé
            const hoveredElement = e.target

            // Vérifiez l'attribut data-name
            const dataName = hoveredElement.getAttribute('data-name')

            if (dataName && (CardsRules[infos.categorie][infos.name].stackable).includes(dataName)) {
                // Stocke une référence à l'élément validé
                JStore.lastValidatedElement = hoveredElement
            }
        }
    },
    leaveOnMove(e) {
        // Si l'élément est le même que l'élément précédemment validé, retire l'outline
        if (e.target === JStore.lastValidatedElement && JStore.lastValidatedElement.contains(e.relatedTarget) === false) {
            JStore.lastValidatedElement = null
        }
        if (e.target === JStore.playerCardHover && JStore.playerCardHover.contains(e.relatedTarget) === false) {
            JStore.playerCardHover = undefined
        }
    },
    startMoveGroup(dragElement, e) {
        JStore.hasGroupDrag = true

        // Réduit l'opacité de l'élément réel pendant le drag
        dragElement.style.opacity = '0.001'
        // Applique un z-index encore plus élevé à l'élément déplacé
        JStore.highestZIndex += 1;
        dragElement.style.zIndex = JStore.highestZIndex.toString();

        let rect = dragElement.getBoundingClientRect();
        offsetX = e.clientX - rect.left + JStore.gameBoardRect.left + 7;
        offsetY = e.clientY - rect.top + JStore.gameBoardRect.top + 7;
    },
    endMoveGroup(dragElement, e) {
        JStore.hasGroupDrag = null

        let newGoupPosition = [(e.clientX - offsetX), (e.clientY - offsetY)]
        dragElement.style.left = newGoupPosition[0] + 'px'
        dragElement.style.top = newGoupPosition[1] + 'px'
                
        // Restaure l'opacité de l'élément réel
        dragElement.style.opacity = '1'

        Verifiers.repositionIfOutOfBounds(dragElement)

        let cardsForSell = [...dragElement.children]
        cardsForSell.forEach(card => {
            let newCardInfos = {
                "id": card.id,
                "position": newGoupPosition
            }
            DataManagement.pushCard(newCardInfos)
        })
    },
    sellCard(elementForSell, e) {
        if ((elementForSell.className).includes('groupedCardsContainer')) {
            let cardsForSell = [...elementForSell.children]
            let amount = 0
            let cardsForRemove = []
            let allSalable = true
            cardsForSell.forEach(cardForSell => {
                if (!CardsRules[cardForSell.dataset.type][cardForSell.dataset.name].skills.price) allSalable = false
                amount += CardsRules[cardForSell.dataset.type][cardForSell.dataset.name].skills.price
                cardsForRemove.push(cardForSell)

            })
            if (allSalable) {
                Coins.up(amount)
                elementForSell.remove()
                cardsForRemove.forEach(cardForRemove => {
                    DataManagement.removeCard(cardForRemove.id)
                    if (JStore.productions[cardForRemove.id]) {
                        JStore.productions[cardForRemove.id].clear()
                        delete JStore.productions[cardForRemove.id]
                    }
                    if (JStore.crafts[cardForRemove.id]) {
                        JStore.crafts[cardForRemove.id].clear()
                        delete JStore.crafts[cardForRemove.id]
                    }
                })
            } else {
                MovementActions.endMoveGroup(e.currentTarget, e)
            }
        } else {
            if (CardsRules[elementForSell.dataset.type][elementForSell.dataset.name].skills.price) {
                Coins.up(CardsRules[elementForSell.dataset.type][elementForSell.dataset.name].skills.price)
                DataManagement.removeCard(elementForSell.id)
            
                if ((elementForSell.parentElement.className).includes('groupedCardsContainer')) {
                    let groupContainer = elementForSell.parentElement
                    if (groupContainer.children.length == 1) {
                        const rect = groupContainer.getBoundingClientRect()
                        let lastCardInGroup = groupContainer.lastElementChild
                        lastCardInGroup.style.left = rect.left - (JStore.gameBoardRect.left + 7) + 'px'
                        lastCardInGroup.style.top = rect.top - (JStore.gameBoardRect.top + 7) + 'px'
                        lastCardInGroup.position = ""
                        lastCardInGroup.draggable = true
                        
                        JStore.gameBoard.appendChild(lastCardInGroup)
                        groupContainer.remove()
                    } else {
                        groupContainer.lastElementChild.draggable = true
                        let arrCardsInGroup = JSON.parse(groupContainer.dataset.cards)
                        const index = arrCardsInGroup.lastIndexOf(elementForSell.dataset.name)
                        if (index > -1) arrCardsInGroup.splice(index, 1)
                        groupContainer.dataset.cards = JSON.stringify(arrCardsInGroup)
                    }
                }

                if (JStore.productions[elementForSell.id]) {
                    JStore.productions[elementForSell.id].clear()
                    delete JStore.productions[elementForSell.id]
                }
                if (JStore.crafts[elementForSell.id]) {
                    JStore.crafts[elementForSell.id].clear()
                    delete JStore.crafts[elementForSell.id]
                }
                elementForSell.remove()
            } else {
                MovementActions.endMoveCard(elementForSell, e)
            }
        }
    },
    startMoveDeck(dragElement, e) {
        // Réduit l'opacité de l'élément réel pendant le drag
        dragElement.style.opacity = '0.001'
        // Applique un z-index encore plus élevé à l'élément déplacé
        JStore.highestZIndex += 1;
        dragElement.style.zIndex = JStore.highestZIndex.toString();

        let rect = dragElement.getBoundingClientRect();
        offsetX = e.clientX - rect.left + JStore.gameBoardRect.left + 7;
        offsetY = e.clientY - rect.top + JStore.gameBoardRect.top + 7;
    },
    endMoveDeck(dragElement, e) {
        dragElement.style.left = (e.clientX - offsetX) + 'px'
        dragElement.style.top = (e.clientY - offsetY) + 'px'
                
        // Restaure l'opacité de l'élément réel
        dragElement.style.opacity = '1'

        Verifiers.repositionIfOutOfBounds(dragElement)
    },
    eatCard(e) {
        let dragCard = e.currentTarget
        if (CardsRules[dragCard.dataset.type][dragCard.dataset.name].skills.food) {
            CardsRules[JStore.playerCardHover.dataset.type][JStore.playerCardHover.dataset.name].feed.favorites

            const dragCardName = dragCard.dataset.name
            const dragCardType = dragCard.dataset.type
            const favoritesList = CardsRules[JStore.playerCardHover.dataset.type][JStore.playerCardHover.dataset.name].feed.favorites

            // Trouver le gain correspondant
            let gain
            const isFavorite = favoritesList.some(item => {
                if (item.name === dragCardName) {
                    gain = item.gain
                    return true
                }
                return false
            });
            
            let idCardFind = DataManagement.checkIdInCartes(JStore.playerCardHover.id)

            if (isFavorite && gain) {                
                const foodSkill = CardsRules[dragCardType][dragCardName].skills.food

                let gainOperator = gain.charAt(0)
                let gainValue = parseFloat(gain.substring(1))

                let result = undefined

                switch (gainOperator) {
                    case '+':
                        result = foodSkill + gainValue
                        break;
                    case '-':
                        result = foodSkill - gainValue
                        break;
                    case '*':
                        result = foodSkill * gainValue
                        break;
                    case '/':
                        if (gainValue !== 0) {
                            result = foodSkill / gainValue
                        } else {
                            throw new Error("Division by zero is not allowed.")
                        }
                        break;
                    default:
                        throw new Error("Invalid operator.");
                }

                JStore.dataStore.cartes[idCardFind].hungry -= result
            } else {
                JStore.dataStore.cartes[idCardFind].hungry -= CardsRules[dragCard.dataset.type][dragCard.dataset.name].skills.food
            }

            DataManagement.removeCard(dragCard.id)

            if (JStore.dataStore.cartes[idCardFind].hungry <= 0) {
                JStore.playerCardHover.style.outline = "3px solid green"
                JStore.playerCardHover = null

                JStore.allPlayerSatiated = true
                let allPlayerCards = document.querySelectorAll('.cardContainer[data-type="Player"]')
                allPlayerCards.forEach(playerCard => {
                    let idCardFind = DataManagement.checkIdInCartes(playerCard.id)
                    if (JStore.dataStore.cartes[idCardFind].hungry > 0) JStore.allPlayerSatiated = false
                })
                if (JStore.allPlayerSatiated) {
                    allPlayerCards.forEach(playerCard => {
                        playerCard.style.outline = ''
                    })

                    DayGestion.beforeStartNewDay()
                }
            }

        } else {
            MovementActions.endMoveCard(dragCard, e)
        }
    },
}

const Verifiers = {
    repositionIfOutOfBounds(element) {
        const rect = element.getBoundingClientRect()
      
        // Vérifier si l'élément dépasse à droite
        if (rect.left + rect.width > JStore.gameBoardRect.right) {
            element.style.left = `${JStore.gameBoardRect.width - 14 - rect.width}px`
        }
        // Vérifier si l'élément dépasse à gauche
        if (rect.left < JStore.gameBoardRect.left) {
            element.style.left = "0px"
        }
        // Vérifier si l'élément dépasse en bas
        if (rect.bottom > JStore.gameBoardRect.bottom) {
            element.style.top = `${JStore.gameBoardRect.height - 14 - rect.height}px`
        }
        // Vérifier si l'élément dépasse en haut
        if (rect.top < JStore.gameBoardRect.top) {
            element.style.top = "0px"
        }
    },
    isACraft(arrayOfCrafts, groupedCards) {
        function areArraysEqual(arr1, arr2) {
    
            if (arr1.length !== arr2.length) {
                return false
            }
          
            const sortedArr1 = [...arr1].sort()
            const sortedArr2 = [...arr2].sort()
          
            return sortedArr1.every((value, index) => value === sortedArr2[index])
        }
    
        const craft = arrayOfCrafts.find(c => areArraysEqual(c.cards, groupedCards))
        
        if (craft) {
            return craft
        }
    
        return false
    }
}

const Generation = {
    Group(id, position) {
        let groupedCardsContainer = document.createElement('div')
        groupedCardsContainer.className = "groupedCardsContainer"
        groupedCardsContainer.id = id
        groupedCardsContainer.draggable = true
        groupedCardsContainer.style.left = position[0] + 'px'
        groupedCardsContainer.style.top = position[1] + 'px'

        groupedCardsContainer.addEventListener('dragstart', (e) => {
            e.stopPropagation()
            MovementActions.startMoveGroup(e.currentTarget, e)
        })
        groupedCardsContainer.addEventListener('dragend', (e) => {
            if (JStore.hoverSellZone) {
                MovementActions.sellCard(e.currentTarget, e)
            } else {
                MovementActions.endMoveGroup(e.currentTarget, e)
            }
        })

        return groupedCardsContainer
    },
    Card(infos, group = false) {
        let cardContainer = document.createElement('div')
        cardContainer.className = "cardContainer"
        cardContainer.id = infos.id
        cardContainer.dataset.type = infos.categorie
        cardContainer.dataset.name = infos.name

        JStore.highestZIndex += 1
        cardContainer.style.zIndex = JStore.highestZIndex.toString()

        if (!group) {
            cardContainer.draggable = true
            cardContainer.style.left = infos.position[0] + 'px'
            cardContainer.style.top = infos.position[1] + 'px'
        }

        cardContainer.addEventListener('dragstart', (e) => {
            e.stopPropagation()
            MovementActions.startMoveCard(e.currentTarget, e)
        })
        cardContainer.addEventListener('dragend', (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (JStore.hoverSellZone) {
                MovementActions.sellCard(e.currentTarget, e)
            } else if (JStore.endDay && JStore.playerCardHover) {
                MovementActions.eatCard(e)
            } else {
                MovementActions.endMoveCard(e.currentTarget, e)
            }
        })
        document.addEventListener('dragenter', (e) => {
            MovementActions.hoverOnMove(cardContainer, infos, e)
        })
        document.addEventListener('dragleave', (e) => {
            MovementActions.leaveOnMove(e)
        })

        let flagContainer = document.createElement('div')
        flagContainer.className = "flagContainer"
        flagContainer.innerHTML = CardComponents.Flag.left
        flagContainer.innerHTML += CardComponents.Flag.middle(infos.name)
        flagContainer.innerHTML += CardComponents.Flag.right
        cardContainer.appendChild(flagContainer)

        let illustrationContainer = document.createElement('div')
        illustrationContainer.className = "illustrationContainer"
        let illu = document.createElement('img')
        illu.src = `cards/illustrations/${infos.name.toLowerCase()}.png`
        illu.draggable = false
        illustrationContainer.appendChild(illu)
        
        cardContainer.appendChild(illustrationContainer)

        let skillsContainer = document.createElement('div')
        skillsContainer.className = "skillsContainer"

        Object.entries(CardsRules[infos.categorie][infos.name].skills).forEach(([key, value]) => {
            skillsContainer.innerHTML += CardComponents.Skills[key](value, infos.id)
        })
        
        cardContainer.appendChild(skillsContainer)

        return cardContainer
    },
    Processing(callback, element, produce) {
        let anyOverlay = element.querySelector('div.overlay-processing')
        let proccessingOverlay
        if (anyOverlay) {
            proccessingOverlay = anyOverlay
            proccessingOverlay.style.transition = `width 0s linear`
            proccessingOverlay.style.width = ''
        } else {
            // Créez un nouvel élément div pour servir d'overlay
            proccessingOverlay = document.createElement('div')
            proccessingOverlay.className = 'overlay-processing'
            element.appendChild(proccessingOverlay)
        }
        proccessingOverlay.style.transition = `width ${produce.duration}s linear`
        setTimeout(() => {
            proccessingOverlay.style.width = '100%'
        }, 10)

        JStore.productions[element.id] = new PausableInterval(() => {
            proccessingOverlay.style.transition = `width 0s linear`
            proccessingOverlay.style.width = ''
            let newCardInfos = {
                "type": "card",
                "id": Generation.Id({'name': produce.type.name, 'categorie': produce.type.categorie}),
                "categorie": produce.type.categorie,
                "name": produce.type.name,
                "position": Generation.RandomPosition(element)
            }
            let cardCreated = Generation.Card(newCardInfos, false)
            DataManagement.pushCard(newCardInfos)

            if (CardsRules[produce.type.categorie][produce.type.name].produce) {
                Generation.Processing((processId) => {}, cardCreated, CardsRules[produce.type.categorie][produce.type.name].produce)
                if (!JStore.endDay) JStore.productions[cardCreated.id].start()
            }

            proccessingOverlay.style.transition = `width ${produce.duration}s linear`
            setTimeout(() => {
                proccessingOverlay.style.width = '100%'
            }, 10)

            JStore.gameBoard.appendChild(cardCreated)
            Verifiers.repositionIfOutOfBounds(cardCreated)

            if (CardsRules[element.dataset.type][element.dataset.name].produce.consumed) {
                JStore.productions[element.id].clear()
                delete JStore.productions[element.id]
                element.remove()
            }

            callback(element.id)
        }, produce.duration * 1000, CardsRules[element.dataset.type][element.dataset.name].produce.consumed);
        if (!JStore.endDay) JStore.productions[element.id].start()
    },
    Crafting(callback, element, produce) {
        let anyOverlay = element.querySelector('div.overlay-processing')
        let proccessingOverlay
        if (anyOverlay) {
            proccessingOverlay = anyOverlay
            proccessingOverlay.style.transition = `width 0s linear`
            proccessingOverlay.style.width = ''
        } else {
            // Créez un nouvel élément div pour servir d'overlay
            proccessingOverlay = document.createElement('div')
            proccessingOverlay.className = 'overlay-processing'
            element.appendChild(proccessingOverlay)
        }
        proccessingOverlay.style.transition = `width ${produce.duration}s linear`
        setTimeout(() => {
            proccessingOverlay.style.width = '100%'
        }, 10)

        JStore.crafts[element.id] = new PausableTimeout(() => {
            proccessingOverlay.style.transition = `width 0s linear`
            proccessingOverlay.style.width = ''
            produce.products.forEach(product => {
                let quantity = 0
                while (quantity < product.quantity) {
                    let newCardInfos = {
                        "type": "card",
                        "id": Generation.Id({'name': product.name, 'categorie': product.categorie}),
                        "categorie": product.categorie,
                        "name": product.name,
                        "position": Generation.RandomPosition(element)
                    }
                    let cardCreated = Generation.Card(newCardInfos, false)
                    DataManagement.pushCard(newCardInfos)
                    if (CardsRules[product.categorie][product.name].produce) {
                        Generation.Processing((processId) => {}, cardCreated, CardsRules[product.categorie][product.name].produce)
                        if (!JStore.endDay) JStore.productions[cardCreated.id].start()
                    }   
                    JStore.gameBoard.appendChild(cardCreated)
                    Verifiers.repositionIfOutOfBounds(cardCreated)
                    quantity++
                }
            })
            JStore.crafts[element.id].clear()
            delete JStore.crafts[element.id]
            callback()
        }, produce.duration * 1000)
        if (JStore.endDay) JStore.crafts[element.id].pause()
    },
    RandomPosition(element) {
        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        // Obtenir la largeur et la hauteur de la fenêtre de vue
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (!element) {
            // Si aucun élément n'est fourni, génère une position aléatoire dans tout l'espace de la fenêtre.
            return [getRandom(0, viewportWidth), getRandom(0, viewportHeight)];
        }

        // Obtenir la position et la dimension de l'élément
        const rect = element.getBoundingClientRect();
        const elementX = rect.left;
        const elementY = rect.top;
        
        // Calculer 25% de la viewportWidth pour la distance maximale
        const maxDistance = 0.10 * viewportWidth;
        
        // Générer une position aléatoire (x, y) autour de l'élément
        const randomX = getRandom(elementX - maxDistance, elementX + rect.width + maxDistance);
        const randomY = getRandom(elementY - maxDistance, elementY + rect.height + maxDistance);
        
        // S'assurer que les coordonnées sont dans les limites de la fenêtre de vue
        const finalX = Math.min(Math.max(0, randomX), viewportWidth);
        const finalY = Math.min(Math.max(0, randomY), viewportHeight);
        
        return [finalX, finalY]
    },
    Id(infos, group = false) {
        if (group) {
            return group + Math.random().toString(36).substr(2, 9)
        } else {
            return infos.categorie + infos.name + Math.random().toString(36).substr(2, 9)
        }
    }
}

class PausableInterval {
    constructor(callback, interval, consumed = false) {
        this.callback = callback
        this.interval = interval
        this.id = null
        this.paused = false
        this.remainingTime = interval
        this.startTime = null
        this.timeoutId = null
        this.inTimeout = false
        this.consumed = consumed
    }

    callbackAndReset() {
        this.callback()
        this.startTime = Date.now()
        this.remainingTime = this.interval
        this.currentDelay = null
    }    

    start(firstDelay = null) {
        this.currentDelay = firstDelay !== null ? firstDelay : this.remainingTime

        if (!this.id && !this.paused) {
            if (firstDelay !== null) {
                this.inTimeout = true
                this.startTime = Date.now()
                this.timeoutId = setTimeout(() => {
                    this.inTimeout = false
                    this.callbackAndReset()
                    
                    if (!this.consumed) {
                        this.id = setInterval(this.callbackAndReset.bind(this), this.interval)
                    }
                }, firstDelay);
            } else {
                this.startTime = Date.now()
                this.id = setInterval(this.callbackAndReset.bind(this), this.interval)
            }
        }
    }

    pause() {
        const elapsed = Date.now() - this.startTime
        
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = null
        }
        
        if (this.id) {
            clearInterval(this.id)
            this.id = null
        }
        
        if (!this.paused) {
            this.paused = true
            if (this.inTimeout) {
                this.remainingTime = this.currentDelay - elapsed
            } else {
                this.remainingTime -= elapsed
            }
            if (this.remainingTime < 0) this.remainingTime = 0
        }
    }

    resume() {
        if (!this.id && this.paused) {
            this.paused = false
            this.start(this.remainingTime)
        }
    }

    clear() {
        clearInterval(this.id)
        this.id = null
        clearTimeout(this.timeoutId)
        this.timeoutId = null
        this.paused = false
        this.remainingTime = this.interval
    }

    getTimeRemain() {
        if (this.paused) {
            return this.remainingTime
        } else {
            // Temps actuel - Heure de démarrage du dernier intervalle
            const elapsed = Date.now() - this.startTime
            return this.interval - elapsed % this.interval
        }
    }
}

class PausableTimeout {
    constructor(callback, delay) {
        this.callback = callback;
        this.originalDelay = delay;
        this.remaining = delay;
        this.startTime = Date.now();
        this.id = setTimeout(callback, delay);
        this.paused = false;
    }

    pause() {
        if (this.id && !this.paused) {
            clearTimeout(this.id);
            this.id = null;
            this.remaining -= Date.now() - this.startTime;
            if (this.remaining < 0) this.remaining = 0;  // Assurez-vous qu'il ne devient jamais négatif
            this.paused = true;
        }
    }    

    resume() {
        if (this.paused && this.remaining > 0) {
            this.startTime = Date.now();
            this.id = setTimeout(this.callback, this.remaining);
            this.paused = false;
        }
    }

    clear() {
        clearTimeout(this.id);
        this.id = null;
        this.paused = false;
        this.remaining = this.originalDelay;
    }

    getTimeRemain() {
        if (this.paused) {
            return this.remaining;
        } else {
            return Math.max(0, this.remaining - (Date.now() - this.startTime));
        }
    }
}

const Coins = {
    display() {
        JStore.coins.container.innerText = JStore.coins.value
    },
    up(value) {
        JStore.coins.value += value
        JStore.dataStore.coins = JStore.coins.value
        this.display()
    },
    down(value) {
        if (JStore.coins.value - value >= 0) {
            JStore.coins.value -= value
            JStore.dataStore.coins = JStore.coins.value
            this.display()
            return true
        } else {
            return false
        }
    }
}

const Shop = {
    buy(packName) {
        if (JStore.coins.value - GameRules.packs[packName].price >= 0) {
            let cardsRepartition = this.determineCards(GameRules.packs[packName].categoriesStats)

            let cardsGenerate = []

            for (const [typeOfCards, nbOfCards] of Object.entries(cardsRepartition)) {
                cardsGenerate.push(...this.generateCardTypes(GameRules.packs[packName].cardsStats[typeOfCards], nbOfCards, typeOfCards))
            }

            let paid = Coins.down(GameRules.packs[packName].price)

            if (paid) {
                const deck = document.createElement('div')
                deck.className = 'deckContainer'
                deck.id = Generation.Id(null, 'Deck')

                let gameBoardRect = JStore.gameBoard.getBoundingClientRect()

                let deckPosition = [Math.floor(Math.random() * gameBoardRect.width) + gameBoardRect.left, Math.floor(Math.random() * gameBoardRect.height) + gameBoardRect.top]
                deck.style.left = deckPosition[0] + 'px'
                deck.style.top = deckPosition[1] + 'px'
                JStore.highestZIndex += 1;
                deck.style.zIndex = JStore.highestZIndex.toString();
                deck.draggable = true

                JStore.dataStore.decks.push({
                    id: deck.id,
                    position: deckPosition,
                    cards: cardsGenerate
                })
                let deckId = JStore.dataStore.decks.findIndex(elDeck => elDeck.id === deck.id)

                deck.addEventListener('click', () => {
                    let newCardInfos = {
                        "type": "card",
                        "id": Generation.Id({'name': JStore.dataStore.decks[deckId].cards[0].name, 'categorie': JStore.dataStore.decks[deckId].cards[0].categorie}),
                        "categorie": JStore.dataStore.decks[deckId].cards[0].categorie,
                        "name": JStore.dataStore.decks[deckId].cards[0].name,
                        "position": Generation.RandomPosition(deck)
                    }
                    let cardCreated = Generation.Card(newCardInfos, false)
                    JStore.gameBoard.appendChild(cardCreated)
                    DataManagement.pushCard(newCardInfos)
                    if (CardsRules[JStore.dataStore.decks[deckId].cards[0].categorie][JStore.dataStore.decks[deckId].cards[0].name].produce) Generation.Processing((processId) => {}, cardCreated, CardsRules[JStore.dataStore.decks[deckId].cards[0].categorie][JStore.dataStore.decks[deckId].cards[0].name].produce)
                    Verifiers.repositionIfOutOfBounds(cardCreated)
                    JStore.dataStore.decks[deckId].cards.shift()

                    if (JStore.dataStore.decks[deckId].cards.length <= 0) {
                        deck.remove()
                        JStore.dataStore.decks.splice(deckId, 1)
                    }
                })
                
                deck.addEventListener('dragstart', (e) => {
                    e.stopPropagation()
                    MovementActions.startMoveDeck(e.currentTarget, e)
                })
                deck.addEventListener('dragend', (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    MovementActions.endMoveDeck(e.currentTarget, e)
                })

                JStore.gameBoard.appendChild(deck)

                Verifiers.repositionIfOutOfBounds(deck)
            }
        }
    },
    getRandomValueFromDistribution(distribution) {
        let randomValue = Math.random();
        let accumulatedProbability = 0;
      
        for (const [key, probability] of Object.entries(distribution)) {
            accumulatedProbability += probability;
            if (randomValue <= accumulatedProbability) {
                return key;
            }
        }
      
        throw new Error("Invalid probability distribution");
    },
    determineCards(categoriesStats) {
        let cards = {}
      
        do {
            for (const [key, value] of Object.entries(categoriesStats)) {
                cards[key] = this.getRandomValueFromDistribution(value)
            }
        } while (Object.values(cards).reduce((accumulator, num) => accumulator + parseInt(num), 0) !== 6)
      
        return cards
    },
    generateCardTypes(distribution, n, categorie) {
        const result = [];
        for (let i = 0; i < n; i++) {
            result.push({
                "categorie": categorie,
                "name": this.getRandomValueFromDistribution(distribution)
            });
        }
        return result
    }
}

const DayGestion = {
    dayTimeout: undefined,
    animation() {
        JStore.days.animation.style.transition = `width 0s linear`
        JStore.days.animation.style.width = ''
        setTimeout(() => {
            JStore.days.animation.style.transition = `width ${GameRules.dayDuration}s linear`
            setTimeout(() => {
                JStore.days.animation.style.width = '100%'
            }, 10)
        }, 50)
    },
    nextDay() {
        JStore.days.container.innerText = JStore.days.value
        this.runDay()
    },
    runDay() {
        this.animation()
        this.dayTimeout = new PausableTimeout(() => {
            this.pauseAll()
        }, GameRules.dayDuration * 1000)
    },
    pauseAll() {
        JStore.endDay = true
        for (const [key, value] of Object.entries(JStore.productions)) {
            JStore.productions[key].pause()
            DataManagement.pushCard({
                id: key,
                processRemain: JStore.productions[key].getTimeRemain()
            })
        }
        for (const [key, value] of Object.entries(JStore.crafts)) {
            JStore.crafts[key].pause()
            DataManagement.pushCard({
                id: key,
                craftingRemain: JStore.crafts[key].getTimeRemain()
            })
        }

        JStore.endDayScreen.style.display = ''
        let endDayDisplay = document.createElement('div')
        endDayDisplay.innerText = `Fin du jour ${JStore.days.value}`
        endDayDisplay.className = 'endDayText'
        JStore.endDayScreen.appendChild(endDayDisplay)
        let btnStartEat = document.createElement('div')
        btnStartEat.innerText = 'Nourrir mes Jean'
        btnStartEat.className = 'btnSuccess'
        btnStartEat.style.visibility = 'hidden'
        JStore.endDayScreen.appendChild(btnStartEat)

        btnStartEat.addEventListener('click', () => {
            JStore.endDayScreen.removeChild(btnStartEat)
            JStore.endDayScreen.removeChild(endDayDisplay)
            JStore.endDayScreen.style.display = 'none'
            JStore.allPlayerSatiated = false
        })

        setTimeout(() => {
            btnStartEat.style.visibility = ''
        }, 1250)

        let allPlayerCards = document.querySelectorAll('.cardContainer[data-type="Player"]')
        allPlayerCards.forEach(playerCard => {
            DataManagement.pushCard({
                id: playerCard.id,
                hungry: CardsRules[playerCard.dataset.type][playerCard.dataset.name].feed.need
            })
            playerCard.style.outline = '3px red solid'
            playerCard.addEventListener('dragenter', () => {
                JStore.playerCardHover = playerCard
            })
            playerCard.addEventListener('dragleave', () => {
                if (e.target === JStore.playerCardHover && JStore.playerCardHover.contains(e.relatedTarget) === false) {
                    JStore.playerCardHover = undefined
                }
            })
        })
    },
    beforeStartNewDay() {
        JStore.endDayScreen.classList.add('blackOverlay')

        let endDayDisplay = document.createElement('div')
        endDayDisplay.innerText = `Jour ${JStore.days.value} terminé`
        endDayDisplay.className = 'titleEndDay'
        JStore.endDayScreen.appendChild(endDayDisplay)

        let rewardContainer = document.createElement('div')
        let rewardSelect
        if (GameRules.rewards[JStore.days.value]) {
            rewardContainer.className = 'rewardContainer'

            let headRewardContainer = document.createElement('div')
            headRewardContainer.className = 'headRewardContainer'

            let rewardTitle = document.createElement('div')
            rewardTitle.className = "rewardTitle"
            rewardTitle.innerText = GameRules.rewards[JStore.days.value].title
            headRewardContainer.appendChild(rewardTitle)
            
            let rewardText = document.createElement('div')
            rewardText.className = "rewardText"
            rewardText.innerText = GameRules.rewards[JStore.days.value].text
            headRewardContainer.appendChild(rewardText)

            rewardContainer.appendChild(headRewardContainer)

            let choicesContainer = document.createElement('div')
            choicesContainer.className = 'choicesContainer'
            let orChoice = false
            let orElement = document.createElement('div')
            orElement.className = 'orElement'
            orElement.innerText = 'ou'
            let choices = []
            GameRules.rewards[JStore.days.value].cards.forEach((card) => {
                if (orChoice) {
                    choicesContainer.appendChild(orElement)
                }

                let imgCard = document.createElement('img')
                imgCard.src = `/cards/visuel/${card.categorie}${card.name}.png`

                choicesContainer.appendChild(imgCard)
                choices.push(imgCard)
                orChoice = true

                imgCard.addEventListener('click', () => {
                    choices.forEach(el => {
                        el.classList.remove('on')
                        el.classList.add('off')
                    })
                    imgCard.classList.remove('off')
                    imgCard.classList.add('on')
                    rewardSelect = {
                        categorie: card.categorie,
                        name: card.name
                    }
                })
            })
            rewardContainer.appendChild(choicesContainer)

            JStore.endDayScreen.appendChild(rewardContainer)
        }

        let btnStartNextDay = document.createElement('div')
        btnStartNextDay.innerText = 'Lancer le jour suivant'
        btnStartNextDay.className = 'btnSuccess'
        JStore.endDayScreen.appendChild(btnStartNextDay)

        btnStartNextDay.addEventListener('click', () => {
            if (GameRules.rewards[JStore.days.value]) {
                if (rewardSelect) {
                    let newCardInfos = {
                        "type": "card",
                        "id": Generation.Id(rewardSelect),
                        "categorie": rewardSelect.categorie,
                        "name": rewardSelect.name,
                        "position": Generation.RandomPosition()
                    }
                    let cardCreated = Generation.Card(newCardInfos, false)
                    DataManagement.pushCard(newCardInfos)
                    if (CardsRules[rewardSelect.categorie][rewardSelect.name].produce) {
                        Generation.Processing((processId) => {}, cardCreated, CardsRules[rewardSelect.categorie][rewardSelect.name].produce)
                    }   
                    JStore.gameBoard.appendChild(cardCreated)
                    Verifiers.repositionIfOutOfBounds(cardCreated)
        
                    rewardSelect = null
                } else {
                    return "Aucune récompense sélectionné"
                }
            }
            JStore.endDayScreen.removeChild(btnStartNextDay)
            JStore.endDayScreen.removeChild(endDayDisplay)
            if (rewardContainer) JStore.endDayScreen.removeChild(rewardContainer)
            JStore.endDayScreen.style.display = 'none'
            JStore.endDayScreen.classList.remove('blackOverlay')

            JStore.endDay = false

            JStore.dataStore.day = JStore.days.value++
            DataManagement.saveLocal()

            for (const [key, value] of Object.entries(JStore.productions)) {
                JStore.productions[key].resume()
            }
            for (const [key, value] of Object.entries(JStore.crafts)) {
                JStore.crafts[key].resume()
            }
            
            this.nextDay()
        })

        JStore.endDayScreen.style.display = ''
    }
}

const DataManagement = {
    saveLocal() {
        localStorage.setItem("KichGame", JSON.stringify(JStore.dataStore))
    },
    getSaveLocal() {
        return JSON.parse(localStorage.getItem("KichGame"))
    },
    pushCard(element) {
        let idCardFind = this.checkIdInCartes(element.id)
        if (idCardFind !== -1) {
            let mergeCardInfo = {...JStore.dataStore.cartes[idCardFind], ...element}
            JStore.dataStore.cartes[idCardFind] = mergeCardInfo
        } else {
            if (element.type === 'card' && element.id && element.name && element.categorie) JStore.dataStore.cartes.push(element)
        }
    },
    removeCard(idToRemove) {
        JStore.dataStore.cartes = JStore.dataStore.cartes.filter(carte => carte.id !== idToRemove);
    },
    checkIdInCartes(idToCheck) {
        return JStore.dataStore.cartes.findIndex(carte => carte.id === idToCheck)
    }
}

function completePlayground() {
    JStore.dataStore.cartes.forEach(cardel => {
        if (cardel.group) {
            // check si le group existe
            let group = document.getElementById(cardel.group)
            if (group) {
                let cardCreated = Generation.Card(cardel, true)
                cardCreated.draggable = true

                group.lastElementChild.draggable = false

                group.appendChild(cardCreated)
                
                let arrCardsInGroup = JSON.parse(group.dataset.cards)
                arrCardsInGroup.push(cardel.name)
                group.dataset.cards = JSON.stringify(arrCardsInGroup)
            } else {
                let cardsGroupContainer = Generation.Group(cardel.group, cardel.position)
                let cardCreated = Generation.Card(cardel, true)
                cardCreated.draggable = true
                cardsGroupContainer.appendChild(cardCreated)
                cardsGroupContainer.dataset.cards = JSON.stringify([cardel.name])
                JStore.gameBoard.appendChild(cardsGroupContainer)
            }
        } else {
            let cardCreated = Generation.Card(cardel)
            JStore.gameBoard.appendChild(cardCreated)
            if (CardsRules[cardel.categorie][cardel.name].produce) {
                Generation.Processing((processId) => {}, cardCreated, CardsRules[cardel.categorie][cardel.name].produce)
            }
            Verifiers.repositionIfOutOfBounds(cardCreated)
        }
    })
}

window.onload = () => {
    JStore.dataStore = DataManagement.getSaveLocal() || dataSaved
    JStore.gameBoard = document.getElementById('BoardGame')
    JStore.gameBoardRect = JStore.gameBoard.getBoundingClientRect()
    JStore.coins.container = document.querySelector('div#WalletContainer > p')
    JStore.coins.value = JStore.dataStore.coins
    JStore.coins.container.innerText = JStore.coins.value
    let walletSellZone = document.querySelector('div#WalletContainer')
    walletSellZone.addEventListener('dragenter', (e) => {
        JStore.hoverSellZone = true
    })
    completePlayground()
    walletSellZone.addEventListener('dragleave', (e) => {
        setTimeout(() => {
            JStore.hoverSellZone = false
        }, 10)
    })
    let ShopElements = document.getElementById('ShopElements')
    ShopElements.addEventListener('click', () => { Shop.buy('Farmer') })
    JStore.days.container = document.querySelector('div#DayDisplayContainer > p > span')
    JStore.days.value = JStore.dataStore.day
    JStore.days.container.innerText = JStore.days.value
    JStore.days.animation = document.querySelector('div#DayDisplayContainer > div#fillDay')
    DayGestion.runDay()
    JStore.endDayScreen = document.getElementById('endDayContainer')
    JStore.endDayScreen.style.display = 'none'
    debug()
}

function debug() {
    let resetStorage = document.getElementById('resetStorage')
    resetStorage.addEventListener('click', () => {
        localStorage.removeItem("KichGame")
        location.reload()
    })
}