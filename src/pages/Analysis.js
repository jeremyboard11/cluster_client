import React,{useEffect,useState} from 'react'
var ss = require("string-similarity");
var md5 = require('md5')



const dat = [
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2022",
        "Description": "ORIG CO NAME:PROG UNIVERSAL   CO ENTRY DESCR:INS PREM   SEC:PPD                        ORIG ID:9409348039",
        "Amount": "-89.67",
        "Type": "ACH_DEBIT",
        "Balance": "",
        "Check or Slip #": "",
        "TransactionId": "05f86cb4a2fd0db385674307ac019a71"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/28/2022",
        "Description": "ORIG CO NAME:PERISHABLE DIST. CO ENTRY DESCR:PAYROLL    SEC:PPD                        ORIG ID:1421356368",
        "Amount": "645.94",
        "Type": "ACH_CREDIT",
        "Balance": "",
        "Check or Slip #": "",
        "TransactionId": "a2f7c46de57414d701f1adef06b32d22"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2022",
        "Description": "POS DEBIT                PANDA EXPRESS #2710      ANKENY        IA                                                                                                                                                                                                                                                              0NN0      4410",
        "Amount": "-12.98",
        "Type": "MISC_DEBIT",
        "Balance": "",
        "Check or Slip #": "",
        "TransactionId": "8313f9c60a0e64a2df09adf041618a0f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2022",
        "Description": "PYMT SENT                CASH APP*JEREMY BOARD*A  Visa Transfe  CA",
        "Amount": "-8",
        "Type": "MISC_DEBIT",
        "Balance": "",
        "Check or Slip #": "",
        "TransactionId": "aa1283e966a65d1180d39627c979e706"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/27/2022",
        "Description": "TARGET        00017673 ANKENY IA             09/26",
        "Amount": "-5.58",
        "Type": "DEBIT_CARD",
        "Balance": "24804.51",
        "Check or Slip #": "",
        "TransactionId": "a5af75379ed48d19464a6d13fa263acf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/27/2022",
        "Description": "CULVERS ANKENY ANKENY IA                     09/26",
        "Amount": "-8.68",
        "Type": "DEBIT_CARD",
        "Balance": "24810.09",
        "Check or Slip #": "",
        "TransactionId": "0dd0a5f1bc8af89026007ef875699134"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/27/2022",
        "Description": "McDonald's 3207 ANKENY IA                    09/25",
        "Amount": "-7.94",
        "Type": "DEBIT_CARD",
        "Balance": "24818.77",
        "Check or Slip #": "",
        "TransactionId": "f7adc1c8185a4c0302e6d1e588216ace"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/26/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/25",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "24826.71",
        "Check or Slip #": "",
        "TransactionId": "e073f2296d1f7ab7cb4fab5050829708"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/26/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/24",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "24827.71",
        "Check or Slip #": "",
        "TransactionId": "0ad4eec2f6708350b92988695f2e80cb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/26/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/24",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "24828.71",
        "Check or Slip #": "",
        "TransactionId": "d39f3927bde92ed34f489e6346c9b6b4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/26/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/24",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "24830.71",
        "Check or Slip #": "",
        "TransactionId": "6a210e1b84f74f7f0426eb73f2db8bd2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/22/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/21",
        "Amount": "-40",
        "Type": "DEBIT_CARD",
        "Balance": "24842.71",
        "Check or Slip #": "",
        "TransactionId": "2e7b1f927ad03af348ccf8d63777bf4f"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/21/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "599.21",
        "Type": "ACH_CREDIT",
        "Balance": "24882.71",
        "Check or Slip #": "",
        "TransactionId": "58319f66d34591f6cf48d28a6804bbbc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/19/2022",
        "Description": "WAL-MART #0337 FREDERICKTOWN MO              09/17",
        "Amount": "-6.28",
        "Type": "DEBIT_CARD",
        "Balance": "24283.5",
        "Check or Slip #": "",
        "TransactionId": "e24e122be54d498096001cee7fbef991"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/19/2022",
        "Description": "CASEYS #2614 201 MADIS DONNELLSON IA 342097  09/17",
        "Amount": "-2.66",
        "Type": "DEBIT_CARD",
        "Balance": "24289.78",
        "Check or Slip #": "",
        "TransactionId": "933244e8bc4223649bebca4e5b192584"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/19/2022",
        "Description": "DES MOINES AIRPORT AUTH DES MOINES IA        09/15",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "24292.44",
        "Check or Slip #": "",
        "TransactionId": "5d757f0903e262033dfbbb24aeda241d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/16/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/15",
        "Amount": "-65",
        "Type": "DEBIT_CARD",
        "Balance": "24294.44",
        "Check or Slip #": "",
        "TransactionId": "6ea8899ccf0d5343f1f34a15b3889605"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/15/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/14",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "24359.44",
        "Check or Slip #": "",
        "TransactionId": "bfda80a22c08d34967917129af033955"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/14/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/13",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "24369.44",
        "Check or Slip #": "",
        "TransactionId": "c5a5ee3e98b3856a7842465d061a268a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/14/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/13",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "24373.44",
        "Check or Slip #": "",
        "TransactionId": "04d7065a66657e9260d036135a0292d9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/14/2022",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            09/13",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "24379.44",
        "Check or Slip #": "",
        "TransactionId": "77e14f218d1467473832f4fbfcd7d338"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/14/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "657.19",
        "Type": "ACH_CREDIT",
        "Balance": "24434.44",
        "Check or Slip #": "",
        "TransactionId": "02c00d751164d06c722b1864af3741e3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/13/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 09/12",
        "Amount": "-15.16",
        "Type": "DEBIT_CARD",
        "Balance": "23777.25",
        "Check or Slip #": "",
        "TransactionId": "4cdabe0bfda77b469b7e74200375f661"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/13/2022",
        "Description": "HY-VEE F&F ANKENY 5022 ANKENY IA             09/12",
        "Amount": "-24.75",
        "Type": "DEBIT_CARD",
        "Balance": "23792.41",
        "Check or Slip #": "",
        "TransactionId": "8ea12d1016a11058eadfa349e30f4a81"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/13/2022",
        "Description": "Amazon.com*1M2HC3ZR1 Amzn.com/bill WA        09/13",
        "Amount": "-15.89",
        "Type": "DEBIT_CARD",
        "Balance": "23817.16",
        "Check or Slip #": "",
        "TransactionId": "5c6b6ac2ebe6cd5ca09fff0f8da0640c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/12/2022",
        "Description": "Amazon.com*1F73C4EC2 Amzn.com/bill WA        09/12",
        "Amount": "-13.58",
        "Type": "DEBIT_CARD",
        "Balance": "23833.05",
        "Check or Slip #": "",
        "TransactionId": "df0abe6810228e9d55d617879078b642"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/12/2022",
        "Description": "ZIGGIS COFFEE - ANKENY ANKENY IA             09/10",
        "Amount": "-6.33",
        "Type": "DEBIT_CARD",
        "Balance": "23846.63",
        "Check or Slip #": "",
        "TransactionId": "4b465cb62a860388a8edcc65f62dcb86"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/12/2022",
        "Description": "Amazon Prime*1F1FU1D Amzn.com/bill WA        09/09",
        "Amount": "-15.89",
        "Type": "DEBIT_CARD",
        "Balance": "23852.96",
        "Check or Slip #": "",
        "TransactionId": "35917860aa06823b2b5a56203c47e922"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/09/2022",
        "Description": "SLIM CHICKENS 16201 ANKENY IA                09/08",
        "Amount": "-10.06",
        "Type": "DEBIT_CARD",
        "Balance": "23868.85",
        "Check or Slip #": "",
        "TransactionId": "542c086e972652000a7885681b30e384"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/08/2022",
        "Description": "ALDI 72035 ANKENY IA                 600183  09/08",
        "Amount": "-55.97",
        "Type": "DEBIT_CARD",
        "Balance": "23878.91",
        "Check or Slip #": "",
        "TransactionId": "0edcd95008ccb611c07ee08d8f561721"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/08/2022",
        "Description": "CHIPOTLE 2776 ANKENY IA                      09/07",
        "Amount": "-9.65",
        "Type": "DEBIT_CARD",
        "Balance": "23934.88",
        "Check or Slip #": "",
        "TransactionId": "20ecd9e0aaf57da3aeff1c4c9d025a94"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2022",
        "Description": "CULVERS OF URBANDALE URBANDALE IA            09/06",
        "Amount": "-7.25",
        "Type": "DEBIT_CARD",
        "Balance": "23944.53",
        "Check or Slip #": "",
        "TransactionId": "da08bf56de09e124b620e21663b05905"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/06",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "23951.78",
        "Check or Slip #": "",
        "TransactionId": "b11274bad9e232aa96a601c98a7254ca"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/07/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "633.3",
        "Type": "ACH_CREDIT",
        "Balance": "23958.78",
        "Check or Slip #": "",
        "TransactionId": "108885d68740d9b22d5960952ffe7b96"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/06/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/05",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "23325.48",
        "Check or Slip #": "",
        "TransactionId": "a281ee2a5b17d3298b83bfa24e5e13ab"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/06/2022",
        "Description": "HY-VEE F&F JOHNSTON 531 JOHNSTON IA          09/05",
        "Amount": "-3.34",
        "Type": "DEBIT_CARD",
        "Balance": "23332.48",
        "Check or Slip #": "",
        "TransactionId": "6f4593ca6807e492b57c30043f73f225"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/06/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/05",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "23335.82",
        "Check or Slip #": "",
        "TransactionId": "977a5e0682ceeebd5fad13eb23f5149c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/06/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/03",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "23345.82",
        "Check or Slip #": "",
        "TransactionId": "371cdafe30f3335bcb5df8638b99d6e1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/06/2022",
        "Description": "TST* The Chicken West Des Moin IA            09/03",
        "Amount": "-6.42",
        "Type": "DEBIT_CARD",
        "Balance": "23347.82",
        "Check or Slip #": "",
        "TransactionId": "7e33e8b4dcbc888aa85ae2f3a388c8a5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/06/2022",
        "Description": "ABELARDOS MEXICAN REST 515-9657733 IA        09/02",
        "Amount": "-10.18",
        "Type": "DEBIT_CARD",
        "Balance": "23354.24",
        "Check or Slip #": "",
        "TransactionId": "5985cb56b69cf81586e110c46cfd7cbd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/06/2022",
        "Description": "NORMS- TORRANCE #13 TORRANCE CA              08/31",
        "Amount": "-39.16",
        "Type": "DEBIT_CARD",
        "Balance": "23364.42",
        "Check or Slip #": "",
        "TransactionId": "5fbcda178e74423d5003862680399a13"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2022",
        "Description": "ALDI 72035 ANKENY IA                 533054  09/02",
        "Amount": "-15.78",
        "Type": "DEBIT_CARD",
        "Balance": "23403.58",
        "Check or Slip #": "",
        "TransactionId": "a78fcb3cc502631038c188113cf0a201"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2022",
        "Description": "CASEYS #2689 1310 NW 1 ANKENY IA     453187  09/02",
        "Amount": "-1.69",
        "Type": "DEBIT_CARD",
        "Balance": "23419.36",
        "Check or Slip #": "",
        "TransactionId": "7971b003638dcd3497a0056b2d9399e4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/01",
        "Amount": "-46",
        "Type": "DEBIT_CARD",
        "Balance": "23421.05",
        "Check or Slip #": "",
        "TransactionId": "76cde90349a8ff48666d39861a531903"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2022",
        "Description": "Amazon.com*1V9E24201 Amzn.com/bill WA        09/02",
        "Amount": "-13.58",
        "Type": "DEBIT_CARD",
        "Balance": "23467.05",
        "Check or Slip #": "",
        "TransactionId": "997ccd6e579c4fa948d57e9ace3ab3e8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/01",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "23480.63",
        "Check or Slip #": "",
        "TransactionId": "2765246b216f0e8964233b09c52c3960"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2022",
        "Description": "Big Tomy's Los Angeles CA                    09/01",
        "Amount": "-24.93",
        "Type": "DEBIT_CARD",
        "Balance": "23487.63",
        "Check or Slip #": "",
        "TransactionId": "a01b492eee9d0891f2dc036ce277e351"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/01/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/31",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "23512.56",
        "Check or Slip #": "",
        "TransactionId": "54290774ad1fbfdd95895b7a93a858b2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/01/2022",
        "Description": "ALBERTSONS #0387 LOS ANGELES CA              08/31",
        "Amount": "-12.77",
        "Type": "DEBIT_CARD",
        "Balance": "23517.56",
        "Check or Slip #": "",
        "TransactionId": "b96bc7815820deb0bd688f593f7a5907"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2022",
        "Description": "MIDAMERICAN      ENERGY     0115123306W402  WEB ID: 4421425214",
        "Amount": "-29",
        "Type": "ACH_DEBIT",
        "Balance": "23530.33",
        "Check or Slip #": "",
        "TransactionId": "8c8393ce04a7ab9df1856abc0535afd1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/31",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "23559.33",
        "Check or Slip #": "",
        "TransactionId": "bf150f9e3600db0668f8c5e85a5db2fe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2022",
        "Description": "STARBUCKS STORE 53657 LOS ANGELES CA         08/30",
        "Amount": "-0.2",
        "Type": "DEBIT_CARD",
        "Balance": "23569.33",
        "Check or Slip #": "",
        "TransactionId": "7f8b2f4fc012864d24d40102878433c9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/30",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "23569.53",
        "Check or Slip #": "",
        "TransactionId": "1ed88442700c6ea507bd4b52b9b9d143"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/30",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "23571.53",
        "Check or Slip #": "",
        "TransactionId": "70a8e7279fb06055fe229c25d102d562"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/30",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "23581.53",
        "Check or Slip #": "",
        "TransactionId": "282dcc245d2215cac75f91b8f42203a5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2022",
        "Description": "DON CUCO - TOLUCA LAKE BURBANK CA            08/29",
        "Amount": "-23",
        "Type": "DEBIT_CARD",
        "Balance": "23606.53",
        "Check or Slip #": "",
        "TransactionId": "06e48c8dd72060fe1a37442488502aea"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2022",
        "Description": "#3 HOF'S HUT - LOS ALTO LONG BEACH CA        08/29",
        "Amount": "-19",
        "Type": "DEBIT_CARD",
        "Balance": "23629.53",
        "Check or Slip #": "",
        "TransactionId": "2abbc2e8637a87fec3f6767724a04f50"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/31/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "672.12",
        "Type": "ACH_CREDIT",
        "Balance": "23648.53",
        "Check or Slip #": "",
        "TransactionId": "671e417f234868bb19de5bcb732563bc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2022",
        "Description": "JENSENBRICKHOUSE WEB PMTS   YGH8DB          WEB ID: 9000615921",
        "Amount": "-950",
        "Type": "ACH_DEBIT",
        "Balance": "22976.41",
        "Check or Slip #": "",
        "TransactionId": "be72d9f096ca09d8681b7c63e48a2a3f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2022",
        "Description": "City of Ankeny U PAYMENT    999000000653877 WEB ID: 110312002",
        "Amount": "-47.23",
        "Type": "ACH_DEBIT",
        "Balance": "23926.41",
        "Check or Slip #": "",
        "TransactionId": "90596a644e95f7b99924888b52d0b666"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/29",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "23973.64",
        "Check or Slip #": "",
        "TransactionId": "f2585cc4129df991c76ccc560ecce8e7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/29/2022",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-89.67",
        "Type": "ACH_DEBIT",
        "Balance": "23983.64",
        "Check or Slip #": "",
        "TransactionId": "e7e5575ae75cfec2175ea26c29f61dc0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/29/2022",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            08/29",
        "Amount": "-40",
        "Type": "DEBIT_CARD",
        "Balance": "24073.31",
        "Check or Slip #": "",
        "TransactionId": "79aaba5cd92c34e36fc06936fb4dde19"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/29/2022",
        "Description": "TST* DOG HAUS BIERGARTE LONG BEACH CA        08/28",
        "Amount": "-15.42",
        "Type": "DEBIT_CARD",
        "Balance": "24113.31",
        "Check or Slip #": "",
        "TransactionId": "483277de2ff6e684877f0427731e3cf6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/29/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/27",
        "Amount": "-22",
        "Type": "DEBIT_CARD",
        "Balance": "24128.73",
        "Check or Slip #": "",
        "TransactionId": "9ce8c290859223b0089efe592b9594e6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/29/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/27",
        "Amount": "-8",
        "Type": "DEBIT_CARD",
        "Balance": "24150.73",
        "Check or Slip #": "",
        "TransactionId": "3e63c8a058e096f1c8ef823d54af2c45"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/29/2022",
        "Description": "BERTH 55-FISH MARKET LONG BEACH CA           08/26",
        "Amount": "-33.03",
        "Type": "DEBIT_CARD",
        "Balance": "24158.73",
        "Check or Slip #": "",
        "TransactionId": "1f0686f9c7038b0b7519f3364f77781b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/29/2022",
        "Description": "LA METRO - TAP WEB SAL LOS ANGELES CA        08/27",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "24191.76",
        "Check or Slip #": "",
        "TransactionId": "826a0f5cee77e829528e937e78902b9f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/26/2022",
        "Description": "YELLOW BASKET - SANTA SANTA ANA CA           08/25",
        "Amount": "-24.91",
        "Type": "DEBIT_CARD",
        "Balance": "24194.76",
        "Check or Slip #": "",
        "TransactionId": "1c03e068fd0ca4c325b820a352800e3b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/26/2022",
        "Description": "HUDSON ST1705 DES MOINES IA                  08/25",
        "Amount": "-17.7",
        "Type": "DEBIT_CARD",
        "Balance": "24219.67",
        "Check or Slip #": "",
        "TransactionId": "e8789e33780d0f85d4f0043ed17fbfd1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/25/2022",
        "Description": "CHIPOTLE 2776 ANKENY IA                      08/24",
        "Amount": "-9.65",
        "Type": "DEBIT_CARD",
        "Balance": "24237.37",
        "Check or Slip #": "",
        "TransactionId": "56f861f57b702f2f1adc41cfa6c087c5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/24/2022",
        "Description": "CASEYS #2689 1310 NW 1 ANKENY IA     415160  08/24",
        "Amount": "-1.79",
        "Type": "DEBIT_CARD",
        "Balance": "24247.02",
        "Check or Slip #": "",
        "TransactionId": "ef405a6a86695c8c4e3b4cc3c4d0f33d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/24/2022",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             08/23",
        "Amount": "-9.95",
        "Type": "DEBIT_CARD",
        "Balance": "24248.81",
        "Check or Slip #": "",
        "TransactionId": "3b1934d4d59b25f637f19f4901e300bf"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/24/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "507.96",
        "Type": "ACH_CREDIT",
        "Balance": "24258.76",
        "Check or Slip #": "",
        "TransactionId": "ef8cb20be4564acf9e0247c3424f11e5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/23/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             08/23",
        "Amount": "-5.79",
        "Type": "DEBIT_CARD",
        "Balance": "23750.8",
        "Check or Slip #": "",
        "TransactionId": "7d948a41fbcd6a76e70475d17e6ca0fa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/23/2022",
        "Description": "CULVERS ANKENY ANKENY IA                     08/22",
        "Amount": "-10.27",
        "Type": "DEBIT_CARD",
        "Balance": "23756.59",
        "Check or Slip #": "",
        "TransactionId": "a97bc6bbaae36bf2017b3aa7d5f7ce89"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/22/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             08/22",
        "Amount": "-31.8",
        "Type": "DEBIT_CARD",
        "Balance": "23766.86",
        "Check or Slip #": "",
        "TransactionId": "8e1fedf9cf4d4d6548af203167f45ac9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/22/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/21",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "23798.66",
        "Check or Slip #": "",
        "TransactionId": "29d1d554bd80d18a18fa694ce66ec19a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/22/2022",
        "Description": "HY-VEE F&F ANKENY 5022 ANKENY IA             08/21",
        "Amount": "-2.39",
        "Type": "DEBIT_CARD",
        "Balance": "23801.66",
        "Check or Slip #": "",
        "TransactionId": "f3721f41fa49ce7e9caa5c72e3abadb4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/22/2022",
        "Description": "HY-VEE F&F ANKENY 5022 ANKENY IA             08/21",
        "Amount": "-25.5",
        "Type": "DEBIT_CARD",
        "Balance": "23804.05",
        "Check or Slip #": "",
        "TransactionId": "4ad217f3438be24f0e6e53f34e655593"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/22/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/19",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "23829.55",
        "Check or Slip #": "",
        "TransactionId": "6a65268a8243c5f560373671d32118aa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/18/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 08/17",
        "Amount": "-25.36",
        "Type": "DEBIT_CARD",
        "Balance": "23839.55",
        "Check or Slip #": "",
        "TransactionId": "67163848bb2b070686994b1e1c9fa625"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/18/2022",
        "Description": "SIAM TABLE ANKENY IA                         08/17",
        "Amount": "-14.26",
        "Type": "DEBIT_CARD",
        "Balance": "23864.91",
        "Check or Slip #": "",
        "TransactionId": "f7c05aa1da70e4291564ef61826d375a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/18/2022",
        "Description": "DUNKIN #356645 JOHNSTON IA                   08/17",
        "Amount": "-4.7",
        "Type": "DEBIT_CARD",
        "Balance": "23879.17",
        "Check or Slip #": "",
        "TransactionId": "2323756c868a09fa77fd5b04ee47a3d9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/17/2022",
        "Description": "CULVERS OF URBANDALE URBANDALE IA            08/16",
        "Amount": "-13.57",
        "Type": "DEBIT_CARD",
        "Balance": "23883.87",
        "Check or Slip #": "",
        "TransactionId": "cd731ada5761b986e01ad268d7d06b03"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/17/2022",
        "Description": "ANKENY CINEMA LIBERTY MO                     08/16",
        "Amount": "-17.49",
        "Type": "DEBIT_CARD",
        "Balance": "23897.44",
        "Check or Slip #": "",
        "TransactionId": "ae3f2982f441f8d7717fd9bc9396997b"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/17/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "866.9",
        "Type": "ACH_CREDIT",
        "Balance": "23914.93",
        "Check or Slip #": "",
        "TransactionId": "1c0db127fbed6b077efa85002a4a666b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/16/2022",
        "Description": "CHIPOTLE 2776 ANKENY IA                      08/15",
        "Amount": "-12.77",
        "Type": "DEBIT_CARD",
        "Balance": "23048.03",
        "Check or Slip #": "",
        "TransactionId": "b84b9543cb06dc01b3c1506ddffa94c6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/15/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/13",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "23060.8",
        "Check or Slip #": "",
        "TransactionId": "2f64c86fd30181c7b5ca228fdf76ec83"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/15/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/12",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "23090.8",
        "Check or Slip #": "",
        "TransactionId": "b728a75b1b184ec35f39b4cdc0a783a5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/12/2022",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            08/11",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "23092.8",
        "Check or Slip #": "",
        "TransactionId": "26822b292ad729672bed6e7c9ad7ed9b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/12/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 08/11",
        "Amount": "-37.7",
        "Type": "DEBIT_CARD",
        "Balance": "23147.8",
        "Check or Slip #": "",
        "TransactionId": "6a5dc9259aa999a973487c63cebdffa1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/11/2022",
        "Description": "CULVERS ANKENY ANKENY IA                     08/10",
        "Amount": "-9.42",
        "Type": "DEBIT_CARD",
        "Balance": "23185.5",
        "Check or Slip #": "",
        "TransactionId": "8e6bb49c2456d23ad5252b5c29801b97"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/10/2022",
        "Description": "Amazon Prime*7G6Q42L Amzn.com/bill WA        08/09",
        "Amount": "-15.89",
        "Type": "DEBIT_CARD",
        "Balance": "23194.92",
        "Check or Slip #": "",
        "TransactionId": "64c8bcd694de87f9791c7b59045cb8ae"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/10/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "648.06",
        "Type": "ACH_CREDIT",
        "Balance": "23210.81",
        "Check or Slip #": "",
        "TransactionId": "2b26569df10b6a4fd1f9aed5804bf389"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/09/2022",
        "Description": "SLIM CHICKENS 16201 ANKENY IA                08/08",
        "Amount": "-5.6",
        "Type": "DEBIT_CARD",
        "Balance": "22562.75",
        "Check or Slip #": "",
        "TransactionId": "d57ae74510f7594e42b91c88cce450b4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/08/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/07",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "22568.35",
        "Check or Slip #": "",
        "TransactionId": "456c41b2cf901025156cfd249678207e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/08/2022",
        "Description": "HARDEES 1506082 ANKENY IA                    08/05",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "22570.35",
        "Check or Slip #": "",
        "TransactionId": "d5a4356934d936f740c0abe17153654e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/05/2022",
        "Description": "ALDI 72035 ANKENY IA                 509968  08/05",
        "Amount": "-54.73",
        "Type": "DEBIT_CARD",
        "Balance": "22575.65",
        "Check or Slip #": "",
        "TransactionId": "279030f13e418c5ec4c8df31446b32d9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/05/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/04",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "22630.38",
        "Check or Slip #": "",
        "TransactionId": "4336c9d9a4b560661b5573ed0add2cc0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/04/2022",
        "Description": "HY-VEE F&F ANKENY 5023 ANKENY IA             08/03",
        "Amount": "-3.04",
        "Type": "DEBIT_CARD",
        "Balance": "22631.38",
        "Check or Slip #": "",
        "TransactionId": "e4903a2e790432d5505fd094d0a00819"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/04/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/03",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "22634.42",
        "Check or Slip #": "",
        "TransactionId": "c4a92d407b0fc5197f379d6b190aa0b0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/04/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/03",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "22635.42",
        "Check or Slip #": "",
        "TransactionId": "7ae73ab6b45b0f04f75718d3acac8c20"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/03/2022",
        "Description": "MIDAMERICAN      ENERGY     0115123306W382  WEB ID: 4421425214",
        "Amount": "-29",
        "Type": "ACH_DEBIT",
        "Balance": "22640.42",
        "Check or Slip #": "",
        "TransactionId": "5d9427693fd7816ae28be988ec513cfa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/03/2022",
        "Description": "DUNKIN #356645 JOHNSTON IA                   08/02",
        "Amount": "-8.97",
        "Type": "DEBIT_CARD",
        "Balance": "22669.42",
        "Check or Slip #": "",
        "TransactionId": "fde349a9eeac2f6f2538583acc3b1d81"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/03/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "668.02",
        "Type": "ACH_CREDIT",
        "Balance": "22678.39",
        "Check or Slip #": "",
        "TransactionId": "7865fda9ba50ae1fbec8360c49381709"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/02/2022",
        "Description": "JENSENBRICKHOUSE WEB PMTS   NNBL7B          WEB ID: 9000615921",
        "Amount": "-875",
        "Type": "ACH_DEBIT",
        "Balance": "22010.37",
        "Check or Slip #": "",
        "TransactionId": "47c66e6a3159853c8804d50611620bdc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/01/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/31",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "22885.37",
        "Check or Slip #": "",
        "TransactionId": "536d08173f738f97a9d1215ccdf3acd7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/01/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 07/30",
        "Amount": "-34.83",
        "Type": "DEBIT_CARD",
        "Balance": "22915.37",
        "Check or Slip #": "",
        "TransactionId": "556ae6aab243b80a37d86e3c1c958214"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/01/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 07/30",
        "Amount": "-7.14",
        "Type": "DEBIT_CARD",
        "Balance": "22950.2",
        "Check or Slip #": "",
        "TransactionId": "e13453ecc459bf502670ad32a3a9cb30"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/01/2022",
        "Description": "City of Ankeny U PAYMENT    999000000630969 WEB ID: 110312002",
        "Amount": "-45.96",
        "Type": "ACH_DEBIT",
        "Balance": "22957.34",
        "Check or Slip #": "",
        "TransactionId": "eec8f10eac071b9bda29aa4698fc62e2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/01/2022",
        "Description": "HY-VEE F&F ANKENY 5022 ANKENY IA             07/29",
        "Amount": "-27.21",
        "Type": "DEBIT_CARD",
        "Balance": "23003.3",
        "Check or Slip #": "",
        "TransactionId": "efec01a10f329d5d67cce38e9fc14c00"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/01/2022",
        "Description": "OLIVE GARDEN  00018325 ANKENY IA             07/29",
        "Amount": "-27.3",
        "Type": "DEBIT_CARD",
        "Balance": "23030.51",
        "Check or Slip #": "",
        "TransactionId": "83506b1bc4fa5902b9d799d9db0f9a9e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/29/2022",
        "Description": "ARBY S 5722 ANKENY IA                        07/28",
        "Amount": "-10.59",
        "Type": "DEBIT_CARD",
        "Balance": "23057.81",
        "Check or Slip #": "",
        "TransactionId": "28c709412075a16986b41f05b15ef1ba"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/29/2022",
        "Description": "AMZN Mktp US*AB7XB90 Amzn.com/bill WA        07/28",
        "Amount": "-10.59",
        "Type": "DEBIT_CARD",
        "Balance": "23068.4",
        "Check or Slip #": "",
        "TransactionId": "18221193cbf3ae4fbec02b21e54f1417"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/28/2022",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-89.67",
        "Type": "ACH_DEBIT",
        "Balance": "23078.99",
        "Check or Slip #": "",
        "TransactionId": "ced00184b730d638d1f3d5278821b9e2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/28/2022",
        "Description": "CULVERS ANKENY ANKENY IA                     07/27",
        "Amount": "-8.05",
        "Type": "DEBIT_CARD",
        "Balance": "23168.66",
        "Check or Slip #": "",
        "TransactionId": "6585833742f583ab167412e2c478abb4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/27/2022",
        "Description": "MCDONALD'S F35350 ANKENY IA                  07/26",
        "Amount": "-4.02",
        "Type": "DEBIT_CARD",
        "Balance": "23176.71",
        "Check or Slip #": "",
        "TransactionId": "4f9964025860ee3ecbb4e72044b985e1"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/27/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "629.83",
        "Type": "ACH_CREDIT",
        "Balance": "23180.73",
        "Check or Slip #": "",
        "TransactionId": "ef543b48fbce509e8ac38d39ed2efe55"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/25",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "22550.9",
        "Check or Slip #": "",
        "TransactionId": "0a9e5b8d5c197adb09c3891fa0d755b5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2022",
        "Description": "AMZN Mktp US*QK58O79 Amzn.com/bill WA        07/26",
        "Amount": "-8.47",
        "Type": "DEBIT_CARD",
        "Balance": "22580.9",
        "Check or Slip #": "",
        "TransactionId": "539409609b257973008f098bb0569f07"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/25/2022",
        "Description": "CHIPOTLE 2776 ANKENY IA                      07/24",
        "Amount": "-9.12",
        "Type": "DEBIT_CARD",
        "Balance": "22589.37",
        "Check or Slip #": "",
        "TransactionId": "158ad4ed4d5379ed03e86d690b000e86"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/25/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/23",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "22598.49",
        "Check or Slip #": "",
        "TransactionId": "a67155780a799f4d95b4adc2b8b7184e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/25/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 07/22",
        "Amount": "-2.73",
        "Type": "DEBIT_CARD",
        "Balance": "22599.49",
        "Check or Slip #": "",
        "TransactionId": "c9f1c7182b8151975a153fb45d61b919"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/22/2022",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             07/21",
        "Amount": "-9.85",
        "Type": "DEBIT_CARD",
        "Balance": "22602.22",
        "Check or Slip #": "",
        "TransactionId": "401f5a59130e4581eaf0b7fedf1e091b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/21/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             07/21",
        "Amount": "-45.06",
        "Type": "DEBIT_CARD",
        "Balance": "22612.07",
        "Check or Slip #": "",
        "TransactionId": "763598ac28113bad535c7c578b40885f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/20/2022",
        "Description": "JIFFY LUBE 4034 ANKENY IA                    07/20",
        "Amount": "-62.56",
        "Type": "DEBIT_CARD",
        "Balance": "22657.13",
        "Check or Slip #": "",
        "TransactionId": "dd26c9bdba66fb0178f098bff251b447"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/20/2022",
        "Description": "JIFFY LUBE 4034 ANKENY IA                    07/20",
        "Amount": "-35.39",
        "Type": "DEBIT_CARD",
        "Balance": "22719.69",
        "Check or Slip #": "",
        "TransactionId": "a008f514d7cb62218c4d163462ae2e8f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/20/2022",
        "Description": "CENTURY THEATRES 480 W DES MOINES IA         07/19",
        "Amount": "-9.64",
        "Type": "DEBIT_CARD",
        "Balance": "22755.08",
        "Check or Slip #": "",
        "TransactionId": "f1085a08d38b816350888517fed2e7a5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/20/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       07/19",
        "Amount": "-8.99",
        "Type": "DEBIT_CARD",
        "Balance": "22764.72",
        "Check or Slip #": "",
        "TransactionId": "f3c49d8b234435eba40b832b0b5762fb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/20/2022",
        "Description": "AMZN Mktp US*FG3TM1C Amzn.com/bill WA        07/19",
        "Amount": "-31.79",
        "Type": "DEBIT_CARD",
        "Balance": "22773.71",
        "Check or Slip #": "",
        "TransactionId": "ff0cf99453ef7b4bae87fc4c848ce056"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/20/2022",
        "Description": "McDonald's 35350 ANKENY IA                   07/18",
        "Amount": "-6.35",
        "Type": "DEBIT_CARD",
        "Balance": "22805.5",
        "Check or Slip #": "",
        "TransactionId": "bf7330fc4e95cd87c894b4f23faf62e9"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/20/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "619.64",
        "Type": "ACH_CREDIT",
        "Balance": "22811.85",
        "Check or Slip #": "",
        "TransactionId": "749d3792fe37f330001eaf9798d52796"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/19/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 07/18",
        "Amount": "-14.22",
        "Type": "DEBIT_CARD",
        "Balance": "22192.21",
        "Check or Slip #": "",
        "TransactionId": "edc1b4aa51416891d76715d3ca666a42"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/18/2022",
        "Description": "KUM&GO 4020 ANKENY ANKENY IA         816777  07/17",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "22206.43",
        "Check or Slip #": "",
        "TransactionId": "7c247473395ac7da97535baa04345a14"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/18/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/17",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "22208.43",
        "Check or Slip #": "",
        "TransactionId": "8eeef123a249a78d02ec2533617ec711"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/15/2022",
        "Description": "PANDA EXPRESS #2710 ANKENY IA                07/14",
        "Amount": "-13.3",
        "Type": "DEBIT_CARD",
        "Balance": "22218.43",
        "Check or Slip #": "",
        "TransactionId": "81fd2f4fe01b66c13b15e2f76f60318e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/14/2022",
        "Description": "Wal-Mart Super Center ANKENY IA              07/14",
        "Amount": "-50.23",
        "Type": "DEBIT_CARD",
        "Balance": "22231.73",
        "Check or Slip #": "",
        "TransactionId": "6b584886189294edae1503df5be68a15"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/14/2022",
        "Description": "CULVERS ANKENY ANKENY IA                     07/13",
        "Amount": "-9.74",
        "Type": "DEBIT_CARD",
        "Balance": "22281.96",
        "Check or Slip #": "",
        "TransactionId": "034ff5e0cb4aef7b08192a6d12f26b4b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/13/2022",
        "Description": "BLAZE PIZZA #1315 WDM IA                     07/12",
        "Amount": "-29.32",
        "Type": "DEBIT_CARD",
        "Balance": "22291.7",
        "Check or Slip #": "",
        "TransactionId": "bc707d083806c2fb2dd44868c0f21dfd"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/13/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "672.16",
        "Type": "ACH_CREDIT",
        "Balance": "22321.02",
        "Check or Slip #": "",
        "TransactionId": "455d59c37e6248ef6f433041d21ca99f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/12/2022",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            07/11",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "21648.86",
        "Check or Slip #": "",
        "TransactionId": "1be3f23a7f50ead37f48404a03340b55"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/12/2022",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 07/11",
        "Amount": "-5.04",
        "Type": "DEBIT_CARD",
        "Balance": "21703.86",
        "Check or Slip #": "",
        "TransactionId": "c7f3d89a7aae77e67aa2d65fd6e9a38b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/12/2022",
        "Description": "CULVERS ANKENY ANKENY IA                     07/11",
        "Amount": "-8.05",
        "Type": "DEBIT_CARD",
        "Balance": "21708.9",
        "Check or Slip #": "",
        "TransactionId": "2f24692d170c334ec682c0dee39cd7ac"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/11/2022",
        "Description": "MNRD-ANKENY 2505 S DEL ANKENY IA     060117  07/11",
        "Amount": "-33.9",
        "Type": "DEBIT_CARD",
        "Balance": "21716.95",
        "Check or Slip #": "",
        "TransactionId": "69e108040ea411f580b0cf6eaf3ea975"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/11/2022",
        "Description": "COLD STONE CREAMERY #2 641-8917444 IA        07/10",
        "Amount": "-24.35",
        "Type": "DEBIT_CARD",
        "Balance": "21750.85",
        "Check or Slip #": "",
        "TransactionId": "8b1dede19b1a36d778683507579f98f1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/11/2022",
        "Description": "KWIK STAR  10100010165 ANKENY IA             07/10",
        "Amount": "-48.24",
        "Type": "DEBIT_CARD",
        "Balance": "21775.2",
        "Check or Slip #": "",
        "TransactionId": "49a8dd6a1b6bbfd68a548aa5d60a2880"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/11/2022",
        "Description": "AMZN Mktp US*9683G9M Amzn.com/bill WA        07/10",
        "Amount": "-7.94",
        "Type": "DEBIT_CARD",
        "Balance": "21823.44",
        "Check or Slip #": "",
        "TransactionId": "0bd6c064e01bb0c6e2274614d07c8068"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/11/2022",
        "Description": "Amazon Prime*YA7QR99 Amzn.com/bill WA        07/09",
        "Amount": "-15.89",
        "Type": "DEBIT_CARD",
        "Balance": "21831.38",
        "Check or Slip #": "",
        "TransactionId": "b4657e762427c002af9ddc08c5b981b3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/11/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/09",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "21847.27",
        "Check or Slip #": "",
        "TransactionId": "0513627723247a978754bb5959263d72"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/11/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/09",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "21877.27",
        "Check or Slip #": "",
        "TransactionId": "c19a8513cc51df74ba762e2dabedce23"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/11/2022",
        "Description": "ARBY S 5722 ANKENY IA                        07/08",
        "Amount": "-8.89",
        "Type": "DEBIT_CARD",
        "Balance": "21878.27",
        "Check or Slip #": "",
        "TransactionId": "af0512f16177b049cb0b828859951401"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/11/2022",
        "Description": "Zelle payment from DAVID BOARD BACj1ruvrmyj",
        "Amount": "190",
        "Type": "PARTNERFI_TO_CHASE",
        "Balance": "21887.16",
        "Check or Slip #": "",
        "TransactionId": "8a4086e456b976bbab0bdb877c2cf7ff"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2022",
        "Description": "CHIPOTLE 2776 ANKENY IA                      07/07",
        "Amount": "-12.03",
        "Type": "DEBIT_CARD",
        "Balance": "21697.16",
        "Check or Slip #": "",
        "TransactionId": "0651421ae72d6d5f52f546e7ad87f772"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/08/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "565.96",
        "Type": "ACH_CREDIT",
        "Balance": "21709.19",
        "Check or Slip #": "",
        "TransactionId": "914a720a8e91076c88ffb62dd5580135"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/07/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             07/07",
        "Amount": "-33.56",
        "Type": "DEBIT_CARD",
        "Balance": "21143.23",
        "Check or Slip #": "",
        "TransactionId": "c487d7e9fc76a0ffb11306b35c099f03"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/07/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/06",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "21176.79",
        "Check or Slip #": "",
        "TransactionId": "1d59e79a0f4e6546133324d9e40775d0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/06/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       07/05",
        "Amount": "-8.26",
        "Type": "DEBIT_CARD",
        "Balance": "21181.79",
        "Check or Slip #": "",
        "TransactionId": "15bb28bf79ececdf143dcb121afa5f4d"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/06/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "633.32",
        "Type": "ACH_CREDIT",
        "Balance": "21190.05",
        "Check or Slip #": "",
        "TransactionId": "b77db8c31ea625a1088221b6922b17ba"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/05/2022",
        "Description": "MIDAMERICAN      ENERGY     0115123306W361  WEB ID: 4421425214",
        "Amount": "-29",
        "Type": "ACH_DEBIT",
        "Balance": "20556.73",
        "Check or Slip #": "",
        "TransactionId": "e82cdc012b93810d318d81b6c07f940d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/05/2022",
        "Description": "Amazon.com*VH5RO8S43 Amzn.com/bill WA        07/02",
        "Amount": "-13.58",
        "Type": "DEBIT_CARD",
        "Balance": "20585.73",
        "Check or Slip #": "",
        "TransactionId": "ac8088b5423e123d0cbb82b4619c7003"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/05/2022",
        "Description": "AMZN Mktp US*OL9G885 Amzn.com/bill WA        07/01",
        "Amount": "-5.11",
        "Type": "DEBIT_CARD",
        "Balance": "20599.31",
        "Check or Slip #": "",
        "TransactionId": "8b7a71c56679bbe90d5102447feaa574"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/01/2022",
        "Description": "JENSENBRICKHOUSE WEB PMTS   B9Y21B          WEB ID: 9000615921",
        "Amount": "-875",
        "Type": "ACH_DEBIT",
        "Balance": "20604.42",
        "Check or Slip #": "",
        "TransactionId": "90049cfe8710fc843eab88e1d624c928"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/01/2022",
        "Description": "City of Ankeny U PAYMENT    999000000607950 WEB ID: 110312002",
        "Amount": "-49.27",
        "Type": "ACH_DEBIT",
        "Balance": "21479.42",
        "Check or Slip #": "",
        "TransactionId": "61f2bf4f3fe513c28d54a166123f820c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/30/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             06/30",
        "Amount": "-72.94",
        "Type": "DEBIT_CARD",
        "Balance": "21528.69",
        "Check or Slip #": "",
        "TransactionId": "d1bb65ed3b0c121981495dddda13cc95"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/30/2022",
        "Description": "AUTOZONE  3945 713 N A ANKENY IA     450046  06/30",
        "Amount": "-190.79",
        "Type": "DEBIT_CARD",
        "Balance": "21601.63",
        "Check or Slip #": "",
        "TransactionId": "36e90a630341083f5db562c5b4ab3e3b"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/29/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "630.91",
        "Type": "ACH_CREDIT",
        "Balance": "21792.42",
        "Check or Slip #": "",
        "TransactionId": "f2e1ff8b031c166730867d8730879336"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/28/2022",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-89.69",
        "Type": "ACH_DEBIT",
        "Balance": "21161.51",
        "Check or Slip #": "",
        "TransactionId": "5d25dfa75ad36b6ad64c5a0cdb964495"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/28/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/27",
        "Amount": "-50",
        "Type": "DEBIT_CARD",
        "Balance": "21251.2",
        "Check or Slip #": "",
        "TransactionId": "a99b3aece6c2dcccc52df705e05b571c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/27/2022",
        "Description": "CHIPOTLE 2316 ROCKLIN CA                     06/25",
        "Amount": "-26.38",
        "Type": "DEBIT_CARD",
        "Balance": "21301.2",
        "Check or Slip #": "",
        "TransactionId": "b6207c11d48e3938fa57a68a300478ff"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/24/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/23",
        "Amount": "-50",
        "Type": "DEBIT_CARD",
        "Balance": "21327.58",
        "Check or Slip #": "",
        "TransactionId": "a90cf020a649fce79fe80fb6fa8d3e7a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/23/2022",
        "Description": "TERIYAKI BOYS ALTOONA IA                     06/21",
        "Amount": "-12.51",
        "Type": "DEBIT_CARD",
        "Balance": "21377.58",
        "Check or Slip #": "",
        "TransactionId": "a46fc369c6ba1122b9a2d57e2d7bd034"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/22/2022",
        "Description": "Nike Altoona 263 Altoona IA                  06/21",
        "Amount": "-51.33",
        "Type": "DEBIT_CARD",
        "Balance": "21390.09",
        "Check or Slip #": "",
        "TransactionId": "6cbf9e1982bae2c20613fb21a44afe2a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/22/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "587.21",
        "Type": "ACH_CREDIT",
        "Balance": "21441.42",
        "Check or Slip #": "",
        "TransactionId": "a63864155515b22cb9d1404f9f956c5d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/21/2022",
        "Description": "Wal-Mart Super Center GRIMES IA              06/21",
        "Amount": "-56.41",
        "Type": "DEBIT_CARD",
        "Balance": "20854.21",
        "Check or Slip #": "",
        "TransactionId": "47a7d397788c4abd457717b5a0f858ae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/21/2022",
        "Description": "IN *GOIN POSTAL WEST DES MOIN IA     948198  06/21",
        "Amount": "-158.92",
        "Type": "DEBIT_CARD",
        "Balance": "20910.62",
        "Check or Slip #": "",
        "TransactionId": "2a9136e0504917245c0766803dd370cd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/21/2022",
        "Description": "BASS PRO STORE ALTOONA ALTOONA IA            06/21",
        "Amount": "-16.04",
        "Type": "DEBIT_CARD",
        "Balance": "21069.54",
        "Check or Slip #": "",
        "TransactionId": "b6694a6bfa9a96a08e324daec734b76a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/21/2022",
        "Description": "SLIM CHICKENS 16201 ANKENY IA                06/20",
        "Amount": "-10.06",
        "Type": "DEBIT_CARD",
        "Balance": "21085.58",
        "Check or Slip #": "",
        "TransactionId": "919c73b954572b03588d82767e15eb58"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/21/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 06/18",
        "Amount": "-22.53",
        "Type": "DEBIT_CARD",
        "Balance": "21095.64",
        "Check or Slip #": "",
        "TransactionId": "a834c2f952c1ac80ce65e558d1d141f1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/17/2022",
        "Description": "MAIDRITES INC ANKENY IA                      06/16",
        "Amount": "-12.16",
        "Type": "DEBIT_CARD",
        "Balance": "21118.17",
        "Check or Slip #": "",
        "TransactionId": "8b6561e59fdf1553c366369a7ccd234f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/16/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             06/16",
        "Amount": "-65.84",
        "Type": "DEBIT_CARD",
        "Balance": "21130.33",
        "Check or Slip #": "",
        "TransactionId": "5ce61b5834ac87d31b910883db3c2501"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/16/2022",
        "Description": "PANERA BREAD #203220 P ANKENY IA             06/15",
        "Amount": "-12.17",
        "Type": "DEBIT_CARD",
        "Balance": "21196.17",
        "Check or Slip #": "",
        "TransactionId": "c0a4c313c52f74c339ddcd384e9b2153"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/16/2022",
        "Description": "AMZN Mktp US*FZ5242J Amzn.com/bill WA        06/15",
        "Amount": "-10.59",
        "Type": "DEBIT_CARD",
        "Balance": "21208.34",
        "Check or Slip #": "",
        "TransactionId": "eab7554ca974069e1b257303ded5c8fe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/16/2022",
        "Description": "AMZN Mktp US*G60JB4X Amzn.com/bill WA        06/15",
        "Amount": "-8.36",
        "Type": "DEBIT_CARD",
        "Balance": "21218.93",
        "Check or Slip #": "",
        "TransactionId": "3c39ff3cfe1045c4eaac830044467520"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/15/2022",
        "Description": "CAPITAL ONE      MOBILE PMT 3LXSL0GE4PBAYKD WEB ID: 9279744980",
        "Amount": "-52.51",
        "Type": "ACH_DEBIT",
        "Balance": "21227.29",
        "Check or Slip #": "",
        "TransactionId": "a087a53f3789567a4843856d104881ce"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/15/2022",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            06/14",
        "Amount": "-83.56",
        "Type": "DEBIT_CARD",
        "Balance": "21279.8",
        "Check or Slip #": "",
        "TransactionId": "ac9fa870ef7d40bbea471c1b83564b85"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/15/2022",
        "Description": "HY-VEE F&F ANKENY 5022 ANKENY IA             06/14",
        "Amount": "-51.09",
        "Type": "DEBIT_CARD",
        "Balance": "21363.36",
        "Check or Slip #": "",
        "TransactionId": "bcc8019d67714aee50275c7502dbbe07"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/15/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 06/14",
        "Amount": "-17.68",
        "Type": "DEBIT_CARD",
        "Balance": "21414.45",
        "Check or Slip #": "",
        "TransactionId": "0b5beed9d34d73c351f775dfef2736c3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/15/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       06/14",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "21432.13",
        "Check or Slip #": "",
        "TransactionId": "870a9c024429789fca05187eb9744999"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/15/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "628.51",
        "Type": "ACH_CREDIT",
        "Balance": "21437.43",
        "Check or Slip #": "",
        "TransactionId": "dc1f7620ff56787ace0baf0494681e30"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/14/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/13",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "20808.92",
        "Check or Slip #": "",
        "TransactionId": "dbb64ac5e713fd1f78881297cc5b8622"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/14/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/13",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "20813.92",
        "Check or Slip #": "",
        "TransactionId": "693df3b4e7a2ef3cefda640700f69749"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/13/2022",
        "Description": "NON-CHASE ATM FEE-WITH",
        "Amount": "-3",
        "Type": "FEE_TRANSACTION",
        "Balance": "20838.92",
        "Check or Slip #": "",
        "TransactionId": "4347c0230b3b5ad08101d07c7aa4950a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/13/2022",
        "Description": "NON-CHASE ATM WITHDRAW               201938  06/13321 E 12T",
        "Amount": "-20",
        "Type": "ATM",
        "Balance": "20841.92",
        "Check or Slip #": "",
        "TransactionId": "d37697e1515fcd7828c7039e66f30e1a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/13/2022",
        "Description": "EDEN TEA DES MOINES IA                       06/12",
        "Amount": "-13.91",
        "Type": "DEBIT_CARD",
        "Balance": "20861.92",
        "Check or Slip #": "",
        "TransactionId": "3f9970ec17fa99cc5dfe47e2f761fbd8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/13/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/11",
        "Amount": "-2.5",
        "Type": "DEBIT_CARD",
        "Balance": "20875.83",
        "Check or Slip #": "",
        "TransactionId": "b9c901375e879fe6ec3b0feeb626e995"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/13/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/10",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "20878.33",
        "Check or Slip #": "",
        "TransactionId": "39b3cb2e93c646fbc9704baf1845b396"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/10/2022",
        "Description": "Amazon Prime*YU4VQ3O Amzn.com/bill WA        06/09",
        "Amount": "-15.89",
        "Type": "DEBIT_CARD",
        "Balance": "20884.33",
        "Check or Slip #": "",
        "TransactionId": "b760b17b07df627b339ececa8fec58ca"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/10/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 06/09",
        "Amount": "-38.06",
        "Type": "DEBIT_CARD",
        "Balance": "20900.22",
        "Check or Slip #": "",
        "TransactionId": "ab9bf006e7b041cd8ae0e0ad4358fde0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/10/2022",
        "Description": "THE SIMPLE GREEK - 54 - ANKENY IA            06/09",
        "Amount": "-16.2",
        "Type": "DEBIT_CARD",
        "Balance": "20938.28",
        "Check or Slip #": "",
        "TransactionId": "ad7b38a1d5895c686d2a4fdc4f65c976"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/09/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/08",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "20954.48",
        "Check or Slip #": "",
        "TransactionId": "0a1def94c0d868cbf8b9140ef5cfaee9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/08/2022",
        "Description": "MCDONALD'S F35350 ANKENY IA                  06/07",
        "Amount": "-4.02",
        "Type": "DEBIT_CARD",
        "Balance": "20961.48",
        "Check or Slip #": "",
        "TransactionId": "6c6e31e3b6d43913dc5bc1fb2e8bf943"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/08/2022",
        "Description": "ANKENY CINEMA LIBERTY MO                     06/07",
        "Amount": "-8.48",
        "Type": "DEBIT_CARD",
        "Balance": "20965.5",
        "Check or Slip #": "",
        "TransactionId": "b61530dfef583b6fe36d0635585c8d45"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/08/2022",
        "Description": "FUZZYS TACO SHOP - ANKE ANKENY IA            06/07",
        "Amount": "-8.68",
        "Type": "DEBIT_CARD",
        "Balance": "20973.98",
        "Check or Slip #": "",
        "TransactionId": "6dc61886a8f6cf717b0ee8745263a179"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/08/2022",
        "Description": "AMZN Mktp US*4A78X98 Amzn.com/bill WA        06/07",
        "Amount": "-49.28",
        "Type": "DEBIT_CARD",
        "Balance": "20982.66",
        "Check or Slip #": "",
        "TransactionId": "11d0d7abf29a794184ea2c5a6ad83404"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/08/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "642.2",
        "Type": "ACH_CREDIT",
        "Balance": "21031.94",
        "Check or Slip #": "",
        "TransactionId": "fe3cbe654bceda32e378bc5718491cb8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/07/2022",
        "Description": "AMZN Mktp US*FW4U39J Amzn.com/bill WA        06/07",
        "Amount": "-21.15",
        "Type": "DEBIT_CARD",
        "Balance": "20389.74",
        "Check or Slip #": "",
        "TransactionId": "b71181bf2bab09be931b05057946bd78"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/07/2022",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 06/06",
        "Amount": "-3.27",
        "Type": "DEBIT_CARD",
        "Balance": "20410.89",
        "Check or Slip #": "",
        "TransactionId": "dca0b03b5543bced80aa7259c6ad176f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/07/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/06",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "20414.16",
        "Check or Slip #": "",
        "TransactionId": "e6a821fef6cf313e44fad06ff93ce66c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/06/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 06/04",
        "Amount": "-2.64",
        "Type": "DEBIT_CARD",
        "Balance": "20426.16",
        "Check or Slip #": "",
        "TransactionId": "ebbae1c86b26f75f343237ccc60f376e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/06/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 06/04",
        "Amount": "-8.58",
        "Type": "DEBIT_CARD",
        "Balance": "20428.8",
        "Check or Slip #": "",
        "TransactionId": "158e9cbfab712dcc760972170dd39493"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/06/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/04",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "20437.38",
        "Check or Slip #": "",
        "TransactionId": "de3fc37dd8bfa0cd110e5479b49d734b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/06/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/03",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "20439.38",
        "Check or Slip #": "",
        "TransactionId": "cdc7a55eab885799071c82b46e0fcd86"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/03/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/03",
        "Amount": "-197",
        "Type": "DEBIT_CARD",
        "Balance": "20440.38",
        "Check or Slip #": "",
        "TransactionId": "728cfa287052488bfc218ea3e3e22fe8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/03/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/02",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "20637.38",
        "Check or Slip #": "",
        "TransactionId": "1edfdc30a5b81b7b8f0222ea3338f592"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/03/2022",
        "Description": "CHIPOTLE 2776 ANKENY IA                      06/02",
        "Amount": "-9.12",
        "Type": "DEBIT_CARD",
        "Balance": "20639.38",
        "Check or Slip #": "",
        "TransactionId": "6fd92906215a2e08dfe98477e7905977"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/02/2022",
        "Description": "Wal-Mart Super Center ANKENY IA              06/02",
        "Amount": "-55.6",
        "Type": "DEBIT_CARD",
        "Balance": "20648.5",
        "Check or Slip #": "",
        "TransactionId": "197450d712908df975c127b76bdfb685"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/02/2022",
        "Description": "MIDAMERICAN      ENERGY     0115123306W339  WEB ID: 4421425214",
        "Amount": "-29",
        "Type": "ACH_DEBIT",
        "Balance": "20704.1",
        "Check or Slip #": "",
        "TransactionId": "bdded8bfcdca32923ff718061fd177c5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/02/2022",
        "Description": "TACO JOHNS 9427 ANKENY IA                    06/01",
        "Amount": "-9.85",
        "Type": "DEBIT_CARD",
        "Balance": "20733.1",
        "Check or Slip #": "",
        "TransactionId": "9b3ce6a8e165c956422d9517454c57a1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/02/2022",
        "Description": "AMZN Mktp US*1X3GG8X Amzn.com/bill WA        06/01",
        "Amount": "-13.77",
        "Type": "DEBIT_CARD",
        "Balance": "20742.95",
        "Check or Slip #": "",
        "TransactionId": "3f9a69b32b14f13ca3f5169f7f08f835"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/01/2022",
        "Description": "JENSENBRICKHOUSE WEB PMTS   NNVFV9          WEB ID: 9000615921",
        "Amount": "-875",
        "Type": "ACH_DEBIT",
        "Balance": "20756.72",
        "Check or Slip #": "",
        "TransactionId": "838d07c8a8dd3864248ef20f8868c87f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/01/2022",
        "Description": "City of Ankeny U PAYMENT    999000000585024 WEB ID: 110312002",
        "Amount": "-51.85",
        "Type": "ACH_DEBIT",
        "Balance": "21631.72",
        "Check or Slip #": "",
        "TransactionId": "29f6bf3e3982cd60719b65ed1f3920d7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/01/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/31",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "21683.57",
        "Check or Slip #": "",
        "TransactionId": "07cfe87b256edb35c22336f2b80c8db7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/01/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/31",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "21684.57",
        "Check or Slip #": "",
        "TransactionId": "05bb6aa04d97f276ab3669841dc6a690"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/01/2022",
        "Description": "Amazon.com*1X69A70S0 Amzn.com/bill WA        06/01",
        "Amount": "-30.74",
        "Type": "DEBIT_CARD",
        "Balance": "21694.57",
        "Check or Slip #": "",
        "TransactionId": "ca3586daa62a48fc4c14622c319f8147"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/01/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "594.13",
        "Type": "ACH_CREDIT",
        "Balance": "21725.31",
        "Check or Slip #": "",
        "TransactionId": "d7ecae5cf520111a3afbc3f0338876c7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/31/2022",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-83.98",
        "Type": "ACH_DEBIT",
        "Balance": "21131.18",
        "Check or Slip #": "",
        "TransactionId": "d8f5edb7c966657804ee268b16dbe662"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/31/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/30",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "21215.16",
        "Check or Slip #": "",
        "TransactionId": "19fbd98af43c7dd0dfc09413b4a9e8c2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/31/2022",
        "Description": "AMC 4231 DES MOINES 16 JOHNSTON IA           05/30",
        "Amount": "-28.54",
        "Type": "DEBIT_CARD",
        "Balance": "21220.16",
        "Check or Slip #": "",
        "TransactionId": "a10bd61bf2b2efb5afac5eb0f734d185"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/31/2022",
        "Description": "HY-VEE D MOINES HY VEE Des Moines IA 716683  05/30",
        "Amount": "-2.14",
        "Type": "DEBIT_CARD",
        "Balance": "21248.7",
        "Check or Slip #": "",
        "TransactionId": "de5ca892ced5929b7282d46759c50de1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/31/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             05/29",
        "Amount": "-12.11",
        "Type": "DEBIT_CARD",
        "Balance": "21250.84",
        "Check or Slip #": "",
        "TransactionId": "4d09ac871ef16a40d5a6607062cd3ddc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/31/2022",
        "Description": "BEST BUY      00015123 ANKENY IA     909336  05/28",
        "Amount": "-116.59",
        "Type": "DEBIT_CARD",
        "Balance": "21262.95",
        "Check or Slip #": "",
        "TransactionId": "70283d7a02a3508bf0775e24ba1919d5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/31/2022",
        "Description": "DAYLIGHT DONUT  HAPPY D ANKENY IA            05/28",
        "Amount": "-7.38",
        "Type": "DEBIT_CARD",
        "Balance": "21379.54",
        "Check or Slip #": "",
        "TransactionId": "a09cebe64261ab553822d6e8a52989fa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/31/2022",
        "Description": "KWIK STAR  10100010165 ANKENY IA             05/27",
        "Amount": "-41.04",
        "Type": "DEBIT_CARD",
        "Balance": "21386.92",
        "Check or Slip #": "",
        "TransactionId": "2378a6ae4318f3a52e0a957db9ae5973"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/27/2022",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             05/26",
        "Amount": "-9.95",
        "Type": "DEBIT_CARD",
        "Balance": "21427.96",
        "Check or Slip #": "",
        "TransactionId": "60278c6adaa83f4e39ac654d59a65632"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/27/2022",
        "Description": "Amazon.com*B21G89ZU3 Amzn.com/bill WA        05/26",
        "Amount": "-38.7",
        "Type": "DEBIT_CARD",
        "Balance": "21437.91",
        "Check or Slip #": "",
        "TransactionId": "0002542000afcc1e56c6441c40d66484"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/27/2022",
        "Description": "WAL-MART #0892 ANKENY IA                     05/26",
        "Amount": "47.57",
        "Type": "DEBIT_CARD",
        "Balance": "21476.61",
        "Check or Slip #": "",
        "TransactionId": "188d1d4f1f0e21f4eaf3d7f237b48b79"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/26/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             05/26",
        "Amount": "-39.42",
        "Type": "DEBIT_CARD",
        "Balance": "21429.04",
        "Check or Slip #": "",
        "TransactionId": "a8ca483ef53b41f74f3caa360b7ebc33"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/26/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 05/25",
        "Amount": "-13.64",
        "Type": "DEBIT_CARD",
        "Balance": "21468.46",
        "Check or Slip #": "",
        "TransactionId": "4f3a8865ddb2227e67caea26ab8d6968"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/26/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/25",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "21482.1",
        "Check or Slip #": "",
        "TransactionId": "dd87fc754acdb36e70050c9ee9931f7e"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/25/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "619.79",
        "Type": "ACH_CREDIT",
        "Balance": "21507.1",
        "Check or Slip #": "",
        "TransactionId": "e3a4b481c71a5e2dd154f46de999820d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/24/2022",
        "Description": "Wal-Mart Super Cente COUNCIL BLUFF IA        05/24",
        "Amount": "-12.82",
        "Type": "DEBIT_CARD",
        "Balance": "20887.31",
        "Check or Slip #": "",
        "TransactionId": "a9401054514c6626311e1bbfc5cae74f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/23/2022",
        "Description": "CASEYS #2 1310 NW 18TH ANKENY IA             05/23",
        "Amount": "-3.59",
        "Type": "DEBIT_CARD",
        "Balance": "20900.13",
        "Check or Slip #": "",
        "TransactionId": "63abeb0376856267ce245d08d9ab3d3d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/23/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 05/21",
        "Amount": "-7.91",
        "Type": "DEBIT_CARD",
        "Balance": "20903.72",
        "Check or Slip #": "",
        "TransactionId": "1f7a1c6a21ab00cbfeb3872c37a07b8e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/23/2022",
        "Description": "CAPITAL ONE      CRCARDPMT  3LSHFXBLXMADKSD WEB ID: 9541719018",
        "Amount": "-1.25",
        "Type": "ACH_DEBIT",
        "Balance": "20911.63",
        "Check or Slip #": "",
        "TransactionId": "2b652316c7776b2314e85937dabdd0d7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/23/2022",
        "Description": "Amazon.com*1X8IJ44J1 Amzn.com/bill WA        05/21",
        "Amount": "-16.95",
        "Type": "DEBIT_CARD",
        "Balance": "20912.88",
        "Check or Slip #": "",
        "TransactionId": "1b49b17f639b350f071df9e2a9c644ac"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/19/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             05/19",
        "Amount": "-37.68",
        "Type": "DEBIT_CARD",
        "Balance": "20929.83",
        "Check or Slip #": "",
        "TransactionId": "bad401c9aa05b55a0e81c3e712100b2a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/18/2022",
        "Description": "FAZOLIS_5913 ANKENY IA                       05/17",
        "Amount": "-8.41",
        "Type": "DEBIT_CARD",
        "Balance": "20967.51",
        "Check or Slip #": "",
        "TransactionId": "937f6c78091d96b50f805d68b6fa739d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/18/2022",
        "Description": "AMZN Mktp US*1R5FS28 Amzn.com/bill WA        05/17",
        "Amount": "-34.74",
        "Type": "DEBIT_CARD",
        "Balance": "20975.92",
        "Check or Slip #": "",
        "TransactionId": "55d2b639c1890bfa9a12b3c240ceae4c"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/18/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "618.94",
        "Type": "ACH_CREDIT",
        "Balance": "21010.66",
        "Check or Slip #": "",
        "TransactionId": "785c831970678e255a4076dfea192fd1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/17/2022",
        "Description": "CASEYS #1 6110 MERLE H JOHNSTON IA           05/17",
        "Amount": "-4.13",
        "Type": "DEBIT_CARD",
        "Balance": "20391.72",
        "Check or Slip #": "",
        "TransactionId": "393f7e358776b6400f023fdbed88b6dd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/17/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/16",
        "Amount": "-15",
        "Type": "DEBIT_CARD",
        "Balance": "20395.85",
        "Check or Slip #": "",
        "TransactionId": "f08a3b713a1cd9fe0f0f835fb450edae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/17/2022",
        "Description": "CHIPOTLE 2776 ANKENY IA                      05/16",
        "Amount": "-9.12",
        "Type": "DEBIT_CARD",
        "Balance": "20410.85",
        "Check or Slip #": "",
        "TransactionId": "ed4aac051a5179ef36746ba2e5bc449c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/16/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/14",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "20419.97",
        "Check or Slip #": "",
        "TransactionId": "3735a3fe8393668a6ca348d438786fd0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/16/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/13",
        "Amount": "-789",
        "Type": "DEBIT_CARD",
        "Balance": "20422.97",
        "Check or Slip #": "",
        "TransactionId": "7a768538028a33be9a0699692ffce991"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/16/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 05/13",
        "Amount": "-31.91",
        "Type": "DEBIT_CARD",
        "Balance": "21211.97",
        "Check or Slip #": "",
        "TransactionId": "43c2aabb49acf8235070edecdd2d4627"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/16/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 05/13",
        "Amount": "-8.09",
        "Type": "DEBIT_CARD",
        "Balance": "21243.88",
        "Check or Slip #": "",
        "TransactionId": "4ab2dd75614b7a75f36a606468759066"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/13/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/12",
        "Amount": "-177",
        "Type": "DEBIT_CARD",
        "Balance": "21251.97",
        "Check or Slip #": "",
        "TransactionId": "0eacbe19a4a7ff8f18afe8772354c6c5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/12/2022",
        "Description": "ROSS STORES #2031 DES MOINES IA              05/11",
        "Amount": "-10.69",
        "Type": "DEBIT_CARD",
        "Balance": "21428.97",
        "Check or Slip #": "",
        "TransactionId": "23489aa8880b303ccd59fa28607c5f80"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/12/2022",
        "Description": "SQ *8 DEGREES CAFE & BO Des Moines IA        05/11",
        "Amount": "-7.15",
        "Type": "DEBIT_CARD",
        "Balance": "21439.66",
        "Check or Slip #": "",
        "TransactionId": "2e4569a60d509341a0a7d00381bfa6dd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/12/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/11",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "21446.81",
        "Check or Slip #": "",
        "TransactionId": "b96bcd34db856392f8c89182af0b96fe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/12/2022",
        "Description": "HY-VEE F&F ANKENY 5022 ANKENY IA             05/11",
        "Amount": "-54.61",
        "Type": "DEBIT_CARD",
        "Balance": "21451.81",
        "Check or Slip #": "",
        "TransactionId": "d1d22c4bcfb0b319b22f1826da46ff75"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/12/2022",
        "Description": "AMZN Mktp US*1358Y62 Amzn.com/bill WA        05/11",
        "Amount": "-11.65",
        "Type": "DEBIT_CARD",
        "Balance": "21506.42",
        "Check or Slip #": "",
        "TransactionId": "b64c8ca4704b988152829eec14f34f7f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/12/2022",
        "Description": "AMZN Mktp US*1L87O27 Amzn.com/bill WA        05/11",
        "Amount": "-45.04",
        "Type": "DEBIT_CARD",
        "Balance": "21518.07",
        "Check or Slip #": "",
        "TransactionId": "9a26ba7a4ccb4a1365e218b0d0785b36"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/11/2022",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 05/10",
        "Amount": "-3.13",
        "Type": "DEBIT_CARD",
        "Balance": "21563.11",
        "Check or Slip #": "",
        "TransactionId": "de1628f72187335741294cbe1201352d"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/11/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "621.91",
        "Type": "ACH_CREDIT",
        "Balance": "21566.24",
        "Check or Slip #": "",
        "TransactionId": "48c2413e9d68a499107821f5cd294e09"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/09/2022",
        "Description": "CASEYS #2 1310 NW 18TH ANKENY IA             05/09",
        "Amount": "-5.09",
        "Type": "DEBIT_CARD",
        "Balance": "20944.33",
        "Check or Slip #": "",
        "TransactionId": "4fefeb391b560165e0b7d7ed89c1d891"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/09/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             05/08",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "20949.42",
        "Check or Slip #": "",
        "TransactionId": "636799ea7bad0beca056ad9e99f6720f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/09/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/08",
        "Amount": "-8",
        "Type": "DEBIT_CARD",
        "Balance": "20979.42",
        "Check or Slip #": "",
        "TransactionId": "ef227c11069ba7dffca696137dc8c084"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/09/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/07",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "20987.42",
        "Check or Slip #": "",
        "TransactionId": "f65080663064fe225b5d6b8e62f99395"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/09/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/07",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "20991.42",
        "Check or Slip #": "",
        "TransactionId": "2ecd3a78e0ade874656c04a3034df7ba"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/09/2022",
        "Description": "McDonald's 35350 ANKENY IA                   05/07",
        "Amount": "-5.29",
        "Type": "DEBIT_CARD",
        "Balance": "21001.42",
        "Check or Slip #": "",
        "TransactionId": "94086702675ffa2a1a7e77d7184e3598"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/06/2022",
        "Description": "McDonald's 35350 ANKENY IA                   05/04",
        "Amount": "-3.37",
        "Type": "DEBIT_CARD",
        "Balance": "21006.71",
        "Check or Slip #": "",
        "TransactionId": "8882ea863597acaf97bfb0c0b7518669"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/05/2022",
        "Description": "CHICK-FIL-A #03303 ANKENY IA                 05/03",
        "Amount": "-9.11",
        "Type": "DEBIT_CARD",
        "Balance": "21010.08",
        "Check or Slip #": "",
        "TransactionId": "83be9df6e41b32c9d90ae1f3009a2485"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/04/2022",
        "Description": "MIDAMERICAN      ENERGY     0115123306W319  WEB ID: 4421425214",
        "Amount": "-29",
        "Type": "ACH_DEBIT",
        "Balance": "21019.19",
        "Check or Slip #": "",
        "TransactionId": "a867cda1d9366cdffa4a3972294388e5"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/04/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "573.1",
        "Type": "ACH_CREDIT",
        "Balance": "21048.19",
        "Check or Slip #": "",
        "TransactionId": "00381ee15d07ea09f1b61b2d449423b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/03/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             05/03",
        "Amount": "-26.2",
        "Type": "DEBIT_CARD",
        "Balance": "20475.09",
        "Check or Slip #": "",
        "TransactionId": "f4004911a0a2e10cc73add384153e679"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/03/2022",
        "Description": "JENSENBRICKHOUSE WEB PMTS   3TN7Q9          WEB ID: 9000615921",
        "Amount": "-875",
        "Type": "ACH_DEBIT",
        "Balance": "20501.29",
        "Check or Slip #": "",
        "TransactionId": "010b882700327df0779bd15e31e37d10"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/03/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/02",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "21376.29",
        "Check or Slip #": "",
        "TransactionId": "3ba89bfcfd3eeef3bb149a33a5ee981e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/02/2022",
        "Description": "City of Ankeny U PAYMENT    999000000562120 WEB ID: 110312002",
        "Amount": "-53.14",
        "Type": "ACH_DEBIT",
        "Balance": "21386.29",
        "Check or Slip #": "",
        "TransactionId": "a1b638a582fbcb2228ae78396b581be7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/02/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 04/29",
        "Amount": "-33.3",
        "Type": "DEBIT_CARD",
        "Balance": "21439.43",
        "Check or Slip #": "",
        "TransactionId": "0b6ede824f66067235f49e0f64d356c4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/02/2022",
        "Description": "ARBY S 5722 ANKENY IA                        04/29",
        "Amount": "-9.74",
        "Type": "DEBIT_CARD",
        "Balance": "21472.73",
        "Check or Slip #": "",
        "TransactionId": "5b264e464b3ba739fd95ee8606883ce3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/29/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/28",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "21482.47",
        "Check or Slip #": "",
        "TransactionId": "0dc87029738f3e5c5d121acd497245db"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/29/2022",
        "Description": "IRS  TREAS 310     TAX REF                  PPD ID: 9111736959",
        "Amount": "1523",
        "Type": "ACH_CREDIT",
        "Balance": "21489.47",
        "Check or Slip #": "",
        "TransactionId": "66c0f8dcaab8be775bd797f7b1fe2fb9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/28/2022",
        "Description": "Wal-Mart Super Center ANKENY IA              04/28",
        "Amount": "-47.57",
        "Type": "DEBIT_CARD",
        "Balance": "19966.47",
        "Check or Slip #": "",
        "TransactionId": "00c1cafad5fdd181c7dbbb56957c6e5b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/28/2022",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-84",
        "Type": "ACH_DEBIT",
        "Balance": "20014.04",
        "Check or Slip #": "",
        "TransactionId": "a565c4f02ea5854f33716e29803c6ebe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/28/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       04/27",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "20098.04",
        "Check or Slip #": "",
        "TransactionId": "7b3a4b855498a92b876aca6b3e94c33f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/27/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             04/27",
        "Amount": "-284.08",
        "Type": "DEBIT_CARD",
        "Balance": "20103.34",
        "Check or Slip #": "",
        "TransactionId": "fc16efc3acb6c4a5c613a5a2fe591cb0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/27/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/26",
        "Amount": "-8",
        "Type": "DEBIT_CARD",
        "Balance": "20387.42",
        "Check or Slip #": "",
        "TransactionId": "1ea4d2bf182af36c0e25ca183fa40652"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/27/2022",
        "Description": "RAISING CANE'S 0667 ALTOONA IA               04/27",
        "Amount": "-9.62",
        "Type": "DEBIT_CARD",
        "Balance": "20395.42",
        "Check or Slip #": "",
        "TransactionId": "28c7f82d8b192eaad1dce3a33541ac80"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/27/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "604.59",
        "Type": "ACH_CREDIT",
        "Balance": "20405.04",
        "Check or Slip #": "",
        "TransactionId": "17194dcec3521782413b4bc536b11f8e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/25/2022",
        "Description": "Wal-Mart Super Center ANKENY IA              04/23",
        "Amount": "-15.01",
        "Type": "DEBIT_CARD",
        "Balance": "19800.45",
        "Check or Slip #": "",
        "TransactionId": "ec7ee53c187cd1cf4c96bb6a6d34b000"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/25/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/23",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "19815.46",
        "Check or Slip #": "",
        "TransactionId": "dcdea548ca10bdc25699fbfaf807ed33"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/25/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/23",
        "Amount": "-11",
        "Type": "DEBIT_CARD",
        "Balance": "19825.46",
        "Check or Slip #": "",
        "TransactionId": "4bdbbb48ad829727be7e3db8816fb9e4"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/25/2022",
        "Description": "Zelle payment from DAVID BOARD BACjoyw7cilv",
        "Amount": "659",
        "Type": "PARTNERFI_TO_CHASE",
        "Balance": "19836.46",
        "Check or Slip #": "",
        "TransactionId": "043d56ef3a4715827ff62e31300a19b9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/21/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 04/20",
        "Amount": "-22.42",
        "Type": "DEBIT_CARD",
        "Balance": "19177.46",
        "Check or Slip #": "",
        "TransactionId": "4ead7577e24f80691a89481dc2887f1a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/21/2022",
        "Description": "TACO JOHNS 9427 ANKENY IA                    04/20",
        "Amount": "-11.12",
        "Type": "DEBIT_CARD",
        "Balance": "19199.88",
        "Check or Slip #": "",
        "TransactionId": "a894abe41bc0c9d59bc9ea167b8f5dab"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/21/2022",
        "Description": "McDonald's 35350 ANKENY IA                   04/19",
        "Amount": "-6.35",
        "Type": "DEBIT_CARD",
        "Balance": "19211",
        "Check or Slip #": "",
        "TransactionId": "917f2fba1ad31db3cd2f02d67cbd98fc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/20/2022",
        "Description": "IA REVENUE       IA REVENUE                 PPD ID: 4426004574",
        "Amount": "-62",
        "Type": "ACH_DEBIT",
        "Balance": "19217.35",
        "Check or Slip #": "",
        "TransactionId": "cbe20820913a6fb5ff398c48318e826d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/20/2022",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 04/19",
        "Amount": "-6.83",
        "Type": "DEBIT_CARD",
        "Balance": "19279.35",
        "Check or Slip #": "",
        "TransactionId": "5ee9553f909cb092deffd68503d7eabc"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/20/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "600.49",
        "Type": "ACH_CREDIT",
        "Balance": "19286.18",
        "Check or Slip #": "",
        "TransactionId": "3f3512db843ae4a1e38f1b99ae2064fe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/18/2022",
        "Description": "CAPITAL ONE      MOBILE PMT 3LLB3RNPQZBAYKD WEB ID: 9279744980",
        "Amount": "-50.55",
        "Type": "ACH_DEBIT",
        "Balance": "18685.69",
        "Check or Slip #": "",
        "TransactionId": "460993cdf33a37249a5ac2a150a57ff4"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/18/2022",
        "Description": "Offer: Turbo Tax",
        "Amount": "10",
        "Type": "MISC_CREDIT",
        "Balance": "18736.24",
        "Check or Slip #": "",
        "TransactionId": "7fa7b1f9f1da475169b0217f1f657776"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/15/2022",
        "Description": "INTUIT *TURBOTAX CL.INTUIT.COM CA            04/14",
        "Amount": "-146.28",
        "Type": "DEBIT_CARD",
        "Balance": "18726.24",
        "Check or Slip #": "",
        "TransactionId": "1035aff7c94afc4cd42026d2e41d697b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/15/2022",
        "Description": "CHIPOTLE 2776 ANKENY IA                      04/14",
        "Amount": "-9.81",
        "Type": "DEBIT_CARD",
        "Balance": "18872.52",
        "Check or Slip #": "",
        "TransactionId": "c07f84bd59c4a96cae5ba2d04284404d"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/15/2022",
        "Description": "Offer: doordash",
        "Amount": "1.64",
        "Type": "MISC_CREDIT",
        "Balance": "18882.33",
        "Check or Slip #": "",
        "TransactionId": "25f3b3509e747bab697f454b362a5c6d"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/15/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "563.68",
        "Type": "ACH_CREDIT",
        "Balance": "18880.69",
        "Check or Slip #": "",
        "TransactionId": "40ac9d1b9c490cab85c4804e4d48c7e4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/14/2022",
        "Description": "HY-VEE F&F ANKENY 5023 ANKENY IA             04/13",
        "Amount": "-34",
        "Type": "DEBIT_CARD",
        "Balance": "18317.01",
        "Check or Slip #": "",
        "TransactionId": "0f07448bd46cfd732bab689bf1d49d69"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/14/2022",
        "Description": "CULVERS ANKENY ANKENY IA                     04/13",
        "Amount": "-10.59",
        "Type": "DEBIT_CARD",
        "Balance": "18351.01",
        "Check or Slip #": "",
        "TransactionId": "48fabe56b417418c8bbb197995009a67"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/13/2022",
        "Description": "FUZZYS TACO SHOP - ANKE ANKENY IA            04/12",
        "Amount": "-8",
        "Type": "DEBIT_CARD",
        "Balance": "18361.6",
        "Check or Slip #": "",
        "TransactionId": "89c00d08a88cad514909738cd161ca14"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/13/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "598.22",
        "Type": "ACH_CREDIT",
        "Balance": "18369.6",
        "Check or Slip #": "",
        "TransactionId": "19e7527af36a40f75303691fc71d680f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/12/2022",
        "Description": "DOORDASH*WINGSTOP WWW.DOORDASH. CA           04/12",
        "Amount": "-16.36",
        "Type": "DEBIT_CARD",
        "Balance": "17771.38",
        "Check or Slip #": "",
        "TransactionId": "9b7dfcb0a715edfc42f8604a768f5726"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/12/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/11",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "17787.74",
        "Check or Slip #": "",
        "TransactionId": "031553f5f633df9964d03f31150ca2a9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/12/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/11",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "17788.74",
        "Check or Slip #": "",
        "TransactionId": "f3cd3bf150648a02f3a335fbe2272c96"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/11/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/10",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "17794.74",
        "Check or Slip #": "",
        "TransactionId": "3c8ccae4d8f58d5d8e135c7a830569c8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/11/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/09",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "17796.24",
        "Check or Slip #": "",
        "TransactionId": "a8633e0a1c72a7e476f687b263e6e192"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/11/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/08",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "17797.24",
        "Check or Slip #": "",
        "TransactionId": "de383a03249143ddd0bc3d01fe3517a4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/08/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       04/07",
        "Amount": "-6.67",
        "Type": "DEBIT_CARD",
        "Balance": "17798.24",
        "Check or Slip #": "",
        "TransactionId": "31f5bc3de217f56994691c29cda22080"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/07/2022",
        "Description": "Wal-Mart Super Center ANKENY IA              04/07",
        "Amount": "-34.61",
        "Type": "DEBIT_CARD",
        "Balance": "17804.91",
        "Check or Slip #": "",
        "TransactionId": "cd1e050ea3f801e534ec736b2e164c41"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/07/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/06",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "17839.52",
        "Check or Slip #": "",
        "TransactionId": "833593e0724cf8c2a1f4e261a37c38c2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/07/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/06",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "17845.52",
        "Check or Slip #": "",
        "TransactionId": "eef23ee5826f773e3f3c99ba24038aa7"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/07/2022",
        "Description": "Zelle payment from DAVID BOARD BAClakzkoudz",
        "Amount": "1",
        "Type": "PARTNERFI_TO_CHASE",
        "Balance": "17855.52",
        "Check or Slip #": "",
        "TransactionId": "c71279534c40dbf21926eaeebe7bb175"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/06/2022",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 04/05",
        "Amount": "-3.87",
        "Type": "DEBIT_CARD",
        "Balance": "17854.52",
        "Check or Slip #": "",
        "TransactionId": "c571b9ef9f0eeb009371b001df0d596d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/06/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/05",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "17858.39",
        "Check or Slip #": "",
        "TransactionId": "075647cf67064e5fdc9b364de14a9165"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/06/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "619.3",
        "Type": "ACH_CREDIT",
        "Balance": "17868.39",
        "Check or Slip #": "",
        "TransactionId": "c5457ed965b7ca1ce6228cce17d18daa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/05/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/04",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "17249.09",
        "Check or Slip #": "",
        "TransactionId": "76d2c6f13174cfe39337cfccb9db62e9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/04/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       04/03",
        "Amount": "-6.56",
        "Type": "DEBIT_CARD",
        "Balance": "17256.09",
        "Check or Slip #": "",
        "TransactionId": "d403e1f628a6201c9344c448929a2659"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/04/2022",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             04/02",
        "Amount": "-11.12",
        "Type": "DEBIT_CARD",
        "Balance": "17262.65",
        "Check or Slip #": "",
        "TransactionId": "6e11f72da0a7cdcd486792c04eac12e6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2022",
        "Description": "JERSEY MIKES 38006 ANKENY IA                 03/31",
        "Amount": "-9.81",
        "Type": "DEBIT_CARD",
        "Balance": "17273.77",
        "Check or Slip #": "",
        "TransactionId": "e88906c952b1dd703f164d34f75c31ec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/31/2022",
        "Description": "Wal-Mart Super Center ANKENY IA              03/31",
        "Amount": "-52.43",
        "Type": "DEBIT_CARD",
        "Balance": "17283.58",
        "Check or Slip #": "",
        "TransactionId": "c317c586234e43769b0b443d9cb9be85"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/31/2022",
        "Description": "MIDAMERICAN      ENERGY     0115123306W295  WEB ID: 4421425214",
        "Amount": "-29",
        "Type": "ACH_DEBIT",
        "Balance": "17336.01",
        "Check or Slip #": "",
        "TransactionId": "a26560131d4a21f37d34d054cb322d4e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/30/2022",
        "Description": "JENSENBRICKHOUSE WEB PMTS   X4DZG9          WEB ID: 9000615921",
        "Amount": "-875",
        "Type": "ACH_DEBIT",
        "Balance": "17365.01",
        "Check or Slip #": "",
        "TransactionId": "c11c355e7983330a82822ba4e5f67103"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/30/2022",
        "Description": "FUZZYS TACO SHOP - ANKE ANKENY IA            03/29",
        "Amount": "-11",
        "Type": "DEBIT_CARD",
        "Balance": "18240.01",
        "Check or Slip #": "",
        "TransactionId": "60280421bd73c880000fb091e1de920e"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/30/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "584.7",
        "Type": "ACH_CREDIT",
        "Balance": "18251.01",
        "Check or Slip #": "",
        "TransactionId": "e3ab0169c51a075a60bd132636ca895c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/29/2022",
        "Description": "City of Ankeny U PAYMENT    999000000538960 WEB ID: 110312002",
        "Amount": "-51.05",
        "Type": "ACH_DEBIT",
        "Balance": "17666.31",
        "Check or Slip #": "",
        "TransactionId": "dede828aad669845331dd2677b1058aa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/29/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 03/28",
        "Amount": "-17.33",
        "Type": "DEBIT_CARD",
        "Balance": "17717.36",
        "Check or Slip #": "",
        "TransactionId": "cd024ea31aa78399cbf606cdd3e5c243"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/28/2022",
        "Description": "HY-VEE F&F ANKEN HY VE ANKENY IA     433917  03/28",
        "Amount": "-44.8",
        "Type": "DEBIT_CARD",
        "Balance": "17734.69",
        "Check or Slip #": "",
        "TransactionId": "61388ab53d634fa05e5ad6481ce12f12"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/28/2022",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-84",
        "Type": "ACH_DEBIT",
        "Balance": "17779.49",
        "Check or Slip #": "",
        "TransactionId": "a6c2a1af414f1050227031a84dba3b16"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/25/2022",
        "Description": "WAL-MART #0892 ANKENY IA                     03/25",
        "Amount": "-38.89",
        "Type": "DEBIT_CARD",
        "Balance": "17863.49",
        "Check or Slip #": "",
        "TransactionId": "cada3a649eb520436b6ce282a91e68bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/25/2022",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 03/24",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "17902.38",
        "Check or Slip #": "",
        "TransactionId": "6bbca5d77649578724cda42a9e880a49"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/25/2022",
        "Description": "Offer: Five Guys Famous Burgers and Fries",
        "Amount": "1.86",
        "Type": "MISC_CREDIT",
        "Balance": "17906.8",
        "Check or Slip #": "",
        "TransactionId": "ae571ef295dda32173ea72be42e7820e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/24/2022",
        "Description": "SAMS CLUB SAM'S Club ANKENY IA               03/24",
        "Amount": "-1.59",
        "Type": "DEBIT_CARD",
        "Balance": "17904.94",
        "Check or Slip #": "",
        "TransactionId": "5860fa8c5ad877989b768d46ad46b8bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/24/2022",
        "Description": "CHIPOTLE 2776 ANKENY IA                      03/23",
        "Amount": "-8.69",
        "Type": "DEBIT_CARD",
        "Balance": "17906.53",
        "Check or Slip #": "",
        "TransactionId": "91d550bd6571e9b77d741da74fbaef34"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/23/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/22",
        "Amount": "-53",
        "Type": "DEBIT_CARD",
        "Balance": "17915.22",
        "Check or Slip #": "",
        "TransactionId": "fbaed44170ab2e4eac16c4a5ace88c37"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/23/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/22",
        "Amount": "-53",
        "Type": "DEBIT_CARD",
        "Balance": "17968.22",
        "Check or Slip #": "",
        "TransactionId": "a1fe2f74a38422adc6c5416d03988711"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/23/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "578.96",
        "Type": "ACH_CREDIT",
        "Balance": "18021.22",
        "Check or Slip #": "",
        "TransactionId": "b1af1ad3ae1168666bb588c60a959d46"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/22/2022",
        "Description": "5GUYS 0693 QSR ANKENY IA                     03/21",
        "Amount": "-18.63",
        "Type": "DEBIT_CARD",
        "Balance": "17442.26",
        "Check or Slip #": "",
        "TransactionId": "5d6392adb5e166c2e2fd69b67a18f0a4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/21/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/20",
        "Amount": "-5.8",
        "Type": "DEBIT_CARD",
        "Balance": "17460.89",
        "Check or Slip #": "",
        "TransactionId": "c4dde4a2ca7813a9de6acc71387d9ada"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/21/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 03/19",
        "Amount": "-8.32",
        "Type": "DEBIT_CARD",
        "Balance": "17466.69",
        "Check or Slip #": "",
        "TransactionId": "117dcb4d2edf89213f93d995e755dfa7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/21/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/18",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "17475.01",
        "Check or Slip #": "",
        "TransactionId": "625c7313111c332af88191609c308765"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/21/2022",
        "Description": "TACO BELL #31268 ANKENY IA                   03/18",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "17476.01",
        "Check or Slip #": "",
        "TransactionId": "600ee9bcdd12f1e3f71bdd29e989e64b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/18/2022",
        "Description": "PANDA EXPRESS #2710 ANKENY IA                03/17",
        "Amount": "-9.22",
        "Type": "DEBIT_CARD",
        "Balance": "17481.31",
        "Check or Slip #": "",
        "TransactionId": "1ee544bc2e663234d2f347e0d1e4f037"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/17/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             03/17",
        "Amount": "-41.35",
        "Type": "DEBIT_CARD",
        "Balance": "17490.53",
        "Check or Slip #": "",
        "TransactionId": "76a3de249f20546bf13e8615b95a6059"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/17/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/16",
        "Amount": "-8",
        "Type": "DEBIT_CARD",
        "Balance": "17531.88",
        "Check or Slip #": "",
        "TransactionId": "9fc420a40d76842457d40c24cd5016d8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/17/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       03/16",
        "Amount": "-4.24",
        "Type": "DEBIT_CARD",
        "Balance": "17539.88",
        "Check or Slip #": "",
        "TransactionId": "6cd33f95ff705f05c27bae4fea5422f4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/16/2022",
        "Description": "WAL-MART #0892 ANKENY IA                     03/16",
        "Amount": "-23.45",
        "Type": "DEBIT_CARD",
        "Balance": "17544.12",
        "Check or Slip #": "",
        "TransactionId": "816e7e3a9a126085ad85d602d2c04fd1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/16/2022",
        "Description": "FUZZYS TACO SHOP - ANKE ANKENY IA            03/15",
        "Amount": "-8.68",
        "Type": "DEBIT_CARD",
        "Balance": "17567.57",
        "Check or Slip #": "",
        "TransactionId": "94f1c0ad30c2d0118fbf1c076a3fb64b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/16/2022",
        "Description": "DUNKIN #351231 ANKENY IA                     03/15",
        "Amount": "-7.56",
        "Type": "DEBIT_CARD",
        "Balance": "17576.25",
        "Check or Slip #": "",
        "TransactionId": "efc5e85215504bf31b08eb017f9db0ab"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/16/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "585.98",
        "Type": "ACH_CREDIT",
        "Balance": "17583.81",
        "Check or Slip #": "",
        "TransactionId": "615f9c05ffb659a06928d8e7b5a02be9"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/16/2022",
        "Description": "REAL TIME TRANSFER RECD FROM ABA/021000021 FROM: VENMO REF: 22031616226042397 INFO:  IID: 20220316021000021P1BRJPM00580031367 RECD: 12:24:34 TRN: 0165481075RV",
        "Amount": "14.75",
        "Type": "MISC_CREDIT",
        "Balance": "16997.83",
        "Check or Slip #": "",
        "TransactionId": "ec69b9c91f35e519a80594e0a5aa77fc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/15/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/14",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "16983.08",
        "Check or Slip #": "",
        "TransactionId": "1483f9329d895eb45417019bf797a44d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/15/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/14",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "16985.08",
        "Check or Slip #": "",
        "TransactionId": "538bc434b6bf9572544eac9fcc4f662d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/14/2022",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      361443  03/13",
        "Amount": "-1.58",
        "Type": "DEBIT_CARD",
        "Balance": "16991.08",
        "Check or Slip #": "",
        "TransactionId": "889e64961460f18caf6ece19521026b9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/14/2022",
        "Description": "TARGET        00017673 ANKENY IA             03/12",
        "Amount": "-22.92",
        "Type": "DEBIT_CARD",
        "Balance": "16992.66",
        "Check or Slip #": "",
        "TransactionId": "6d5b2b374e2d480b55e2354c93ffc01e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/14/2022",
        "Description": "CULVERS ANKENY ANKENY IA                     03/12",
        "Amount": "-9.21",
        "Type": "DEBIT_CARD",
        "Balance": "17015.58",
        "Check or Slip #": "",
        "TransactionId": "096f19d73e912759001438fcbfbe8ebf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/11/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/11",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "17024.79",
        "Check or Slip #": "",
        "TransactionId": "b6ef4f14e8c08340a627b0bfbf875cb9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/11/2022",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             03/10",
        "Amount": "-10.9",
        "Type": "DEBIT_CARD",
        "Balance": "17027.79",
        "Check or Slip #": "",
        "TransactionId": "3d40eb53b2516b02bc78cf6786f2c3f0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/09/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/08",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "17038.69",
        "Check or Slip #": "",
        "TransactionId": "4e77dfb97ec4a3d8476a9dd7bade76d5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/09/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/08",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "17043.69",
        "Check or Slip #": "",
        "TransactionId": "8a5bdaf67278f5e075f3b28fa419e726"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/09/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "586.96",
        "Type": "ACH_CREDIT",
        "Balance": "17055.69",
        "Check or Slip #": "",
        "TransactionId": "d592fe1e5b1b5ebdd4ad66b915fb4dfc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/08/2022",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      340178  03/08",
        "Amount": "-36.43",
        "Type": "DEBIT_CARD",
        "Balance": "16468.73",
        "Check or Slip #": "",
        "TransactionId": "ab38be830b9996ed88305ae59373541c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/07",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "16505.16",
        "Check or Slip #": "",
        "TransactionId": "32c7c526019736d6863a3fed1e143323"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2022",
        "Description": "HY-VEE F&F ANKENY 5022 ANKENY IA             03/06",
        "Amount": "-32.08",
        "Type": "DEBIT_CARD",
        "Balance": "16510.16",
        "Check or Slip #": "",
        "TransactionId": "402e77da85284258c0cf94e472908819"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 03/06",
        "Amount": "-26.31",
        "Type": "DEBIT_CARD",
        "Balance": "16542.24",
        "Check or Slip #": "",
        "TransactionId": "77eba92dbb8a30449989a5cc333a5706"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2022",
        "Description": "SONIC DRIVE IN #4871 ANKENY IA               03/06",
        "Amount": "-2.64",
        "Type": "DEBIT_CARD",
        "Balance": "16568.55",
        "Check or Slip #": "",
        "TransactionId": "61e35f1d02203c3c15eb2a1ce8b175fe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/05",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "16571.19",
        "Check or Slip #": "",
        "TransactionId": "6970b42fa0185021f84cbcd24028b7da"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2022",
        "Description": "CHIPOTLE 2776 ANKENY IA                      03/05",
        "Amount": "-11.87",
        "Type": "DEBIT_CARD",
        "Balance": "16576.19",
        "Check or Slip #": "",
        "TransactionId": "9b5f64016df91fd3b51317885472a51a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/04",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "16588.06",
        "Check or Slip #": "",
        "TransactionId": "892270f6125bce252908aaaf5621c500"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/02/2022",
        "Description": "MIDAMERICAN      ENERGY     0115123306W274  WEB ID: 4421425214",
        "Amount": "-29",
        "Type": "ACH_DEBIT",
        "Balance": "16593.06",
        "Check or Slip #": "",
        "TransactionId": "4dbf09cf237ec5e4d55aabd723dc77c2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/02/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/01",
        "Amount": "-9",
        "Type": "DEBIT_CARD",
        "Balance": "16622.06",
        "Check or Slip #": "",
        "TransactionId": "b85241ce94fb3e48274ecf9d3c18f80d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/02/2022",
        "Description": "TST* KAVA DSM DES MOINES IA                  03/02",
        "Amount": "-9.94",
        "Type": "DEBIT_CARD",
        "Balance": "16631.06",
        "Check or Slip #": "",
        "TransactionId": "3d313275765e51e5fe55f2717d5a204f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/02/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       03/01",
        "Amount": "-6.14",
        "Type": "DEBIT_CARD",
        "Balance": "16641",
        "Check or Slip #": "",
        "TransactionId": "8add64c9229b77d0f85582c39f7b0418"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/02/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "582.84",
        "Type": "ACH_CREDIT",
        "Balance": "16647.14",
        "Check or Slip #": "",
        "TransactionId": "41d513a511daf109090f6e2a57078262"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/01/2022",
        "Description": "City of Ankeny U PAYMENT    999000000516399 WEB ID: 110312002",
        "Amount": "-51.05",
        "Type": "ACH_DEBIT",
        "Balance": "16064.3",
        "Check or Slip #": "",
        "TransactionId": "25c4a38f77bd078abb053aa4866fd5f3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/01/2022",
        "Description": "JENSENBRICKHOUSE WEB PMTS   DJ8M99          WEB ID: 9000615921",
        "Amount": "-875",
        "Type": "ACH_DEBIT",
        "Balance": "16115.35",
        "Check or Slip #": "",
        "TransactionId": "78fe61e2f8d393eddecb2c0bba02477a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/01/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/28",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "16990.35",
        "Check or Slip #": "",
        "TransactionId": "bd0abd9acbbc36f3133ec02405652773"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/28/2022",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-84",
        "Type": "ACH_DEBIT",
        "Balance": "17000.35",
        "Check or Slip #": "",
        "TransactionId": "bfcac14f49549d628491b076b7f9cc44"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/28/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/28",
        "Amount": "-1.2",
        "Type": "DEBIT_CARD",
        "Balance": "17084.35",
        "Check or Slip #": "",
        "TransactionId": "6338357364c3bbf92051d3526f4007b6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/28/2022",
        "Description": "ARBY S 5722 ANKENY IA                        02/27",
        "Amount": "-9.74",
        "Type": "DEBIT_CARD",
        "Balance": "17085.55",
        "Check or Slip #": "",
        "TransactionId": "fa152f6de44843b80d715f13a5b6e2cf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/28/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/26",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "17095.29",
        "Check or Slip #": "",
        "TransactionId": "ede9862dc204da928434883de81a298e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/28/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 02/25",
        "Amount": "-32.02",
        "Type": "DEBIT_CARD",
        "Balance": "17096.29",
        "Check or Slip #": "",
        "TransactionId": "369d06ef90dc5d58c73bd8f2d17c1c0e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/25/2022",
        "Description": "SAMS CLUB SAM'S Club ANKENY IA               02/25",
        "Amount": "-3.69",
        "Type": "DEBIT_CARD",
        "Balance": "17128.31",
        "Check or Slip #": "",
        "TransactionId": "fec3fc3daae8a54c664438cc1d0060c4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/24/2022",
        "Description": "Kay.com 2000 Akron OH                        02/23",
        "Amount": "-330.74",
        "Type": "DEBIT_CARD",
        "Balance": "17132",
        "Check or Slip #": "",
        "TransactionId": "dff6e6df8a3c553df03b4b9f18ebf138"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/24/2022",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 02/23",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "17462.74",
        "Check or Slip #": "",
        "TransactionId": "a49bea32bd4a0d1302cb8d4d32be675e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/23/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       02/22",
        "Amount": "-8.36",
        "Type": "DEBIT_CARD",
        "Balance": "17467.16",
        "Check or Slip #": "",
        "TransactionId": "ef0c4bafbca2b8f9c5817d8f38a609ae"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/23/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "575.02",
        "Type": "ACH_CREDIT",
        "Balance": "17475.52",
        "Check or Slip #": "",
        "TransactionId": "8dd374e45f5f1ac122f1cf92659d38a3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/22/2022",
        "Description": "Kay.com 2000 Akron OH                        02/22",
        "Amount": "-330.75",
        "Type": "DEBIT_CARD",
        "Balance": "16900.5",
        "Check or Slip #": "",
        "TransactionId": "53e04776c31d0e4242b5d369005cbc6f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/22/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/21",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "17231.25",
        "Check or Slip #": "",
        "TransactionId": "fe6a8fd222d221bbfc71f12b48732125"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/22/2022",
        "Description": "WAL-MART #0892 ANKENY IA                     02/19",
        "Amount": "-16.4",
        "Type": "DEBIT_CARD",
        "Balance": "17243.25",
        "Check or Slip #": "",
        "TransactionId": "f4d5b400ab13895eba83f41388295bd6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/22/2022",
        "Description": "CHICK-FIL-A #03303 ANKENY IA                 02/19",
        "Amount": "-8.58",
        "Type": "DEBIT_CARD",
        "Balance": "17259.65",
        "Check or Slip #": "",
        "TransactionId": "6fc584b3b1b17594d00f1a075aac90af"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/22/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/18",
        "Amount": "-1.25",
        "Type": "DEBIT_CARD",
        "Balance": "17268.23",
        "Check or Slip #": "",
        "TransactionId": "976636b51cdedb41e0182c6bb257b710"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/18/2022",
        "Description": "CULVERS ANKENY ANKENY IA                     02/17",
        "Amount": "-9.21",
        "Type": "DEBIT_CARD",
        "Balance": "17269.48",
        "Check or Slip #": "",
        "TransactionId": "4c7e801623f6dd336ead1b565baf6cae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/17/2022",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      964433  02/17",
        "Amount": "-35.38",
        "Type": "DEBIT_CARD",
        "Balance": "17278.69",
        "Check or Slip #": "",
        "TransactionId": "980fbd937aad4dbd73db74cfb1df7151"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/17/2022",
        "Description": "TARGET T- 2135 SE Dela Ankeny IA             02/17",
        "Amount": "-15.37",
        "Type": "DEBIT_CARD",
        "Balance": "17314.07",
        "Check or Slip #": "",
        "TransactionId": "a884ccbd6115d57aeb24ea018ff3bf3a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/17/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             02/17",
        "Amount": "-32.8",
        "Type": "DEBIT_CARD",
        "Balance": "17329.44",
        "Check or Slip #": "",
        "TransactionId": "e0b031602465dfffd0776e6bc537b829"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/17/2022",
        "Description": "TACO BELL #31268 ANKENY IA                   02/16",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "17362.24",
        "Check or Slip #": "",
        "TransactionId": "8e8eb8eabd6e0d1e186d74d8b2f083bc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/16/2022",
        "Description": "SAMS CLUB SAM'S Club ANKENY IA               02/16",
        "Amount": "-3.26",
        "Type": "DEBIT_CARD",
        "Balance": "17367.54",
        "Check or Slip #": "",
        "TransactionId": "df281df9f5392e5431f1c9efbafac4e9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/16/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/15",
        "Amount": "-8.72",
        "Type": "DEBIT_CARD",
        "Balance": "17370.8",
        "Check or Slip #": "",
        "TransactionId": "115906a4c7a4e08f74e13502e441581b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/16/2022",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 02/15",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "17379.52",
        "Check or Slip #": "",
        "TransactionId": "efe6910470bab92603fa08b281272512"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/16/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       02/15",
        "Amount": "-7.3",
        "Type": "DEBIT_CARD",
        "Balance": "17383.94",
        "Check or Slip #": "",
        "TransactionId": "2bb25389eaac98aca0205cfb5112d376"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/16/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "587.29",
        "Type": "ACH_CREDIT",
        "Balance": "17391.24",
        "Check or Slip #": "",
        "TransactionId": "8203b20eb95a38f2ced6ee3f58507f85"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/15/2022",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             02/14",
        "Amount": "-11.87",
        "Type": "DEBIT_CARD",
        "Balance": "16803.95",
        "Check or Slip #": "",
        "TransactionId": "a19a5d1ab5cbe4c8cd20838de37c076f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/14/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/12",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "16815.82",
        "Check or Slip #": "",
        "TransactionId": "b42a562b268494d2e076c9d8c68555aa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/11/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/10",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "16818.82",
        "Check or Slip #": "",
        "TransactionId": "52bc1a2aa8bc25142b7546428f7270b1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/10/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             02/10",
        "Amount": "-46.93",
        "Type": "DEBIT_CARD",
        "Balance": "16830.82",
        "Check or Slip #": "",
        "TransactionId": "df4be30edd926d17dcb4d0c889a78c75"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/10/2022",
        "Description": "STAPLES 0808 ANKENY IA               757776  02/10",
        "Amount": "-4.92",
        "Type": "DEBIT_CARD",
        "Balance": "16877.75",
        "Check or Slip #": "",
        "TransactionId": "6e323c97dcee1431297c4e027e6dc536"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/10/2022",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            02/09",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "16882.67",
        "Check or Slip #": "",
        "TransactionId": "0450128bf2f14e3f4b4974f19ac49058"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/10/2022",
        "Description": "RAISING CANE'S 0667 ALTOONA IA               02/10",
        "Amount": "-9.62",
        "Type": "DEBIT_CARD",
        "Balance": "16937.67",
        "Check or Slip #": "",
        "TransactionId": "a31e5681bf9ec0e02abb0901af316da0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/09/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       02/08",
        "Amount": "-6.14",
        "Type": "DEBIT_CARD",
        "Balance": "16947.29",
        "Check or Slip #": "",
        "TransactionId": "194c8e3701a37769e8e3c7c1394bfd64"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/09/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "552.06",
        "Type": "ACH_CREDIT",
        "Balance": "16953.43",
        "Check or Slip #": "",
        "TransactionId": "e03e4619a134329da61a968defb65daa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/08/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             02/08",
        "Amount": "-27.02",
        "Type": "DEBIT_CARD",
        "Balance": "16401.37",
        "Check or Slip #": "",
        "TransactionId": "f66145dcba69709bdb114c100eb871a2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/07/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/07",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "16428.39",
        "Check or Slip #": "",
        "TransactionId": "99d9d6f749b551f8cdfbf5522b5523cc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/07/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/07",
        "Amount": "-1.6",
        "Type": "DEBIT_CARD",
        "Balance": "16429.39",
        "Check or Slip #": "",
        "TransactionId": "edbfbd47a25d3bdd37c9dab1252e6e22"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/07/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/05",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "16430.99",
        "Check or Slip #": "",
        "TransactionId": "d43f47a5bb9f695ca7a649ddef4e42e1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/07/2022",
        "Description": "ALDI 72035 ANKENY IA                 540835  02/05",
        "Amount": "-29.89",
        "Type": "DEBIT_CARD",
        "Balance": "16433.99",
        "Check or Slip #": "",
        "TransactionId": "f3273914c02d5078be9e7518cdba9dd0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/07/2022",
        "Description": "FAZOLIS_5913 ANKENY IA                       02/04",
        "Amount": "-13.06",
        "Type": "DEBIT_CARD",
        "Balance": "16463.88",
        "Check or Slip #": "",
        "TransactionId": "67709149b612d47eed25ef9b18dc5620"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/04/2022",
        "Description": "CULVERS ANKENY ANKENY IA                     02/03",
        "Amount": "-9.95",
        "Type": "DEBIT_CARD",
        "Balance": "16476.94",
        "Check or Slip #": "",
        "TransactionId": "aac44a15d20a494314b8f4a81e6e970d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/03/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 02/02",
        "Amount": "-12.1",
        "Type": "DEBIT_CARD",
        "Balance": "16486.89",
        "Check or Slip #": "",
        "TransactionId": "84bea14cf25a4ecee271197e3904db80"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/03/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/02",
        "Amount": "-9",
        "Type": "DEBIT_CARD",
        "Balance": "16498.99",
        "Check or Slip #": "",
        "TransactionId": "6a5236262401dad4c9ef9fc953117068"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/03/2022",
        "Description": "CHIPOTLE 2776 ANKENY IA                      02/02",
        "Amount": "-12.83",
        "Type": "DEBIT_CARD",
        "Balance": "16507.99",
        "Check or Slip #": "",
        "TransactionId": "e3c4e52dbd78ec27f8d8ff924f02ee17"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/03/2022",
        "Description": "McDonalds 35350 ANKENY IA                    02/01",
        "Amount": "-6.35",
        "Type": "DEBIT_CARD",
        "Balance": "16520.82",
        "Check or Slip #": "",
        "TransactionId": "c8965c24af186cbfe517801c6d0efe85"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/02/2022",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 02/01",
        "Amount": "-13.23",
        "Type": "DEBIT_CARD",
        "Balance": "16527.17",
        "Check or Slip #": "",
        "TransactionId": "3ea8a92e6c51c6e912ae06568e8d9e5b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/02/2022",
        "Description": "HY-VEE GAS ANKENY 5022 ANKENY IA             02/01",
        "Amount": "-32.68",
        "Type": "DEBIT_CARD",
        "Balance": "16540.4",
        "Check or Slip #": "",
        "TransactionId": "0641f2f9bd114f57db1f9b9bed20fb44"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/02/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "562.64",
        "Type": "ACH_CREDIT",
        "Balance": "16573.08",
        "Check or Slip #": "",
        "TransactionId": "c071969f85a7ca89aefa06e5ef5ccc98"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/01/2022",
        "Description": "MIDAMERICAN      ENERGY     0115123306W253  WEB ID: 4421425214",
        "Amount": "-29",
        "Type": "ACH_DEBIT",
        "Balance": "16010.44",
        "Check or Slip #": "",
        "TransactionId": "757a3775dfb2146b66ded1fcddeb236d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/01/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/31",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "16039.44",
        "Check or Slip #": "",
        "TransactionId": "3dc1ac54cdbc8d43af8ffc5c02861f6a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/31/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/31",
        "Amount": "-1.64",
        "Type": "DEBIT_CARD",
        "Balance": "16045.44",
        "Check or Slip #": "",
        "TransactionId": "408965296f4b5e278110f71141e3e0a0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/31/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/29",
        "Amount": "-3.13",
        "Type": "DEBIT_CARD",
        "Balance": "16047.08",
        "Check or Slip #": "",
        "TransactionId": "32b611c4914ff6e4ceeefb7d65812289"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/31/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/28",
        "Amount": "-1.25",
        "Type": "DEBIT_CARD",
        "Balance": "16050.21",
        "Check or Slip #": "",
        "TransactionId": "ea3d4687dc81794cd065f5b4bdcb1164"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2022",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-84",
        "Type": "ACH_DEBIT",
        "Balance": "16051.46",
        "Check or Slip #": "",
        "TransactionId": "d2a79fe9cadcced8ee4533d9ec353f16"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/27",
        "Amount": "-1.64",
        "Type": "DEBIT_CARD",
        "Balance": "16135.46",
        "Check or Slip #": "",
        "TransactionId": "756d353a41298910039315ff85e786f2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/27",
        "Amount": "-1.04",
        "Type": "DEBIT_CARD",
        "Balance": "16137.1",
        "Check or Slip #": "",
        "TransactionId": "66daa9ec2ca032c6840c37190e008035"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2022",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             01/27",
        "Amount": "-10.9",
        "Type": "DEBIT_CARD",
        "Balance": "16138.14",
        "Check or Slip #": "",
        "TransactionId": "f057d5e894f3b5c5ffb376eb723c649a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/27/2022",
        "Description": "ALDI 72035 ANKENY IA                 123278  01/27",
        "Amount": "-20.74",
        "Type": "DEBIT_CARD",
        "Balance": "16149.04",
        "Check or Slip #": "",
        "TransactionId": "6b508df621fc1845cf96a7b63056fdd0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/27/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             01/27",
        "Amount": "-13.83",
        "Type": "DEBIT_CARD",
        "Balance": "16169.78",
        "Check or Slip #": "",
        "TransactionId": "a46c459b22bb52e0b1859bc5a0835205"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/27/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/26",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "16183.61",
        "Check or Slip #": "",
        "TransactionId": "7fa4cb2eca23ecc098fde1acae126d29"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/27/2022",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            01/26",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "16189.61",
        "Check or Slip #": "",
        "TransactionId": "064eebaf5a69a16e08d7cc99336fd070"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/27/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/26",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "16244.61",
        "Check or Slip #": "",
        "TransactionId": "08af2c1fa3f760c5a5495c7c9210c01e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/26/2022",
        "Description": "JENSENBRICKHOUSE WEB PMTS   JXDP39          WEB ID: 9000615921",
        "Amount": "-875",
        "Type": "ACH_DEBIT",
        "Balance": "16251.61",
        "Check or Slip #": "",
        "TransactionId": "25dd6fa447ad5cd9e30e471a3d685b23"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/26/2022",
        "Description": "City of Ankeny U PAYMENT    999000000493187 WEB ID: 110312002",
        "Amount": "-54.81",
        "Type": "ACH_DEBIT",
        "Balance": "17126.61",
        "Check or Slip #": "",
        "TransactionId": "702db9beba08d36dbf2e2ee5244b32a9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/26/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       01/25",
        "Amount": "-10.48",
        "Type": "DEBIT_CARD",
        "Balance": "17181.42",
        "Check or Slip #": "",
        "TransactionId": "3fcb51b8acc35043e7cbd9c76b05dcd6"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/26/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "588.03",
        "Type": "ACH_CREDIT",
        "Balance": "17191.9",
        "Check or Slip #": "",
        "TransactionId": "e5e2fdc12b91f4da341a50e53819382c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/25/2022",
        "Description": "RAISING CANE'S 0667 ALTOONA IA               01/25",
        "Amount": "-9.62",
        "Type": "DEBIT_CARD",
        "Balance": "16603.87",
        "Check or Slip #": "",
        "TransactionId": "16c650a8a74619c1d424244cd1038e7b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/24/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/24",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "16613.49",
        "Check or Slip #": "",
        "TransactionId": "c251c4c4d445cf5806a1e35733585491"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/24/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/23",
        "Amount": "-1.7",
        "Type": "DEBIT_CARD",
        "Balance": "16616.49",
        "Check or Slip #": "",
        "TransactionId": "1c49c580e7c65f54b51c7a27a8702cd2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/24/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/22",
        "Amount": "-2.25",
        "Type": "DEBIT_CARD",
        "Balance": "16618.19",
        "Check or Slip #": "",
        "TransactionId": "abdcd472e7279e0a75ac6d442338658c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/24/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/22",
        "Amount": "-5.34",
        "Type": "DEBIT_CARD",
        "Balance": "16620.44",
        "Check or Slip #": "",
        "TransactionId": "9849cfff563ab28a65ac10be398ee29a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/24/2022",
        "Description": "Amazon Prime Amzn.com/bill WA                01/22",
        "Amount": "14.32",
        "Type": "DEBIT_CARD",
        "Balance": "16625.78",
        "Check or Slip #": "",
        "TransactionId": "00050858f96f908108c309462259780d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/21/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/20",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "16611.46",
        "Check or Slip #": "",
        "TransactionId": "81c8ed2895258fc8ea361f4be4662488"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/21/2022",
        "Description": "CULVERS ANKENY ANKENY IA                     01/20",
        "Amount": "-11.23",
        "Type": "DEBIT_CARD",
        "Balance": "16612.46",
        "Check or Slip #": "",
        "TransactionId": "e2d376913d9a175209de10e7dc7adf40"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/20/2022",
        "Description": "Wal-Mart Super Center ANKENY IA              01/20",
        "Amount": "-36.89",
        "Type": "DEBIT_CARD",
        "Balance": "16623.69",
        "Check or Slip #": "",
        "TransactionId": "d5254d291719cb502a582c2170572f59"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/20/2022",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             01/19",
        "Amount": "-10.9",
        "Type": "DEBIT_CARD",
        "Balance": "16660.58",
        "Check or Slip #": "",
        "TransactionId": "8d4138e4ededde15f6a9f1b805bf71b9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/19/2022",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 01/18",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "16671.48",
        "Check or Slip #": "",
        "TransactionId": "27b89e3846ca8a5a1539c6b471c0dfaf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/19/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/18",
        "Amount": "-6.5",
        "Type": "DEBIT_CARD",
        "Balance": "16675.9",
        "Check or Slip #": "",
        "TransactionId": "842dc9c71e30dd162af8622292dff95e"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/19/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "633.2",
        "Type": "ACH_CREDIT",
        "Balance": "16682.4",
        "Check or Slip #": "",
        "TransactionId": "612da676f424915fe372bf029115fe69"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/18/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/16",
        "Amount": "-2.7",
        "Type": "DEBIT_CARD",
        "Balance": "16049.2",
        "Check or Slip #": "",
        "TransactionId": "1d9d61d4ab9d9dd5eb0445fb440dca48"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/18/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/15",
        "Amount": "-2.8",
        "Type": "DEBIT_CARD",
        "Balance": "16051.9",
        "Check or Slip #": "",
        "TransactionId": "4801313185d7871c134a9322c42f248d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/18/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/14",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "16054.7",
        "Check or Slip #": "",
        "TransactionId": "3e423ac3700b96eec44e8568f031213a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/14",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "16055.7",
        "Check or Slip #": "",
        "TransactionId": "7cfb1c1f699925c5ab0c7535114c8345"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2022",
        "Description": "HARDEES 1506082 ANKENY IA                    01/13",
        "Amount": "-6.88",
        "Type": "DEBIT_CARD",
        "Balance": "16056.7",
        "Check or Slip #": "",
        "TransactionId": "ff0554bc65f762f7bbbfe533722e2875"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/14/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "612.44",
        "Type": "ACH_CREDIT",
        "Balance": "16063.58",
        "Check or Slip #": "",
        "TransactionId": "0864e8aa762950360d29a703d7d482ad"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/13/2022",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      328991  01/13",
        "Amount": "-26.68",
        "Type": "DEBIT_CARD",
        "Balance": "15451.14",
        "Check or Slip #": "",
        "TransactionId": "51c973a628fbb80c265f21bf148f0f30"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/13/2022",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             01/13",
        "Amount": "-58.46",
        "Type": "DEBIT_CARD",
        "Balance": "15477.82",
        "Check or Slip #": "",
        "TransactionId": "f89ad0be664c1d43fd7a9e1ba102508f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/13/2022",
        "Description": "CHIPOTLE 2776 ANKENY IA                      01/12",
        "Amount": "-11.4",
        "Type": "DEBIT_CARD",
        "Balance": "15536.28",
        "Check or Slip #": "",
        "TransactionId": "248af872dfd600208e0f2b394b3acf35"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/13/2022",
        "Description": "McDonalds 3207 ANKENY IA                     01/11",
        "Amount": "-4.12",
        "Type": "DEBIT_CARD",
        "Balance": "15547.68",
        "Check or Slip #": "",
        "TransactionId": "4792c76eaf7a23f7432fd5c8c59c19a5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/12/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/12",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "15551.8",
        "Check or Slip #": "",
        "TransactionId": "d7ea7a3cece2cda49f4c723269a896d8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/12/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/12",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "15556.8",
        "Check or Slip #": "",
        "TransactionId": "f76fe381d815aac783846fdbc6ed2425"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/12/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "599.85",
        "Type": "ACH_CREDIT",
        "Balance": "15576.8",
        "Check or Slip #": "",
        "TransactionId": "6f87e28e9ce2ad9d5a5c3e548077e42b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/11/2022",
        "Description": "WENDY'S 8654 ANKENY IA                       01/10",
        "Amount": "-4.24",
        "Type": "DEBIT_CARD",
        "Balance": "14976.95",
        "Check or Slip #": "",
        "TransactionId": "72734cb8b8adeba202cbd614142abb79"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/10/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/09",
        "Amount": "-4.81",
        "Type": "DEBIT_CARD",
        "Balance": "14981.19",
        "Check or Slip #": "",
        "TransactionId": "d983f48696fc000b1a3a01389695a9bc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/10/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/08",
        "Amount": "-4.6",
        "Type": "DEBIT_CARD",
        "Balance": "14986",
        "Check or Slip #": "",
        "TransactionId": "610334df005df88a9e1fecb0dfa79c84"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/10/2022",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             01/08",
        "Amount": "-10.48",
        "Type": "DEBIT_CARD",
        "Balance": "14990.6",
        "Check or Slip #": "",
        "TransactionId": "6bf588a0d6c1f910b1cc2750439dbd00"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/10/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/08",
        "Amount": "-1.23",
        "Type": "DEBIT_CARD",
        "Balance": "15001.08",
        "Check or Slip #": "",
        "TransactionId": "f41d7cf690fcad3be284413175f84cec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2022",
        "Description": "Wal-Mart Super Center ANKENY IA              01/06",
        "Amount": "-40.26",
        "Type": "DEBIT_CARD",
        "Balance": "15002.31",
        "Check or Slip #": "",
        "TransactionId": "945fb15efc14c7864edd547d4dd569ab"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2022",
        "Description": "SAM'S Club ANKENY IA                         01/06",
        "Amount": "-3.69",
        "Type": "DEBIT_CARD",
        "Balance": "15042.57",
        "Check or Slip #": "",
        "TransactionId": "31a23b803572807fcafd378e50748bfe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2022",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 01/05",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "15046.26",
        "Check or Slip #": "",
        "TransactionId": "d34ef3b5a65f374e733d8ae6406f8a25"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2022",
        "Description": "BEN'S BURGERS ANKENY IA                      01/05",
        "Amount": "-12.58",
        "Type": "DEBIT_CARD",
        "Balance": "15050.68",
        "Check or Slip #": "",
        "TransactionId": "12c513558538c83155ff23154220a79a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/05/2022",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "673.53",
        "Type": "ACH_CREDIT",
        "Balance": "15063.26",
        "Check or Slip #": "",
        "TransactionId": "3f26023461aa8668305e1c50bc7b402f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/03/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/03",
        "Amount": "-5.73",
        "Type": "DEBIT_CARD",
        "Balance": "14389.73",
        "Check or Slip #": "",
        "TransactionId": "695c22556889393998807b1f37509aa6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/03/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/01",
        "Amount": "-2.89",
        "Type": "DEBIT_CARD",
        "Balance": "14395.46",
        "Check or Slip #": "",
        "TransactionId": "efd42656413d3c863ff508b3620bdb37"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/03/2022",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/01",
        "Amount": "-1.4",
        "Type": "DEBIT_CARD",
        "Balance": "14398.35",
        "Check or Slip #": "",
        "TransactionId": "19aad6cd408b8bd16b3b274f1f16e8ae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/03/2022",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 12/31",
        "Amount": "-18.48",
        "Type": "DEBIT_CARD",
        "Balance": "14399.75",
        "Check or Slip #": "",
        "TransactionId": "12da00f2f5e7bb2f0f3f23df59069053"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/31/2021",
        "Description": "MIDAMERICAN      ENERGY     0115123306W231  WEB ID: 4421425214",
        "Amount": "-29",
        "Type": "ACH_DEBIT",
        "Balance": "14418.23",
        "Check or Slip #": "",
        "TransactionId": "82e8cb862df78c3949b13b2984c2af42"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/31/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/31",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "14447.23",
        "Check or Slip #": "",
        "TransactionId": "2433f8bf7ee14de55834d75739ce20b8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/31/2021",
        "Description": "CHIPOTLE 2776 ANKENY IA                      12/30",
        "Amount": "-8.69",
        "Type": "DEBIT_CARD",
        "Balance": "14448.23",
        "Check or Slip #": "",
        "TransactionId": "1dfdbcfa6773d0258e0a0fd55041e6f5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/30/2021",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      231111  12/30",
        "Amount": "-33.85",
        "Type": "DEBIT_CARD",
        "Balance": "14456.92",
        "Check or Slip #": "",
        "TransactionId": "85516280baa11ccfdbff92057d041d9f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/30/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/30",
        "Amount": "-40",
        "Type": "DEBIT_CARD",
        "Balance": "14490.77",
        "Check or Slip #": "",
        "TransactionId": "4319e459b51c6c8a6f32a59a620328d9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/30/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/29",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "14530.77",
        "Check or Slip #": "",
        "TransactionId": "adfb0c498aba7412c30aae3dc40671b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/30/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/29",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "14531.77",
        "Check or Slip #": "",
        "TransactionId": "f773a973289d7549a27aec6ebaa3bf39"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/29/2021",
        "Description": "JENSENBRICKHOUSE WEB PMTS   K0TKY8          WEB ID: 9000615921",
        "Amount": "-875",
        "Type": "ACH_DEBIT",
        "Balance": "14537.27",
        "Check or Slip #": "",
        "TransactionId": "0c51a4628cdb42d951a96306c9ba7e33"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/29/2021",
        "Description": "City of Ankeny U PAYMENT    999000000471924 WEB ID: 110312002",
        "Amount": "-51.05",
        "Type": "ACH_DEBIT",
        "Balance": "15412.27",
        "Check or Slip #": "",
        "TransactionId": "cbdeb4a140595894a622eb603a1b335f"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/29/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "484.65",
        "Type": "ACH_CREDIT",
        "Balance": "15463.32",
        "Check or Slip #": "",
        "TransactionId": "c573e3f58a099d2b8b561d8bbdf1449b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/28/2021",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-84.02",
        "Type": "ACH_DEBIT",
        "Balance": "14978.67",
        "Check or Slip #": "",
        "TransactionId": "37f23fcd4dcf3dcc264144ac85cc2488"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/27/2021",
        "Description": "Amazon Prime*RU2AL88 Amzn.com/bill WA        12/27",
        "Amount": "-14.32",
        "Type": "DEBIT_CARD",
        "Balance": "15062.69",
        "Check or Slip #": "",
        "TransactionId": "fc6063ccd37ff04680115fe21e6ffc13"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/23/2021",
        "Description": "RAISING CANE'S 0667 ALTOONA IA               12/23",
        "Amount": "-9.62",
        "Type": "DEBIT_CARD",
        "Balance": "15077.01",
        "Check or Slip #": "",
        "TransactionId": "5aa84628e28dd00e5664c2a73769a7ff"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/22/2021",
        "Description": "AUTOZONE  3945 713 N A ANKENY IA     338821  12/22",
        "Amount": "-224.71",
        "Type": "DEBIT_CARD",
        "Balance": "15086.63",
        "Check or Slip #": "",
        "TransactionId": "2b974c8a899a38a81afbbccac6526d5f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/22/2021",
        "Description": "CHIPOTLE 2776 ANKENY IA                      12/21",
        "Amount": "-8.69",
        "Type": "DEBIT_CARD",
        "Balance": "15311.34",
        "Check or Slip #": "",
        "TransactionId": "8e3e2ff6938650c932d912add7d84804"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/22/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "622.02",
        "Type": "ACH_CREDIT",
        "Balance": "15320.03",
        "Check or Slip #": "",
        "TransactionId": "2424837beca4b765938331051441c191"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/21/2021",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      452421  12/21",
        "Amount": "-30.83",
        "Type": "DEBIT_CARD",
        "Balance": "14698.01",
        "Check or Slip #": "",
        "TransactionId": "e20ce2bb4e055a17b62b6559b3469e7c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/21/2021",
        "Description": "Wal-Mart Super Center ANKENY IA              12/21",
        "Amount": "-58.01",
        "Type": "DEBIT_CARD",
        "Balance": "14728.84",
        "Check or Slip #": "",
        "TransactionId": "ba559bc94286b38ffd56476ef29b24cf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/20/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/19",
        "Amount": "-5.24",
        "Type": "DEBIT_CARD",
        "Balance": "14786.85",
        "Check or Slip #": "",
        "TransactionId": "dbaad9c74b4311d4ab8f168bce4d5ea0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/20/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/18",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "14792.09",
        "Check or Slip #": "",
        "TransactionId": "537406d37c476c7dea5748132842c8d5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/20/2021",
        "Description": "Caseys Pizza 2689 515-9637640 IA             12/19",
        "Amount": "-15.36",
        "Type": "DEBIT_CARD",
        "Balance": "14793.09",
        "Check or Slip #": "",
        "TransactionId": "23401c70391b7ea3d93186c647b73ca5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/20/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/17",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "14808.45",
        "Check or Slip #": "",
        "TransactionId": "f4d11e74dcaec0402b08e3db2e3d4709"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/20/2021",
        "Description": "SONIC DRIVE IN #4871 ANKENY IA               12/17",
        "Amount": "-9.42",
        "Type": "DEBIT_CARD",
        "Balance": "14809.45",
        "Check or Slip #": "",
        "TransactionId": "d3ce4fec3da020169741debe3d6d37b6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/17/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     12/16",
        "Amount": "-9",
        "Type": "DEBIT_CARD",
        "Balance": "14818.87",
        "Check or Slip #": "",
        "TransactionId": "6dd5bdae81c38f2ec55db2cb461f1161"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/16/2021",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             12/16",
        "Amount": "-22.39",
        "Type": "DEBIT_CARD",
        "Balance": "14827.87",
        "Check or Slip #": "",
        "TransactionId": "9879019ad5a0b3cf18b97e3393be3a55"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/16/2021",
        "Description": "ABEDARLOS MEXICAN FRESH ANKENY IA            12/15",
        "Amount": "-10.18",
        "Type": "DEBIT_CARD",
        "Balance": "14850.26",
        "Check or Slip #": "",
        "TransactionId": "0412b8cb119640b7fb5faeb208bead29"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/16/2021",
        "Description": "BURGER KING #10435 ANKENY IA                 12/14",
        "Amount": "-7.42",
        "Type": "DEBIT_CARD",
        "Balance": "14860.44",
        "Check or Slip #": "",
        "TransactionId": "01b67b21be5c3e65fd9b1c176681a7de"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/15/2021",
        "Description": "Wal-Mart Super Center ANKENY IA              12/15",
        "Amount": "-40.54",
        "Type": "DEBIT_CARD",
        "Balance": "14867.86",
        "Check or Slip #": "",
        "TransactionId": "2da94acb6089608539565a4c3f6290e7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/15/2021",
        "Description": "DOMINO'S 1724 ANKENY IA                      12/14",
        "Amount": "-16.94",
        "Type": "DEBIT_CARD",
        "Balance": "14908.4",
        "Check or Slip #": "",
        "TransactionId": "4ae62e1127a1cb04274831857a775377"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/15/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "172.54",
        "Type": "ACH_CREDIT",
        "Balance": "14925.34",
        "Check or Slip #": "",
        "TransactionId": "878e8249dfd9d0f9c94c24726a72e7b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/14/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 12/13",
        "Amount": "-3.87",
        "Type": "DEBIT_CARD",
        "Balance": "14752.8",
        "Check or Slip #": "",
        "TransactionId": "fdfb2bf7380e43903a2bfbf4794d24b4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/14/2021",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            12/13",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "14756.67",
        "Check or Slip #": "",
        "TransactionId": "070e326dcd4dc54c57fb33d33f9d4fcf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/13/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/12",
        "Amount": "-3.5",
        "Type": "DEBIT_CARD",
        "Balance": "14811.67",
        "Check or Slip #": "",
        "TransactionId": "8eb7692476cd32d077636714ccccdc08"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/13/2021",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             12/12",
        "Amount": "-12.7",
        "Type": "DEBIT_CARD",
        "Balance": "14815.17",
        "Check or Slip #": "",
        "TransactionId": "488644ff3f9dedb5d709f96aa8a32d80"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/08/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/07",
        "Amount": "-13",
        "Type": "DEBIT_CARD",
        "Balance": "14827.87",
        "Check or Slip #": "",
        "TransactionId": "18e2a9e3f7601a96ba7788587adc1124"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/08/2021",
        "Description": "THAYER EYECARE PLC DES MOINES IA             12/07",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "14840.87",
        "Check or Slip #": "",
        "TransactionId": "97897bb0a6d1c12b8841a27e9143b226"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/08/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "669.38",
        "Type": "ACH_CREDIT",
        "Balance": "14850.87",
        "Check or Slip #": "",
        "TransactionId": "5f5fb275082e8034cbb213c92069a13f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/07/2021",
        "Description": "TARGET        00017673 ANKENY IA             12/06",
        "Amount": "-12.48",
        "Type": "DEBIT_CARD",
        "Balance": "14181.49",
        "Check or Slip #": "",
        "TransactionId": "272bdf316c7fa569d284db05e0cc2b0d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/06/2021",
        "Description": "MICHAELS STORES 3733 ANKENY IA       027892  12/06",
        "Amount": "-6.35",
        "Type": "DEBIT_CARD",
        "Balance": "14193.97",
        "Check or Slip #": "",
        "TransactionId": "8fe8b96e79a6102efd7d544c533b9cac"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/06/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/06",
        "Amount": "-1.7",
        "Type": "DEBIT_CARD",
        "Balance": "14200.32",
        "Check or Slip #": "",
        "TransactionId": "0215262bce03a5dd93a49617f79b6d27"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/06/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/05",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "14202.02",
        "Check or Slip #": "",
        "TransactionId": "ed882352ee1864f6f5a2de7c108883f7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/06/2021",
        "Description": "CHIPOTLE 2776 ANKENY IA                      12/05",
        "Amount": "-10.87",
        "Type": "DEBIT_CARD",
        "Balance": "14203.02",
        "Check or Slip #": "",
        "TransactionId": "fd65b957ca95f93f2c94da067ef745d2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/06/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/05",
        "Amount": "-1.55",
        "Type": "DEBIT_CARD",
        "Balance": "14213.89",
        "Check or Slip #": "",
        "TransactionId": "d755e158b4ecb2f0b9bf35103dd8d0e0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/06/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/04",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "14215.44",
        "Check or Slip #": "",
        "TransactionId": "b4a3de79c4f481ef1f47ea57cc95bfd5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/06/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/04",
        "Amount": "-1.3",
        "Type": "DEBIT_CARD",
        "Balance": "14216.44",
        "Check or Slip #": "",
        "TransactionId": "3408f3130a8458abce4d081964975cd5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/03/2021",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             12/02",
        "Amount": "-10.48",
        "Type": "DEBIT_CARD",
        "Balance": "14217.74",
        "Check or Slip #": "",
        "TransactionId": "5545ec5d0111ab4497b658b0a43e17d3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2021",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             12/02",
        "Amount": "-23.83",
        "Type": "DEBIT_CARD",
        "Balance": "14228.22",
        "Check or Slip #": "",
        "TransactionId": "88345fc2354638b4fc1828531a57c820"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2021",
        "Description": "RAISING CANE'S 0667 ALTOONA IA               12/02",
        "Amount": "-9.94",
        "Type": "DEBIT_CARD",
        "Balance": "14252.05",
        "Check or Slip #": "",
        "TransactionId": "a54f4cf7007910f8a4007007be376d49"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/01/2021",
        "Description": "MIDAMERICAN      ENERGY     0115123306W210  WEB ID: 4421425214",
        "Amount": "-29",
        "Type": "ACH_DEBIT",
        "Balance": "14261.99",
        "Check or Slip #": "",
        "TransactionId": "e284a650754e8dbe31568d6d8772bc61"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/01/2021",
        "Description": "FUZZYS TACO SHOP - ANKE ANKENY IA            11/30",
        "Amount": "-7.94",
        "Type": "DEBIT_CARD",
        "Balance": "14290.99",
        "Check or Slip #": "",
        "TransactionId": "605fbc2c67ebc0411086e1d888ea27be"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/01/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     11/30",
        "Amount": "-7.3",
        "Type": "DEBIT_CARD",
        "Balance": "14298.93",
        "Check or Slip #": "",
        "TransactionId": "ab4e25d0aefb48caffb9d9c3902a59fa"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/01/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "583.33",
        "Type": "ACH_CREDIT",
        "Balance": "14306.23",
        "Check or Slip #": "",
        "TransactionId": "e5d1afb8239cdf264c2a5e221798330e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/01/2021",
        "Description": "BEST BUY      00015123 ANKENY IA             11/30",
        "Amount": "128.39",
        "Type": "DEBIT_CARD",
        "Balance": "13722.9",
        "Check or Slip #": "",
        "TransactionId": "52b8467d02c6cf59410ee30aa461d4fa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/30/2021",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      447279  11/30",
        "Amount": "-26.06",
        "Type": "DEBIT_CARD",
        "Balance": "13594.51",
        "Check or Slip #": "",
        "TransactionId": "bdfb9070f027f2d49bcab945422ae7cd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/30/2021",
        "Description": "JENSENBRICKHOUSE WEB PMTS   HSNCS8          WEB ID: 9000615921",
        "Amount": "-875",
        "Type": "ACH_DEBIT",
        "Balance": "13620.57",
        "Check or Slip #": "",
        "TransactionId": "9d6b4198f3ea7a6825e548003789555e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/30/2021",
        "Description": "City of Ankeny U PAYMENT    999000000451547 WEB ID: 110312002",
        "Amount": "-48.54",
        "Type": "ACH_DEBIT",
        "Balance": "14495.57",
        "Check or Slip #": "",
        "TransactionId": "0c660b79f74553bda673f44a7a695d01"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2021",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-115.62",
        "Type": "ACH_DEBIT",
        "Balance": "14544.11",
        "Check or Slip #": "",
        "TransactionId": "0b8b2886fd18db8eb3ca8c7549fc39d0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/27",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "14659.73",
        "Check or Slip #": "",
        "TransactionId": "e53351485996da4ca620772fdc1d21b8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2021",
        "Description": "WAL-MART #0892 ANKENY IA                     11/27",
        "Amount": "-44.18",
        "Type": "DEBIT_CARD",
        "Balance": "14660.73",
        "Check or Slip #": "",
        "TransactionId": "3263b7671bd9fd35893745cdac3d9eed"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2021",
        "Description": "CHIPOTLE 2776 ANKENY IA                      11/27",
        "Amount": "-10.87",
        "Type": "DEBIT_CARD",
        "Balance": "14704.91",
        "Check or Slip #": "",
        "TransactionId": "6c8f0f2138ccaf5e28c2351e4dc6c560"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/26",
        "Amount": "-27.6",
        "Type": "DEBIT_CARD",
        "Balance": "14715.78",
        "Check or Slip #": "",
        "TransactionId": "9d3f9512a91a273ffa329dddd4688d92"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/26",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "14743.38",
        "Check or Slip #": "",
        "TransactionId": "e56775c080a1c6a24d05d666524422bc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/26",
        "Amount": "-22.49",
        "Type": "DEBIT_CARD",
        "Balance": "14744.38",
        "Check or Slip #": "",
        "TransactionId": "3e01fd8f4e2fb368bf32ff205cfa450e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/26",
        "Amount": "-11.54",
        "Type": "DEBIT_CARD",
        "Balance": "14766.87",
        "Check or Slip #": "",
        "TransactionId": "692cb6fc9affc4526ff263a0fdcb9d18"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2021",
        "Description": "DES MOINES AIRPORT AUTH DES MOINES IA        11/25",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "14778.41",
        "Check or Slip #": "",
        "TransactionId": "e819227a576fb6a9feb504e21adf3fa8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2021",
        "Description": "Cash App*Cash Out VISA DIRECT CA     512421  11/29",
        "Amount": "443.01",
        "Type": "DEBIT_CARD",
        "Balance": "14784.41",
        "Check or Slip #": "",
        "TransactionId": "7ee70aeadff0860fb29106830f170acc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/26/2021",
        "Description": "IHOP #5438 ANKENY IA                         11/25",
        "Amount": "-15",
        "Type": "DEBIT_CARD",
        "Balance": "14341.4",
        "Check or Slip #": "",
        "TransactionId": "77aa757a4d9b7526b413aabb8bb496f2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/26/2021",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 11/24",
        "Amount": "-12.65",
        "Type": "DEBIT_CARD",
        "Balance": "14356.4",
        "Check or Slip #": "",
        "TransactionId": "bc16907f2c6a80f45d9cb720e90cde89"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/26/2021",
        "Description": "ARBYS 5722 ANKENY IA                         11/24",
        "Amount": "-6.36",
        "Type": "DEBIT_CARD",
        "Balance": "14369.05",
        "Check or Slip #": "",
        "TransactionId": "8b9483a6b6ab0e8f054407f191f64f04"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/24/2021",
        "Description": "BEST BUY      000079 WEST DES MOIN IA667775  11/24",
        "Amount": "-128.39",
        "Type": "DEBIT_CARD",
        "Balance": "14375.41",
        "Check or Slip #": "",
        "TransactionId": "4caabc3b790fac86fb798befc73a0a46"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/24/2021",
        "Description": "BATH AND BODY WORKS WEST DES MOIN IA 446554  11/24",
        "Amount": "-46.55",
        "Type": "DEBIT_CARD",
        "Balance": "14503.8",
        "Check or Slip #": "",
        "TransactionId": "e0bd86470fec618d8cd371dfa7477a04"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/24/2021",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             11/23",
        "Amount": "-11.12",
        "Type": "DEBIT_CARD",
        "Balance": "14550.35",
        "Check or Slip #": "",
        "TransactionId": "24535fd6183ed311d3829c9582bc5632"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/24/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "658.12",
        "Type": "ACH_CREDIT",
        "Balance": "14561.47",
        "Check or Slip #": "",
        "TransactionId": "0dd3022f2be8bdc77ec5da48c294da54"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/23/2021",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             11/23",
        "Amount": "-7.86",
        "Type": "DEBIT_CARD",
        "Balance": "13903.35",
        "Check or Slip #": "",
        "TransactionId": "b9d950aaf1d519e63e43722674e544f5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/22/2021",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      211965  11/22",
        "Amount": "-39.72",
        "Type": "DEBIT_CARD",
        "Balance": "13911.21",
        "Check or Slip #": "",
        "TransactionId": "0a27b91150a9253a1bc5c7c31388c16b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/22/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/22",
        "Amount": "-1.75",
        "Type": "DEBIT_CARD",
        "Balance": "13950.93",
        "Check or Slip #": "",
        "TransactionId": "8d4c2019b7a7e87d29fa8f4a895f60ab"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/22/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/21",
        "Amount": "-5.49",
        "Type": "DEBIT_CARD",
        "Balance": "13952.68",
        "Check or Slip #": "",
        "TransactionId": "2c2b405872211a10c8c2936b64bf0993"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/22/2021",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 11/20",
        "Amount": "-16.6",
        "Type": "DEBIT_CARD",
        "Balance": "13958.17",
        "Check or Slip #": "",
        "TransactionId": "d230252e6440a9e565d63f012ca9f3db"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/22/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/20",
        "Amount": "-1.75",
        "Type": "DEBIT_CARD",
        "Balance": "13974.77",
        "Check or Slip #": "",
        "TransactionId": "3f1a0b08d370377c27fbc7f3f783f345"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/18/2021",
        "Description": "WAL-MART #0892 ANKENY IA                     11/18",
        "Amount": "-14.87",
        "Type": "DEBIT_CARD",
        "Balance": "13976.52",
        "Check or Slip #": "",
        "TransactionId": "27974db7da8690c687dcba6094e62e50"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/18/2021",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             11/17",
        "Amount": "-10.48",
        "Type": "DEBIT_CARD",
        "Balance": "13991.39",
        "Check or Slip #": "",
        "TransactionId": "2b1d63280e0a015675f9b62230a7e9b4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/17/2021",
        "Description": "WAL-MART #0892 ANKENY IA                     11/17",
        "Amount": "-10.55",
        "Type": "DEBIT_CARD",
        "Balance": "14001.87",
        "Check or Slip #": "",
        "TransactionId": "757c448215d8f65819eab8a10b481626"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/17/2021",
        "Description": "CHIPOTLE 2776 ANKENY IA                      11/16",
        "Amount": "-10.87",
        "Type": "DEBIT_CARD",
        "Balance": "14012.42",
        "Check or Slip #": "",
        "TransactionId": "7442765f064299d5e7c465f942337f1a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/17/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "643.58",
        "Type": "ACH_CREDIT",
        "Balance": "14023.29",
        "Check or Slip #": "",
        "TransactionId": "be02487c3c69ff3b1f5ef517a46341f1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/16/2021",
        "Description": "RAISING CANE'S 0667 ALTOONA IA               11/16",
        "Amount": "-8.89",
        "Type": "DEBIT_CARD",
        "Balance": "13379.71",
        "Check or Slip #": "",
        "TransactionId": "3e6e6931885a3dee622251a67d6cc058"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/15/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/15",
        "Amount": "-1.69",
        "Type": "DEBIT_CARD",
        "Balance": "13388.6",
        "Check or Slip #": "",
        "TransactionId": "861d6fdfc5998558f99806fc3fd5f151"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/15/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/14",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "13390.29",
        "Check or Slip #": "",
        "TransactionId": "0b8c4c6d3a88b24dff7401054165463a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/15/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/13",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "13396.29",
        "Check or Slip #": "",
        "TransactionId": "94acd968bd455afdb5298864d6f65812"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/12/2021",
        "Description": "CHICK-FIL-A #03303 ANKENY IA                 11/09",
        "Amount": "-8.58",
        "Type": "DEBIT_CARD",
        "Balance": "13397.29",
        "Check or Slip #": "",
        "TransactionId": "eff65761b574f12b2c49d0e48280728a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/10/2021",
        "Description": "OFFICIAL CHECKS CHARGE",
        "Amount": "-8",
        "Type": "FEE_TRANSACTION",
        "Balance": "13405.87",
        "Check or Slip #": "",
        "TransactionId": "bbabd3f2b7a9e895021a17398056ec91"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/10/2021",
        "Description": "L2G POLK TREASURER 111 DES MOINES IA         11/10",
        "Amount": "-868.25",
        "Type": "DEBIT_CARD",
        "Balance": "13413.87",
        "Check or Slip #": "",
        "TransactionId": "807f5ccdb77351946918b99174d71083"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/10/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/09",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "14282.12",
        "Check or Slip #": "",
        "TransactionId": "b3dcc7f1075c97dd2f4006b63f2e9f31"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/10/2021",
        "Description": "MIDAS AUTO SYSTEMS EXPE AMES IA              11/09",
        "Amount": "-136.2",
        "Type": "DEBIT_CARD",
        "Balance": "14292.12",
        "Check or Slip #": "",
        "TransactionId": "bafb20108991a3380c95c48cf3719212"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/10/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "626.46",
        "Type": "ACH_CREDIT",
        "Balance": "14428.32",
        "Check or Slip #": "",
        "TransactionId": "84ad0af129986127dd4fb690b252a858"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/09/2021",
        "Description": "WITHDRAWAL 11/09",
        "Amount": "-12300",
        "Type": "MISC_DEBIT",
        "Balance": "13801.86",
        "Check or Slip #": "",
        "TransactionId": "d0a5310392d94401fc380636b64546c2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/09/2021",
        "Description": "RAISING CANE'S 0667 ALTOONA IA               11/08",
        "Amount": "-13.36",
        "Type": "DEBIT_CARD",
        "Balance": "26101.86",
        "Check or Slip #": "",
        "TransactionId": "22225f9990b7eba3a785c392265b3ab9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/08/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/07",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "26115.22",
        "Check or Slip #": "",
        "TransactionId": "4c3c039225faea5274bb19df62c15691"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/08/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/07",
        "Amount": "-3.2",
        "Type": "DEBIT_CARD",
        "Balance": "26116.22",
        "Check or Slip #": "",
        "TransactionId": "a4fdd27eb54a9260ecdaaca4f9a541e5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/08/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/05",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "26119.42",
        "Check or Slip #": "",
        "TransactionId": "d88ee2a65ac3153f0f9c26745512133c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2021",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 11/04",
        "Amount": "-66.1",
        "Type": "DEBIT_CARD",
        "Balance": "26129.42",
        "Check or Slip #": "",
        "TransactionId": "37ba08c0864747cb672ea2c8d7d0f163"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2021",
        "Description": "HY-VEE GAS AMES 5018 AMES IA                 11/04",
        "Amount": "-29.41",
        "Type": "DEBIT_CARD",
        "Balance": "26195.52",
        "Check or Slip #": "",
        "TransactionId": "76508a0ab3bea284b4738bfe18f9c1ce"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/04/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     11/03",
        "Amount": "-5.82",
        "Type": "DEBIT_CARD",
        "Balance": "26224.93",
        "Check or Slip #": "",
        "TransactionId": "2f756e6b5eb3d7a8165c9e8a7ebf4783"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/03/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/02",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "26230.75",
        "Check or Slip #": "",
        "TransactionId": "9eb8ba8ade1bb277814a37cc4f68281b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/03/2021",
        "Description": "CHIPOTLE 2776 ANKENY IA                      11/02",
        "Amount": "-8.22",
        "Type": "DEBIT_CARD",
        "Balance": "26236.05",
        "Check or Slip #": "",
        "TransactionId": "734cd03e234fc2e52764df734c4a1c2f"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/03/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "630.34",
        "Type": "ACH_CREDIT",
        "Balance": "26244.27",
        "Check or Slip #": "",
        "TransactionId": "b4f60417993e53b8fbc7e3ab5afaa896"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/02/2021",
        "Description": "ARBYS 5722 ANKENY IA                         11/01",
        "Amount": "-10.68",
        "Type": "DEBIT_CARD",
        "Balance": "25613.93",
        "Check or Slip #": "",
        "TransactionId": "681a55b52b7aa04f8caac2a0a01600a5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/01/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/31",
        "Amount": "-2.64",
        "Type": "DEBIT_CARD",
        "Balance": "25624.61",
        "Check or Slip #": "",
        "TransactionId": "dfd2c8cfc4645d6615b1c318037b646f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/01/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/30",
        "Amount": "-3.25",
        "Type": "DEBIT_CARD",
        "Balance": "25627.25",
        "Check or Slip #": "",
        "TransactionId": "d38d3e746646c2fb4834d51491f8a201"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/01/2021",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 10/30",
        "Amount": "-8.98",
        "Type": "DEBIT_CARD",
        "Balance": "25630.5",
        "Check or Slip #": "",
        "TransactionId": "00a3d6664106ed7d7cbf03897cb8a986"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/01/2021",
        "Description": "CHIPOTLE 2776 ANKENY IA                      10/30",
        "Amount": "-10.87",
        "Type": "DEBIT_CARD",
        "Balance": "25639.48",
        "Check or Slip #": "",
        "TransactionId": "73505162b6631ed7783d1b18e7db5c2d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/01/2021",
        "Description": "MIDAMERICAN      ENERGY     0115123306W190  WEB ID: 4421425214",
        "Amount": "-40",
        "Type": "ACH_DEBIT",
        "Balance": "25650.35",
        "Check or Slip #": "",
        "TransactionId": "f9f1d108cf438b229557550509065d69"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/01/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/29",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "25690.35",
        "Check or Slip #": "",
        "TransactionId": "458ed18f3be01812771c3553c7218266"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/01/2021",
        "Description": "Subway 7746 Ankeny IA                        10/30",
        "Amount": "-8.36",
        "Type": "DEBIT_CARD",
        "Balance": "25691.35",
        "Check or Slip #": "",
        "TransactionId": "61b1e0ff22a225add1c299db59045d82"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/01/2021",
        "Description": "Offer: Domino's Pizza (Non-In Store)",
        "Amount": "1.06",
        "Type": "MISC_CREDIT",
        "Balance": "25699.71",
        "Check or Slip #": "",
        "TransactionId": "c35e6f0a84fed43c14317fcea6f86474"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2021",
        "Description": "JENSENBRICKHOUSE WEB PMTS   XKFXL8          WEB ID: 9000615921",
        "Amount": "-875",
        "Type": "ACH_DEBIT",
        "Balance": "25698.65",
        "Check or Slip #": "",
        "TransactionId": "d406d7b8436b4dc0228493dc1d52d05a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2021",
        "Description": "City of Ankeny U PAYMENT    999000000429389 WEB ID: 110312002",
        "Amount": "-54.81",
        "Type": "ACH_DEBIT",
        "Balance": "26573.65",
        "Check or Slip #": "",
        "TransactionId": "0d88d7901404efe270fe5a56aec39c25"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/28/2021",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-66.67",
        "Type": "ACH_DEBIT",
        "Balance": "26628.46",
        "Check or Slip #": "",
        "TransactionId": "a9f35e17c146592b67927d57ff19c930"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/28/2021",
        "Description": "DOMINO'S 1724 515-963-0000 IA                10/27",
        "Amount": "-10.59",
        "Type": "DEBIT_CARD",
        "Balance": "26695.13",
        "Check or Slip #": "",
        "TransactionId": "1ed40f67a802afafd73729128874408c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/27/2021",
        "Description": "CHIPOTLE 2776 ANKENY IA                      10/26",
        "Amount": "-10.87",
        "Type": "DEBIT_CARD",
        "Balance": "26705.72",
        "Check or Slip #": "",
        "TransactionId": "069cdd58748f34a4af23d619e2c80ee8"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/27/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "621.06",
        "Type": "ACH_CREDIT",
        "Balance": "26716.59",
        "Check or Slip #": "",
        "TransactionId": "cded0c26dba766a14afd22af869f01a8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/26/2021",
        "Description": "ALOHANA HAWAIIAN GRILL ANKENY IA             10/25",
        "Amount": "-10.48",
        "Type": "DEBIT_CARD",
        "Balance": "26095.53",
        "Check or Slip #": "",
        "TransactionId": "a8e84102a889e98d248390638bb03747"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/26/2021",
        "Description": "BEN'S BURGERS ANKENY IA                      10/24",
        "Amount": "-12.05",
        "Type": "DEBIT_CARD",
        "Balance": "26106.01",
        "Check or Slip #": "",
        "TransactionId": "d12396543db46f33a9d94a4e969ea48b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2021",
        "Description": "Wal-Mart Super Center ANKENY IA              10/25",
        "Amount": "-39.76",
        "Type": "DEBIT_CARD",
        "Balance": "26118.06",
        "Check or Slip #": "",
        "TransactionId": "57d28d0125d3cb3b39d2861821a6d17e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/24",
        "Amount": "-1.62",
        "Type": "DEBIT_CARD",
        "Balance": "26157.82",
        "Check or Slip #": "",
        "TransactionId": "acb1af486b30aad0766404523629359d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/24",
        "Amount": "-5.48",
        "Type": "DEBIT_CARD",
        "Balance": "26159.44",
        "Check or Slip #": "",
        "TransactionId": "096e91cc44c3b9fd23645868b75b8578"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/24",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "26164.92",
        "Check or Slip #": "",
        "TransactionId": "f2cbc2af371cfafad9215f907ab05e5f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/23",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "26166.42",
        "Check or Slip #": "",
        "TransactionId": "c0dbee0522298507c2e9a56edc16f620"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2021",
        "Description": "CHICK-FIL-A #03303 ANKENY IA                 10/23",
        "Amount": "-8.58",
        "Type": "DEBIT_CARD",
        "Balance": "26167.42",
        "Check or Slip #": "",
        "TransactionId": "03e585cd1dbff8dde54a5d504a0e87ce"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2021",
        "Description": "CASEYS GEN STORE 2689 ANKENY IA              10/23",
        "Amount": "-33.37",
        "Type": "DEBIT_CARD",
        "Balance": "26176",
        "Check or Slip #": "",
        "TransactionId": "a41993e84edda078bdd9b1c9285f5b0b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/23",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "26209.37",
        "Check or Slip #": "",
        "TransactionId": "2de4d1689b5ddf9451b350617f003084"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2021",
        "Description": "Subway 7746 Ankeny IA                        10/22",
        "Amount": "-9.32",
        "Type": "DEBIT_CARD",
        "Balance": "26211.37",
        "Check or Slip #": "",
        "TransactionId": "34e68357015909b724c9bf53d48be98b"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/22/2021",
        "Description": "Offer: Pizza Ranch",
        "Amount": "2.54",
        "Type": "MISC_CREDIT",
        "Balance": "26220.69",
        "Check or Slip #": "",
        "TransactionId": "ccbd38dd65bb86b7d7c77ae11c93a38b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/21/2021",
        "Description": "QT 514 ANKENY IA                             10/19",
        "Amount": "-1.47",
        "Type": "DEBIT_CARD",
        "Balance": "26218.15",
        "Check or Slip #": "",
        "TransactionId": "c29a4343871d7d36f403fd8996e840d6"
    },
    {
        "Details": "DSLIP",
        "Posting Date": "10/21/2021",
        "Description": "REMOTE ONLINE DEPOSIT #          1",
        "Amount": "200",
        "Type": "CHECK_DEPOSIT",
        "Balance": "26219.62",
        "Check or Slip #": "1",
        "TransactionId": "2725240def14f80c38bd35f56d116f13"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/20/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/19",
        "Amount": "-9",
        "Type": "DEBIT_CARD",
        "Balance": "26019.62",
        "Check or Slip #": "",
        "TransactionId": "b99dcd7ccd43f79c1c59643fe949f532"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/20/2021",
        "Description": "MCDONALD'S F35350 ANKENY IA                  10/19",
        "Amount": "-4.23",
        "Type": "DEBIT_CARD",
        "Balance": "26028.62",
        "Check or Slip #": "",
        "TransactionId": "d8b5f151f84f802a758e35f9e3330963"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/20/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "622.68",
        "Type": "ACH_CREDIT",
        "Balance": "26032.85",
        "Check or Slip #": "",
        "TransactionId": "e7a958580bf0b131880b39cb00173e6c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/19/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/18",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "25410.17",
        "Check or Slip #": "",
        "TransactionId": "9dd960edc48dc96644efad28a9ca35e8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/19/2021",
        "Description": "ANKENY PIZZA RANCH ANKENY IA                 10/18",
        "Amount": "-25.42",
        "Type": "DEBIT_CARD",
        "Balance": "25415.47",
        "Check or Slip #": "",
        "TransactionId": "2a1788ea9c816924bba57c39f223cf1b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/18/2021",
        "Description": "WAL-MART #0892 ANKENY IA                     10/18",
        "Amount": "-15.9",
        "Type": "DEBIT_CARD",
        "Balance": "25440.89",
        "Check or Slip #": "",
        "TransactionId": "bc6884d87e3e45ae11ebe41087cd65a1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/18/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/17",
        "Amount": "-1.63",
        "Type": "DEBIT_CARD",
        "Balance": "25456.79",
        "Check or Slip #": "",
        "TransactionId": "76ee8add3760804ffbea651518392274"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/18/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/17",
        "Amount": "-1.3",
        "Type": "DEBIT_CARD",
        "Balance": "25458.42",
        "Check or Slip #": "",
        "TransactionId": "722774a24a0fb612de9938945835988e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2021",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 10/14",
        "Amount": "-27.88",
        "Type": "DEBIT_CARD",
        "Balance": "25459.72",
        "Check or Slip #": "",
        "TransactionId": "0caca9a7fe4a8c27f33f8597f74be461"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2021",
        "Description": "DAIRY QUEEN #13726 ANKENY IA                 10/14",
        "Amount": "-6.55",
        "Type": "DEBIT_CARD",
        "Balance": "25487.6",
        "Check or Slip #": "",
        "TransactionId": "1e73d7442f5ab43dc0c1b8bd595722ac"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/14",
        "Amount": "-5.15",
        "Type": "DEBIT_CARD",
        "Balance": "25494.15",
        "Check or Slip #": "",
        "TransactionId": "96c92a23d34f2297d4c192f8dc3a5c3c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2021",
        "Description": "CASEYS GEN STORE 1938 ALTOONA IA             10/13",
        "Amount": "-29.3",
        "Type": "DEBIT_CARD",
        "Balance": "25499.3",
        "Check or Slip #": "",
        "TransactionId": "f52959979d10e465252bde61d6a7dc67"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/15/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "695.37",
        "Type": "ACH_CREDIT",
        "Balance": "25528.6",
        "Check or Slip #": "",
        "TransactionId": "1166ff40eba7d0ea5e7e88945e753ddd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/14/2021",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 10/13",
        "Amount": "-9.33",
        "Type": "DEBIT_CARD",
        "Balance": "24833.23",
        "Check or Slip #": "",
        "TransactionId": "8b9986eb66df41c7bb015212f951370a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/14/2021",
        "Description": "HUHOT MONGOLIAN GRILL 7 ANKENY IA            10/13",
        "Amount": "-14.65",
        "Type": "DEBIT_CARD",
        "Balance": "24842.56",
        "Check or Slip #": "",
        "TransactionId": "32ac629215d99ea6f0e0d3a6bdbcd6c8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/13/2021",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      448072  10/13",
        "Amount": "-1.26",
        "Type": "DEBIT_CARD",
        "Balance": "24857.21",
        "Check or Slip #": "",
        "TransactionId": "feaf6f74ecbf17762d3be1c8f3371b4c"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/13/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "641.09",
        "Type": "ACH_CREDIT",
        "Balance": "24858.47",
        "Check or Slip #": "",
        "TransactionId": "15b6f0351dc63e22504c12bf2993c977"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/11",
        "Amount": "-6.6",
        "Type": "DEBIT_CARD",
        "Balance": "24217.38",
        "Check or Slip #": "",
        "TransactionId": "5571a952fe25e473514b61ce13355ade"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/11",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "24223.98",
        "Check or Slip #": "",
        "TransactionId": "6d018c2c1904bda5e7a1059ee7b36bb9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/10",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "24224.98",
        "Check or Slip #": "",
        "TransactionId": "de9a449f03f1d6b10a0bec44dbf4aa49"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/10",
        "Amount": "-5.74",
        "Type": "DEBIT_CARD",
        "Balance": "24225.98",
        "Check or Slip #": "",
        "TransactionId": "a059ed2d8574453c46c0b87f5c736abf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/10",
        "Amount": "-1.2",
        "Type": "DEBIT_CARD",
        "Balance": "24231.72",
        "Check or Slip #": "",
        "TransactionId": "ea624a5ae30cd4359058ce55d31ccd74"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/12/2021",
        "Description": "ZIGGIS COFFEE - ANKENY ANKENY IA             10/09",
        "Amount": "-10.59",
        "Type": "DEBIT_CARD",
        "Balance": "24232.92",
        "Check or Slip #": "",
        "TransactionId": "d9fdab6025c6a41ad795cc186d23beda"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/12/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     10/08",
        "Amount": "-7.2",
        "Type": "DEBIT_CARD",
        "Balance": "24243.51",
        "Check or Slip #": "",
        "TransactionId": "aaa76c1e7a7bc7df400c5bcc13746256"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/12/2021",
        "Description": "MCDONALD'S F35350 ANKENY IA                  10/08",
        "Amount": "-4.11",
        "Type": "DEBIT_CARD",
        "Balance": "24250.71",
        "Check or Slip #": "",
        "TransactionId": "bd89d878f1212130e2ae85bf5b831447"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/08/2021",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 10/07",
        "Amount": "-25.82",
        "Type": "DEBIT_CARD",
        "Balance": "24254.82",
        "Check or Slip #": "",
        "TransactionId": "fc2e0ffb3701412436f8e980aaa2f394"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/08/2021",
        "Description": "FAZOLIS_5913 ANKENY IA                       10/07",
        "Amount": "-6.88",
        "Type": "DEBIT_CARD",
        "Balance": "24280.64",
        "Check or Slip #": "",
        "TransactionId": "c6f22c4e87257a505355e95d237d3717"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2021",
        "Description": "AUTOZONE  3945 713 N A ANKENY IA     156600  10/07",
        "Amount": "-7.41",
        "Type": "DEBIT_CARD",
        "Balance": "24287.52",
        "Check or Slip #": "",
        "TransactionId": "63dc1664f4069df934225d737c4c2e00"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2021",
        "Description": "HUMMUS MEDITERRANEAN GR WDM IA               10/06",
        "Amount": "-11.71",
        "Type": "DEBIT_CARD",
        "Balance": "24294.93",
        "Check or Slip #": "",
        "TransactionId": "7f63f71f7218e50f0fe407361d79307e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2021",
        "Description": "PERFORMANCE AUTO NORWALK IA                  10/06",
        "Amount": "-200",
        "Type": "DEBIT_CARD",
        "Balance": "24306.64",
        "Check or Slip #": "",
        "TransactionId": "f49c52beade4b2b9d5a12de3474f3082"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/06/2021",
        "Description": "STAPLES 0808 ANKENY IA               412533  10/06",
        "Amount": "-2.64",
        "Type": "DEBIT_CARD",
        "Balance": "24506.64",
        "Check or Slip #": "",
        "TransactionId": "3eaae9b1d21615b25f3f28e40f52b4fd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/06/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/06",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "24509.28",
        "Check or Slip #": "",
        "TransactionId": "6ae26fc52737fefc3ef3d0b80875d496"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/06/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "695.1",
        "Type": "ACH_CREDIT",
        "Balance": "24513.28",
        "Check or Slip #": "",
        "TransactionId": "8b0f6f54325755f7db34f6e267c1c5ca"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/05/2021",
        "Description": "QT 514 ANKENY IA                             10/04",
        "Amount": "-1.69",
        "Type": "DEBIT_CARD",
        "Balance": "23818.18",
        "Check or Slip #": "",
        "TransactionId": "76f8d31c3e52a030fa01e925e1a046cc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/05/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/04",
        "Amount": "-9",
        "Type": "DEBIT_CARD",
        "Balance": "23819.87",
        "Check or Slip #": "",
        "TransactionId": "1955f405dabf6c980c81ad5cb6ad937e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/04/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/04",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "23828.87",
        "Check or Slip #": "",
        "TransactionId": "6cd2e75cd73d25a73f405b3d66d26054"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/04/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/03",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "23829.87",
        "Check or Slip #": "",
        "TransactionId": "57b629374e9e81cca50ceaeb98ca675f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/04/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/02",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "23835.87",
        "Check or Slip #": "",
        "TransactionId": "eba6f1f12a45856c2c8debdb173eecaa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/04/2021",
        "Description": "HY-VEE GAS ANKENY 5022 ANKENY IA             10/02",
        "Amount": "-25.96",
        "Type": "DEBIT_CARD",
        "Balance": "23837.87",
        "Check or Slip #": "",
        "TransactionId": "cb64a9a568a612c941ab31f8a0c79dc1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/04/2021",
        "Description": "MIDAMERICAN      ENERGY     0115123306W170  WEB ID: 4421425214",
        "Amount": "-40",
        "Type": "ACH_DEBIT",
        "Balance": "23863.83",
        "Check or Slip #": "",
        "TransactionId": "53a51500e4c78b40d392368323fbd7c3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/04/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/01",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "23903.83",
        "Check or Slip #": "",
        "TransactionId": "b724caf4beea8be5dde56adf47c578ff"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/30/2021",
        "Description": "STAPLES 0808 ANKENY IA               305575  09/30",
        "Amount": "-5.49",
        "Type": "DEBIT_CARD",
        "Balance": "23909.13",
        "Check or Slip #": "",
        "TransactionId": "e5d65528f5d06bff1b2386297bacb8cf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/30/2021",
        "Description": "KUM&GO 0535 DES MOIN DES MOINES IA   832647  09/30",
        "Amount": "-1.59",
        "Type": "DEBIT_CARD",
        "Balance": "23914.62",
        "Check or Slip #": "",
        "TransactionId": "f6e7e19192f47cbbb4a287eae3357bdb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/30/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/29",
        "Amount": "-4.5",
        "Type": "DEBIT_CARD",
        "Balance": "23916.21",
        "Check or Slip #": "",
        "TransactionId": "af308aa574f6055bcaabb1abfc15f3f2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/29/2021",
        "Description": "WAL-MART #0892 ANKENY IA                     09/29",
        "Amount": "-52.72",
        "Type": "DEBIT_CARD",
        "Balance": "23920.71",
        "Check or Slip #": "",
        "TransactionId": "a24764b110e14c3a0626149682b13f82"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/29/2021",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             09/29",
        "Amount": "-11.7",
        "Type": "DEBIT_CARD",
        "Balance": "23973.43",
        "Check or Slip #": "",
        "TransactionId": "420c825fadda10268f602ffb12c5600e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/29/2021",
        "Description": "WEBULL FINANCIAL ACH        20210928236780  WEB ID: 2561673990",
        "Amount": "-500",
        "Type": "ACH_DEBIT",
        "Balance": "23985.13",
        "Check or Slip #": "",
        "TransactionId": "065774bbb4c05e24b15212050cf12723"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/29/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     09/28",
        "Amount": "-9.21",
        "Type": "DEBIT_CARD",
        "Balance": "24485.13",
        "Check or Slip #": "",
        "TransactionId": "38c44f52a195219c57725bc194636935"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/29/2021",
        "Description": "HICKORY PARK RESTAURANT AMES IA              09/28",
        "Amount": "-17.5",
        "Type": "DEBIT_CARD",
        "Balance": "24494.34",
        "Check or Slip #": "",
        "TransactionId": "5c098c39da98893d3c98d893d3e1b1b1"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/29/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "596.03",
        "Type": "ACH_CREDIT",
        "Balance": "24511.84",
        "Check or Slip #": "",
        "TransactionId": "75b0584c271e26bbb6572e6f72f3d723"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/28",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "23915.81",
        "Check or Slip #": "",
        "TransactionId": "528d02013ddbc3906163efdd86e03b4c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2021",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-66.67",
        "Type": "ACH_DEBIT",
        "Balance": "23918.81",
        "Check or Slip #": "",
        "TransactionId": "dc261b115918de9995f8bbc091041baa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2021",
        "Description": "JENSENBRICKHOUSE WEB PMTS   ZP4BF8          WEB ID: 9000615921",
        "Amount": "-875",
        "Type": "ACH_DEBIT",
        "Balance": "23985.48",
        "Check or Slip #": "",
        "TransactionId": "65511605d86acd9e8e05b9d67f87519e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2021",
        "Description": "City of Ankeny U PAYMENT    999000000408112 WEB ID: 110312002",
        "Amount": "-44.79",
        "Type": "ACH_DEBIT",
        "Balance": "24860.48",
        "Check or Slip #": "",
        "TransactionId": "a5b56acdd746deaaf95dc67c874be1d1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/27",
        "Amount": "-8",
        "Type": "DEBIT_CARD",
        "Balance": "24905.27",
        "Check or Slip #": "",
        "TransactionId": "976a35f46025bb2fd4f9b75fb4904e8f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/27",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "24913.27",
        "Check or Slip #": "",
        "TransactionId": "936ca4c4f64d1c11d836fbea0e074957"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/27",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "24914.27",
        "Check or Slip #": "",
        "TransactionId": "194b2c21a85809a15a3dcaf008dcb65a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2021",
        "Description": "ROSS STORES #2113 WEST DES MOIN IA           09/27",
        "Amount": "-13.9",
        "Type": "DEBIT_CARD",
        "Balance": "24926.27",
        "Check or Slip #": "",
        "TransactionId": "3b08965a7563fed7c390c4619a6229f2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2021",
        "Description": "HY-VEE GAS ANKENY 5022 ANKENY IA             09/27",
        "Amount": "-21.13",
        "Type": "DEBIT_CARD",
        "Balance": "24940.17",
        "Check or Slip #": "",
        "TransactionId": "ec3d6d2125266e5bf65ab6039d6de741"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/27/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 09/25",
        "Amount": "-12.43",
        "Type": "DEBIT_CARD",
        "Balance": "24961.3",
        "Check or Slip #": "",
        "TransactionId": "65af66d59c229c60952dc83fb2cf45c9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/24/2021",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 09/23",
        "Amount": "-29.98",
        "Type": "DEBIT_CARD",
        "Balance": "24973.73",
        "Check or Slip #": "",
        "TransactionId": "1372199351749ebaa452301ad0014a25"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/24/2021",
        "Description": "B BOPS ANKENY ANKENY IA                      09/23",
        "Amount": "-9.61",
        "Type": "DEBIT_CARD",
        "Balance": "25003.71",
        "Check or Slip #": "",
        "TransactionId": "4c23ed1a604b611fc1719b4c45833049"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/23/2021",
        "Description": "KFC G160019 ANKENY IA                        09/22",
        "Amount": "-6.35",
        "Type": "DEBIT_CARD",
        "Balance": "25013.32",
        "Check or Slip #": "",
        "TransactionId": "992de7033d7c2028cc381f5097942460"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/23/2021",
        "Description": "MCDONALD'S F35350 ANKENY IA                  09/22",
        "Amount": "-4.85",
        "Type": "DEBIT_CARD",
        "Balance": "25019.67",
        "Check or Slip #": "",
        "TransactionId": "88927b210ea45ee0d3d9e24bc6b70255"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/23/2021",
        "Description": "ROSS STORES #2031 DES MOINES IA              09/22",
        "Amount": "16.04",
        "Type": "DEBIT_CARD",
        "Balance": "25024.52",
        "Check or Slip #": "",
        "TransactionId": "a7da7fa8f2bd9b6a0f8ae03cbaa664b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/22/2021",
        "Description": "WAL-MART #0892 ANKENY IA                     09/22",
        "Amount": "-12.18",
        "Type": "DEBIT_CARD",
        "Balance": "25008.48",
        "Check or Slip #": "",
        "TransactionId": "1ddc69fd46045ec47bfa97e345d89967"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/22/2021",
        "Description": "WAL-MART #0892 ANKENY IA                     09/22",
        "Amount": "-54.81",
        "Type": "DEBIT_CARD",
        "Balance": "25020.66",
        "Check or Slip #": "",
        "TransactionId": "bd0fe22924505e8c105fcdce1eb5244b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/22/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/21",
        "Amount": "-9",
        "Type": "DEBIT_CARD",
        "Balance": "25075.47",
        "Check or Slip #": "",
        "TransactionId": "379ef94d6756a5af3e2db58e33f24220"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/22/2021",
        "Description": "FAZOLIS_5921 DES MOINES IA                   09/21",
        "Amount": "-6.94",
        "Type": "DEBIT_CARD",
        "Balance": "25084.47",
        "Check or Slip #": "",
        "TransactionId": "06ca2b20040d4f83d1a3892dba79484e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/22/2021",
        "Description": "HY-VEE ALTOONA F&F 7505 ALTOONA IA           09/21",
        "Amount": "-24.53",
        "Type": "DEBIT_CARD",
        "Balance": "25091.41",
        "Check or Slip #": "",
        "TransactionId": "9a97c53201d24b5353cd30c117528111"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/22/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "663.05",
        "Type": "ACH_CREDIT",
        "Balance": "25115.94",
        "Check or Slip #": "",
        "TransactionId": "164e7756fa018716fc71b2d1be475bfe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/21/2021",
        "Description": "MCDONALD'S F35350 ANKENY IA                  09/20",
        "Amount": "-5.08",
        "Type": "DEBIT_CARD",
        "Balance": "24452.89",
        "Check or Slip #": "",
        "TransactionId": "20dba30cb12d132c70fad5ee7439fc75"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/21/2021",
        "Description": "TARGET        00017673 ANKENY IA             09/20",
        "Amount": "-5.29",
        "Type": "DEBIT_CARD",
        "Balance": "24457.97",
        "Check or Slip #": "",
        "TransactionId": "5bdc87e3d1e7a16c27ebff446cdf3c53"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/21/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     09/20",
        "Amount": "-9.21",
        "Type": "DEBIT_CARD",
        "Balance": "24463.26",
        "Check or Slip #": "",
        "TransactionId": "4f9b412fd772a2ec86e0ddb92c2e5a70"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/20/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/18",
        "Amount": "-4.44",
        "Type": "DEBIT_CARD",
        "Balance": "24472.47",
        "Check or Slip #": "",
        "TransactionId": "9f0de7bc8ed32aca23e5aff838592c24"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/20/2021",
        "Description": "BURGER KING #10435 ANKENY IA                 09/16",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "24476.91",
        "Check or Slip #": "",
        "TransactionId": "b8115a41cd7aed1b9a5d37007131f68e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2021",
        "Description": "HY-VEE ANKENY 1022 ANKENY IA                 09/16",
        "Amount": "-15.19",
        "Type": "DEBIT_CARD",
        "Balance": "24482.21",
        "Check or Slip #": "",
        "TransactionId": "acbd42c74b46cf4d46d017159f7355b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2021",
        "Description": "Nike Altoona Altoona IA                      09/16",
        "Amount": "-320.85",
        "Type": "DEBIT_CARD",
        "Balance": "24497.4",
        "Check or Slip #": "",
        "TransactionId": "e2a8b2d7da7a93f78ee7447b02453ce6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2021",
        "Description": "MCDONALD'S F35350 ANKENY IA                  09/16",
        "Amount": "-3.16",
        "Type": "DEBIT_CARD",
        "Balance": "24818.25",
        "Check or Slip #": "",
        "TransactionId": "99869e5cc590b10db074a66f74ff00ef"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/16/2021",
        "Description": "Wal-Mart Super Center ANKENY IA              09/16",
        "Amount": "-21.18",
        "Type": "DEBIT_CARD",
        "Balance": "24821.41",
        "Check or Slip #": "",
        "TransactionId": "00e4fe2e2529699cd508a73ae89fc55e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/16/2021",
        "Description": "HARDEES 1505741 DES MOINES IA                09/15",
        "Amount": "-5.87",
        "Type": "DEBIT_CARD",
        "Balance": "24842.59",
        "Check or Slip #": "",
        "TransactionId": "720e41bb1119ea78930b814b28dda7ea"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/16/2021",
        "Description": "ROSS STORES #2031 DES MOINES IA              09/15",
        "Amount": "-16.04",
        "Type": "DEBIT_CARD",
        "Balance": "24848.46",
        "Check or Slip #": "",
        "TransactionId": "1add38ed06edcc3106a19a81f932011f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/16/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 09/15",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "24864.5",
        "Check or Slip #": "",
        "TransactionId": "c04e82164753502ab1791e02cb738050"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/15/2021",
        "Description": "QT 515 DES MOINES IA                         09/14",
        "Amount": "-1.49",
        "Type": "DEBIT_CARD",
        "Balance": "24868.92",
        "Check or Slip #": "",
        "TransactionId": "3aed3762e8a89d27d9bbf5b6153e9754"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/15/2021",
        "Description": "ARBYS 5944 DES MOINES IA                     09/14",
        "Amount": "-6.42",
        "Type": "DEBIT_CARD",
        "Balance": "24870.41",
        "Check or Slip #": "",
        "TransactionId": "80561bb6d1ce3c5e2d30e364ef86a308"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/15/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "687.2",
        "Type": "ACH_CREDIT",
        "Balance": "24876.83",
        "Check or Slip #": "",
        "TransactionId": "2659b32b46b356dc4f27ec321b1a5122"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/14/2021",
        "Description": "MCDONALD'S F3207 ANKENY IA                   09/13",
        "Amount": "-5.81",
        "Type": "DEBIT_CARD",
        "Balance": "24189.63",
        "Check or Slip #": "",
        "TransactionId": "7f69cd44cb648fcb2b7a65f3ef389cdc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/13/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/11",
        "Amount": "-1.64",
        "Type": "DEBIT_CARD",
        "Balance": "24195.44",
        "Check or Slip #": "",
        "TransactionId": "21c668968372f1f7f4425f37d1c09946"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/13/2021",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      409828  09/11",
        "Amount": "-22.13",
        "Type": "DEBIT_CARD",
        "Balance": "24197.08",
        "Check or Slip #": "",
        "TransactionId": "e7eee0fd29c6edc5573acbcc119bad3b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/13/2021",
        "Description": "CHIPOTLE 2776 ANKENY IA                      09/11",
        "Amount": "-8.22",
        "Type": "DEBIT_CARD",
        "Balance": "24219.21",
        "Check or Slip #": "",
        "TransactionId": "d05ae55c11231aa0ef8a2530ba5aa83b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/10/2021",
        "Description": "ARBYS 5722 ANKENY IA                         09/09",
        "Amount": "-6.36",
        "Type": "DEBIT_CARD",
        "Balance": "24227.43",
        "Check or Slip #": "",
        "TransactionId": "ed7ad65ed5656d99e26aa382b252238c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/09/2021",
        "Description": "Wal-Mart Super Center ANKENY IA              09/09",
        "Amount": "-2.1",
        "Type": "DEBIT_CARD",
        "Balance": "24233.79",
        "Check or Slip #": "",
        "TransactionId": "9caae3e06bd1bab6a0be03b194cc61f2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/09/2021",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             09/09",
        "Amount": "-49.59",
        "Type": "DEBIT_CARD",
        "Balance": "24235.89",
        "Check or Slip #": "",
        "TransactionId": "4a4b438598106c24bb1ac1892f726227"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/09/2021",
        "Description": "SQ *OVER THE TOP ICE Pleasant Hill IA        09/08",
        "Amount": "-11.81",
        "Type": "DEBIT_CARD",
        "Balance": "24285.48",
        "Check or Slip #": "",
        "TransactionId": "4b6c59b223c896fc8355654e3db42cd1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/08/2021",
        "Description": "KWIK STAR 932 ALTOONA IA             830819  09/08",
        "Amount": "-2.87",
        "Type": "DEBIT_CARD",
        "Balance": "24297.29",
        "Check or Slip #": "",
        "TransactionId": "41d7a7cde650b66c12d65e5d2fe6997c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/08/2021",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            09/07",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "24300.16",
        "Check or Slip #": "",
        "TransactionId": "b46b7f4fe2276ded0149a926aea887aa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/08/2021",
        "Description": "MCDONALD'S F35350 ANKENY IA                  09/07",
        "Amount": "-5.07",
        "Type": "DEBIT_CARD",
        "Balance": "24355.16",
        "Check or Slip #": "",
        "TransactionId": "221b0db3b69b52e9d62718bd28658e1f"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/08/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "657.35",
        "Type": "ACH_CREDIT",
        "Balance": "24360.23",
        "Check or Slip #": "",
        "TransactionId": "af44804a2c052669e330bfbf4619be01"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     411829  09/06",
        "Amount": "-3.63",
        "Type": "DEBIT_CARD",
        "Balance": "23702.88",
        "Check or Slip #": "",
        "TransactionId": "958ea59fede036638e60502e38bcc886"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     410521  09/06",
        "Amount": "-41.16",
        "Type": "DEBIT_CARD",
        "Balance": "23706.51",
        "Check or Slip #": "",
        "TransactionId": "568d5a5d5341a4c1cdae5e50f3f63e0f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2021",
        "Description": "FUZZYS TACO SHOP - ANKE ANKENY IA            09/06",
        "Amount": "-10.58",
        "Type": "DEBIT_CARD",
        "Balance": "23747.67",
        "Check or Slip #": "",
        "TransactionId": "e059667fb92021e28ba0393c55d81a1b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/05",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "23758.25",
        "Check or Slip #": "",
        "TransactionId": "322d877163a63145f4916fc51298442f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 09/04",
        "Amount": "-3.87",
        "Type": "DEBIT_CARD",
        "Balance": "23759.25",
        "Check or Slip #": "",
        "TransactionId": "a617e220140a9d85babab26a94c36fa4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/03",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "23763.12",
        "Check or Slip #": "",
        "TransactionId": "555bfd7361da18a409b800b25079a9bb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2021",
        "Description": "HY-VEE GAS ANKENY 5022 ANKENY IA             09/03",
        "Amount": "-24.53",
        "Type": "DEBIT_CARD",
        "Balance": "23764.12",
        "Check or Slip #": "",
        "TransactionId": "9a519c181ca9ca0c714762e40c5edd28"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/03",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "23788.65",
        "Check or Slip #": "",
        "TransactionId": "4fc2db0190f9016b01ecf466d1555a98"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2021",
        "Description": "THE OPERATING ROOM - AN ANKENY IA            09/01",
        "Amount": "-40",
        "Type": "DEBIT_CARD",
        "Balance": "23800.65",
        "Check or Slip #": "",
        "TransactionId": "63ffad42cdad44d11c59e90a5017d88c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/03/2021",
        "Description": "HY-VEE ALTOONA 1 100 8 ALTOONA IA    129074  09/03",
        "Amount": "-5.58",
        "Type": "DEBIT_CARD",
        "Balance": "23840.65",
        "Check or Slip #": "",
        "TransactionId": "38b5c2b34c0008bd27a7202ea2a41538"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/03/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     429817  09/03",
        "Amount": "-33.69",
        "Type": "DEBIT_CARD",
        "Balance": "23846.23",
        "Check or Slip #": "",
        "TransactionId": "4f10bd255e5acb8479296f8b57b06cb7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/03/2021",
        "Description": "ARBYS 7146 ALTOONA IA                        09/02",
        "Amount": "-9.51",
        "Type": "DEBIT_CARD",
        "Balance": "23879.92",
        "Check or Slip #": "",
        "TransactionId": "9f70f06b9835320bad5ede3e9651ba62"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2021",
        "Description": "WM SUPERC Wal-Mart Sup ALTOONA IA            09/02",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "23889.43",
        "Check or Slip #": "",
        "TransactionId": "dab540a9e02ba9e5206b075593867f36"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2021",
        "Description": "MIDAMERICAN      ENERGY     0115123306W149  WEB ID: 4421425214",
        "Amount": "-40",
        "Type": "ACH_DEBIT",
        "Balance": "23890.43",
        "Check or Slip #": "",
        "TransactionId": "5c2931df33bba59788790f4b4aeb6db8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/01",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "23930.43",
        "Check or Slip #": "",
        "TransactionId": "3793f3414b7b8b91cc83a71a337fc2b0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/01",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "23931.43",
        "Check or Slip #": "",
        "TransactionId": "5915c7861a489133ff981b9194fed0fd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 09/01",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "23933.43",
        "Check or Slip #": "",
        "TransactionId": "9bb35d564ffff06fb8c4b53e463995d1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/01",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "23937.85",
        "Check or Slip #": "",
        "TransactionId": "253463aa3febabb9708a29b7c2b5774f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/01/2021",
        "Description": "SQ *OVER THE TOP ICE Pleasant Hill IA        08/31",
        "Amount": "-7.75",
        "Type": "DEBIT_CARD",
        "Balance": "23939.85",
        "Check or Slip #": "",
        "TransactionId": "7542fa88cded8f6e18eac5039fae0ea5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/01/2021",
        "Description": "CULVERS OF ALTOONA ALTOONA IA                08/31",
        "Amount": "-17.09",
        "Type": "DEBIT_CARD",
        "Balance": "23947.6",
        "Check or Slip #": "",
        "TransactionId": "0b91639ef7879ddeef32d57963c8fb23"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/01/2021",
        "Description": "WENDY'S 8654 ANKENY IA                       08/31",
        "Amount": "-7.09",
        "Type": "DEBIT_CARD",
        "Balance": "23964.69",
        "Check or Slip #": "",
        "TransactionId": "82fc36f465c8b9ed13f55c1936cce308"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/01/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "648.8",
        "Type": "ACH_CREDIT",
        "Balance": "23971.78",
        "Check or Slip #": "",
        "TransactionId": "c7836e01e584178316c438c9a3fafb3e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2021",
        "Description": "JENSENBRICKHOUSE WEB PMTS   PBB688          WEB ID: 9000615921",
        "Amount": "-875",
        "Type": "ACH_DEBIT",
        "Balance": "23322.98",
        "Check or Slip #": "",
        "TransactionId": "0b9219d4e02b3873d5561d74eecf3bb7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2021",
        "Description": "City of Ankeny U PAYMENT    999000000388362 WEB ID: 110312002",
        "Amount": "-43.53",
        "Type": "ACH_DEBIT",
        "Balance": "24197.98",
        "Check or Slip #": "",
        "TransactionId": "11a7a14bc988ee33d604a191265d0ba2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2021",
        "Description": "MCDONALD'S F35350 ANKENY IA                  08/30",
        "Amount": "-6.03",
        "Type": "DEBIT_CARD",
        "Balance": "24241.51",
        "Check or Slip #": "",
        "TransactionId": "84ba76d7c34a5a873e81714e858aa09e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 08/30",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "24247.54",
        "Check or Slip #": "",
        "TransactionId": "76447f9ec8d5c8762a2e6286fdb17932"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2021",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-66.67",
        "Type": "ACH_DEBIT",
        "Balance": "24251.96",
        "Check or Slip #": "",
        "TransactionId": "49648ef4aa8509006c97bd8169da8a77"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/30",
        "Amount": "-1.59",
        "Type": "DEBIT_CARD",
        "Balance": "24318.63",
        "Check or Slip #": "",
        "TransactionId": "bb5f32f072222deb48624d546f105147"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2021",
        "Description": "TARGET        00017673 ANKENY IA             08/29",
        "Amount": "-9.01",
        "Type": "DEBIT_CARD",
        "Balance": "24320.22",
        "Check or Slip #": "",
        "TransactionId": "2f82aef6556c99e8a420545e9f0feb3c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     08/29",
        "Amount": "-9.53",
        "Type": "DEBIT_CARD",
        "Balance": "24329.23",
        "Check or Slip #": "",
        "TransactionId": "2c0f4d6db25a1f4d01f0695ea50277fe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/29",
        "Amount": "-3.2",
        "Type": "DEBIT_CARD",
        "Balance": "24338.76",
        "Check or Slip #": "",
        "TransactionId": "5e5fc9d48f9cc5cf313289baddb22740"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/28",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "24341.96",
        "Check or Slip #": "",
        "TransactionId": "a899ec0fea9ea71e51da381b6c29f5f0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2021",
        "Description": "CAPITAL ONE      MOBILE PMT 3GID9EF2TDORM2L WEB ID: 9279744980",
        "Amount": "-36.74",
        "Type": "ACH_DEBIT",
        "Balance": "24344.96",
        "Check or Slip #": "",
        "TransactionId": "d7dd1651d4d43405653b6bd023afc23e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/28",
        "Amount": "-2.3",
        "Type": "DEBIT_CARD",
        "Balance": "24381.7",
        "Check or Slip #": "",
        "TransactionId": "07954d8820d464ad1b2cc3382f2085db"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2021",
        "Description": "TACO BELL #31268 ANKENY IA                   08/27",
        "Amount": "-5.41",
        "Type": "DEBIT_CARD",
        "Balance": "24384",
        "Check or Slip #": "",
        "TransactionId": "54140ada9101c07c1f5f5da6e71a5ffa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/27/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 08/26",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "24389.41",
        "Check or Slip #": "",
        "TransactionId": "5ad26aa12e33025d1bd5de4dd7589ea4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/25/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     08/24",
        "Amount": "-9.53",
        "Type": "DEBIT_CARD",
        "Balance": "24393.83",
        "Check or Slip #": "",
        "TransactionId": "549f35506d7016dc08d453ce9673a7d1"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/25/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "629.93",
        "Type": "ACH_CREDIT",
        "Balance": "24403.36",
        "Check or Slip #": "",
        "TransactionId": "02d5eb7c43dbb81798351d576d549585"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/24/2021",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             08/24",
        "Amount": "-9.36",
        "Type": "DEBIT_CARD",
        "Balance": "23773.43",
        "Check or Slip #": "",
        "TransactionId": "f31576d86dbefc5dbe0f81a1fa298916"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/23/2021",
        "Description": "KWIK STAR  10100010165 ANKENY IA             08/22",
        "Amount": "-23.65",
        "Type": "DEBIT_CARD",
        "Balance": "23782.79",
        "Check or Slip #": "",
        "TransactionId": "7330f448a662dfaedd93a263991f2e66"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/23/2021",
        "Description": "HARDEES 1506082 ANKENY IA                    08/20",
        "Amount": "-5.82",
        "Type": "DEBIT_CARD",
        "Balance": "23806.44",
        "Check or Slip #": "",
        "TransactionId": "96529f3584b1e0517633575bf87b2829"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/20/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     004853  08/20",
        "Amount": "-59.94",
        "Type": "DEBIT_CARD",
        "Balance": "23812.26",
        "Check or Slip #": "",
        "TransactionId": "a472bd98cf9e25d7f730d57614364c53"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/20/2021",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            08/19",
        "Amount": "-500",
        "Type": "DEBIT_CARD",
        "Balance": "23872.2",
        "Check or Slip #": "",
        "TransactionId": "f6a2f49bb37c46d8af480dbafde7787e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/20/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 08/19",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "24372.2",
        "Check or Slip #": "",
        "TransactionId": "f457c805fc07baeae39af04334856859"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/18/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/18",
        "Amount": "-49.61",
        "Type": "DEBIT_CARD",
        "Balance": "24376.62",
        "Check or Slip #": "",
        "TransactionId": "bb2915b8de68b4e02c894c8caf85d65b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/18/2021",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            08/18",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "24426.23",
        "Check or Slip #": "",
        "TransactionId": "55863d2642da3089cb13474498ce2093"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/18/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "595.09",
        "Type": "ACH_CREDIT",
        "Balance": "24481.23",
        "Check or Slip #": "",
        "TransactionId": "f83fbb94320203a76505fc11e421fa60"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/17/2021",
        "Description": "WM SUPERC Wal-Mart Sup ALTOONA IA            08/17",
        "Amount": "-4.02",
        "Type": "DEBIT_CARD",
        "Balance": "23886.14",
        "Check or Slip #": "",
        "TransactionId": "22b7a025ea1d58466c41f7495d78659c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/17/2021",
        "Description": "HY-VEE GAS ANKENY 5023 ANKENY IA             08/16",
        "Amount": "-1.06",
        "Type": "DEBIT_CARD",
        "Balance": "23890.16",
        "Check or Slip #": "",
        "TransactionId": "c0ba4a7c8275fa50b5cc55c61c1fc616"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/17/2021",
        "Description": "IHPA CHARITON IA                             08/16",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "23891.22",
        "Check or Slip #": "",
        "TransactionId": "2fccdc83b81abf8dd7ce5953c92eab32"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/16/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/16",
        "Amount": "-1.49",
        "Type": "DEBIT_CARD",
        "Balance": "23897.22",
        "Check or Slip #": "",
        "TransactionId": "2500f12a60ec09cbf5028c5a90343a86"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/16/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/14",
        "Amount": "-6.24",
        "Type": "DEBIT_CARD",
        "Balance": "23898.71",
        "Check or Slip #": "",
        "TransactionId": "cc8fa8c106f7b6c6efff2f308ae408f6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/16/2021",
        "Description": "HY-VEE GAS ALTOO HY VE ALTOONA IA    227764  08/14",
        "Amount": "-30.25",
        "Type": "DEBIT_CARD",
        "Balance": "23904.95",
        "Check or Slip #": "",
        "TransactionId": "5f4b123b97507250d122566e1de360fa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/16/2021",
        "Description": "WAL-MART #2764 ALTOONA IA                    08/14",
        "Amount": "-4.37",
        "Type": "DEBIT_CARD",
        "Balance": "23935.2",
        "Check or Slip #": "",
        "TransactionId": "79775bd9ea51d2df96552c7b13a1de36"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/16/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/14",
        "Amount": "-1.2",
        "Type": "DEBIT_CARD",
        "Balance": "23939.57",
        "Check or Slip #": "",
        "TransactionId": "309facdda3161d50b43b6d71b67c1157"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/16/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/13",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "23940.77",
        "Check or Slip #": "",
        "TransactionId": "02b2c3a4ed863ed3788f26792a8d8e17"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/16/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/13",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "23945.77",
        "Check or Slip #": "",
        "TransactionId": "01527faf26af87f3057239af76522b0d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/13/2021",
        "Description": "TACO BELL #31268 ANKENY IA                   08/12",
        "Amount": "-5.41",
        "Type": "DEBIT_CARD",
        "Balance": "23951.77",
        "Check or Slip #": "",
        "TransactionId": "331bac96afca82ae3ccea23570f622d5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/11",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "23957.18",
        "Check or Slip #": "",
        "TransactionId": "a4b7d4bb53d6e8a4ac5e85c1d0228821"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/11/2021",
        "Description": "WAL-MART #0892 ANKENY IA                     08/11",
        "Amount": "-20.01",
        "Type": "DEBIT_CARD",
        "Balance": "23962.18",
        "Check or Slip #": "",
        "TransactionId": "7311587d8ab6ea71e47fd1fd1707b206"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/11/2021",
        "Description": "GOODWILL IND-JOHNSTON JOHNSTON IA            08/10",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "23982.19",
        "Check or Slip #": "",
        "TransactionId": "290ceef0d4d6b2d5923f7827c6a44891"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/11/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/10",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "23986.19",
        "Check or Slip #": "",
        "TransactionId": "1e764a12dd5b5cd8b708cf8c2bd5e4e1"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/11/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "654.38",
        "Type": "ACH_CREDIT",
        "Balance": "23992.19",
        "Check or Slip #": "",
        "TransactionId": "6b70f1048b4b704f812ae4496bcc7533"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/10/2021",
        "Description": "HY-VEE ANKENY 10 2510 ANKENY IA      063954  08/10",
        "Amount": "-4.83",
        "Type": "DEBIT_CARD",
        "Balance": "23337.81",
        "Check or Slip #": "",
        "TransactionId": "2ca38061e052faf9cd55288d27f83305"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/10/2021",
        "Description": "HY-VEE ANKENY 10 2510 ANKENY IA      034926  08/10",
        "Amount": "-4.5",
        "Type": "DEBIT_CARD",
        "Balance": "23342.64",
        "Check or Slip #": "",
        "TransactionId": "9419e34af7e3684628148525aaa326e6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/10/2021",
        "Description": "CASH APP*LAMAR JACK 8774174551 CA            08/09",
        "Amount": "-40",
        "Type": "DEBIT_CARD",
        "Balance": "23347.14",
        "Check or Slip #": "",
        "TransactionId": "cb867d68905f9b1f9d3ba67ca2871f6d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/10/2021",
        "Description": "ARBYS 5722 ANKENY IA                         08/09",
        "Amount": "-9.53",
        "Type": "DEBIT_CARD",
        "Balance": "23387.14",
        "Check or Slip #": "",
        "TransactionId": "7d40487e74ccbf12c7bb5aed04250bdc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/09/2021",
        "Description": "Wal-Mart Super Center ANKENY IA              08/09",
        "Amount": "-25.9",
        "Type": "DEBIT_CARD",
        "Balance": "23396.67",
        "Check or Slip #": "",
        "TransactionId": "7eb6fab75efabcb3f77bcdbc31943da8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/09/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/09",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "23422.57",
        "Check or Slip #": "",
        "TransactionId": "1259478b839a97238ef319144eb531fc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/09/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/08",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "23423.57",
        "Check or Slip #": "",
        "TransactionId": "9adcdf96fd77e6a4f386ebb7db04ae2e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/09/2021",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      421589  08/07",
        "Amount": "-1.47",
        "Type": "DEBIT_CARD",
        "Balance": "23424.57",
        "Check or Slip #": "",
        "TransactionId": "77eb3d82d9b328604961e7a80edb8bf2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/09/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     08/06",
        "Amount": "-8.25",
        "Type": "DEBIT_CARD",
        "Balance": "23426.04",
        "Check or Slip #": "",
        "TransactionId": "1f3ca80fc544a15f659da56e0f4b251a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/09/2021",
        "Description": "HARDEES 1506082 ANKENY IA                    08/06",
        "Amount": "-5.82",
        "Type": "DEBIT_CARD",
        "Balance": "23434.29",
        "Check or Slip #": "",
        "TransactionId": "b2b05843b842048cc5bdba9a64d284e4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/06/2021",
        "Description": "TJ MAXX # 2010 SE DELA ANKENY IA             08/06",
        "Amount": "-7.41",
        "Type": "DEBIT_CARD",
        "Balance": "23440.11",
        "Check or Slip #": "",
        "TransactionId": "4010ddee3968ae3a244344a35f173604"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/05/2021",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            08/05",
        "Amount": "-200",
        "Type": "DEBIT_CARD",
        "Balance": "23447.52",
        "Check or Slip #": "",
        "TransactionId": "d16025c4a1b8791ea83bad52385a2cbc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/05/2021",
        "Description": "KABAB GRILL RESTAURANT WESTMINSTER CA        08/03",
        "Amount": "-13.04",
        "Type": "DEBIT_CARD",
        "Balance": "23647.52",
        "Check or Slip #": "",
        "TransactionId": "6007ee269b6efad2afdb8f128ea50f37"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/04/2021",
        "Description": "MCDONALD'S F6470 LONG BEACH CA               08/03",
        "Amount": "-2.21",
        "Type": "DEBIT_CARD",
        "Balance": "23660.56",
        "Check or Slip #": "",
        "TransactionId": "5156c57c49002a5e77311b41778b639f"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/04/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "667.72",
        "Type": "ACH_CREDIT",
        "Balance": "23662.77",
        "Check or Slip #": "",
        "TransactionId": "b1930f31856b444ca41f430bba365c3b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/03/2021",
        "Description": "ARCO #42400 AMPM LONG BEACH CA               08/03",
        "Amount": "-51.09",
        "Type": "DEBIT_CARD",
        "Balance": "22995.05",
        "Check or Slip #": "",
        "TransactionId": "064faa88a1581a43c989ffb4f888b926"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/03/2021",
        "Description": "MIDAMERICAN      ENERGY     0115123306W127  WEB ID: 4421425214",
        "Amount": "-40",
        "Type": "ACH_DEBIT",
        "Balance": "23046.14",
        "Check or Slip #": "",
        "TransactionId": "384e698eafe889cc6d62402cb5fc810a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/02/2021",
        "Description": "MCDONALD'S F25973 LONG BEACH CA              08/01",
        "Amount": "-4.27",
        "Type": "DEBIT_CARD",
        "Balance": "23086.14",
        "Check or Slip #": "",
        "TransactionId": "d630238c0c69c8359df9d8ca61a6c5ca"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/02/2021",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            07/31",
        "Amount": "-100",
        "Type": "DEBIT_CARD",
        "Balance": "23090.41",
        "Check or Slip #": "",
        "TransactionId": "ea09ab5a037174338599718ca881bd1f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/30/2021",
        "Description": "CRAVINGS DESSERTS BELLFLOWER CA              07/29",
        "Amount": "-7.76",
        "Type": "DEBIT_CARD",
        "Balance": "23190.41",
        "Check or Slip #": "",
        "TransactionId": "c5c2e82856c2b8b66b15a7c2c95004c7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/30/2021",
        "Description": "NORMS- SOUTH TORRANCE LOMITA CA              07/28",
        "Amount": "-41.79",
        "Type": "DEBIT_CARD",
        "Balance": "23198.17",
        "Check or Slip #": "",
        "TransactionId": "83de384230666147b70b1f51d54800d5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/29/2021",
        "Description": "ANAHEIM ACE HARDWARE LONG BEACH CA           07/28",
        "Amount": "-4.39",
        "Type": "DEBIT_CARD",
        "Balance": "23239.96",
        "Check or Slip #": "",
        "TransactionId": "55a3daab38c2dcbcaf81f03fd505ba5a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/29/2021",
        "Description": "FRIEDRICHS DES MOINES IA                     07/27",
        "Amount": "-5.98",
        "Type": "DEBIT_CARD",
        "Balance": "23244.35",
        "Check or Slip #": "",
        "TransactionId": "15d0d7c407ba2cad609d238f1be62667"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/28/2021",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-66.67",
        "Type": "ACH_DEBIT",
        "Balance": "23250.33",
        "Check or Slip #": "",
        "TransactionId": "65c167d97db65e34f114c675cf2a0bb9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/28/2021",
        "Description": "JENSENBRICKHOUSE WEB PMTS   QL9828          WEB ID: 9000615921",
        "Amount": "-850",
        "Type": "ACH_DEBIT",
        "Balance": "23317",
        "Check or Slip #": "",
        "TransactionId": "af1a31b841de5820600351723600221c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/28/2021",
        "Description": "City of Ankeny U PAYMENT    999000000366461 WEB ID: 110312002",
        "Amount": "-44.79",
        "Type": "ACH_DEBIT",
        "Balance": "24167",
        "Check or Slip #": "",
        "TransactionId": "cd6e84478607d367976f5cd021463c56"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/28/2021",
        "Description": "JACK IN THE BOX 0213 LONG BEACH CA           07/27",
        "Amount": "-9.79",
        "Type": "DEBIT_CARD",
        "Balance": "24211.79",
        "Check or Slip #": "",
        "TransactionId": "a2c56b32c2ae69997bff79a5fcab5907"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/28/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/27",
        "Amount": "-17",
        "Type": "DEBIT_CARD",
        "Balance": "24221.58",
        "Check or Slip #": "",
        "TransactionId": "ab04fbbd13206ca52810d7432a10e0f9"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/28/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "582.72",
        "Type": "ACH_CREDIT",
        "Balance": "24238.58",
        "Check or Slip #": "",
        "TransactionId": "22ea82ad81c81f7125c8f9b0172401c8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/27/2021",
        "Description": "SONIC DRIVE IN #4871 ANKENY IA               07/26",
        "Amount": "-5.91",
        "Type": "DEBIT_CARD",
        "Balance": "23655.86",
        "Check or Slip #": "",
        "TransactionId": "7dba599f5164ee87ade0f140823ef732"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2021",
        "Description": "WAL-MART #2764 ALTOONA IA                    07/26",
        "Amount": "-6.64",
        "Type": "DEBIT_CARD",
        "Balance": "23661.77",
        "Check or Slip #": "",
        "TransactionId": "cccc3071735035050a857219b0eff19f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/26",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "23668.41",
        "Check or Slip #": "",
        "TransactionId": "798abfad3b66f8e431a60203ba201be3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/25",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "23672.41",
        "Check or Slip #": "",
        "TransactionId": "fd35eb5da0a38540999095760efd5074"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2021",
        "Description": "KWIK STAR  10100010165 ANKENY IA             07/25",
        "Amount": "-25.81",
        "Type": "DEBIT_CARD",
        "Balance": "23678.41",
        "Check or Slip #": "",
        "TransactionId": "e32f245b3cb7121e5a59b1b9e45fbb77"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/24",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "23704.22",
        "Check or Slip #": "",
        "TransactionId": "ff7d56f3b3b53af52b5020a55cafc471"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2021",
        "Description": "CHIPOTLE 2776 ANKENY IA                      07/24",
        "Amount": "-10.87",
        "Type": "DEBIT_CARD",
        "Balance": "23706.22",
        "Check or Slip #": "",
        "TransactionId": "49521a9f2eccebe2a648fb4b23a510dc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 07/23",
        "Amount": "-3.57",
        "Type": "DEBIT_CARD",
        "Balance": "23717.09",
        "Check or Slip #": "",
        "TransactionId": "1ce6b06f10ebc6c0090abf2679d7a0b6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/23",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "23720.66",
        "Check or Slip #": "",
        "TransactionId": "46f322b8e704942fa69da0de606e1c65"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2021",
        "Description": "DUNKIN #356646 ALTOONA IA                    07/22",
        "Amount": "-7.15",
        "Type": "DEBIT_CARD",
        "Balance": "23732.66",
        "Check or Slip #": "",
        "TransactionId": "c7fb48b303aedeb6b2999e7435770695"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2021",
        "Description": "Caseys Pizza 2870 515-967-2088 IA            07/22",
        "Amount": "-14.97",
        "Type": "DEBIT_CARD",
        "Balance": "23739.81",
        "Check or Slip #": "",
        "TransactionId": "bdafadc6ea2a53a470f0d29b0062d886"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/22/2021",
        "Description": "HY-VEE ALTOONA 1 100 8 ALTOONA IA    408908  07/22",
        "Amount": "-5.83",
        "Type": "DEBIT_CARD",
        "Balance": "23754.78",
        "Check or Slip #": "",
        "TransactionId": "1d56f63eceec55194a2a9930b43841a1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/22/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/21",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "23760.61",
        "Check or Slip #": "",
        "TransactionId": "d802bcf7963a324096bf2db51dd136e9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/21/2021",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      227904  07/20",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "23767.61",
        "Check or Slip #": "",
        "TransactionId": "1571b08f84c58c56a0cf83f0be3adf90"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/21/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/20",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "23769.61",
        "Check or Slip #": "",
        "TransactionId": "7f562e09a1abd367a03d6af9fd95e3e4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/21/2021",
        "Description": "VIOC GR0003 ANKENY IA                        07/20",
        "Amount": "-74.19",
        "Type": "DEBIT_CARD",
        "Balance": "23776.61",
        "Check or Slip #": "",
        "TransactionId": "fdb4a47da51505186bcfa5c0cacd768e"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/21/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "650.75",
        "Type": "ACH_CREDIT",
        "Balance": "23850.8",
        "Check or Slip #": "",
        "TransactionId": "7b45647dcb2f55849637abc21def6dc3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/20/2021",
        "Description": "MICHAELS STORES 3733 ANKENY IA       344399  07/20",
        "Amount": "-3.7",
        "Type": "DEBIT_CARD",
        "Balance": "23200.05",
        "Check or Slip #": "",
        "TransactionId": "06f0b6625b1315eb68c8f7b39da7ac36"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/20/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/19",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "23203.75",
        "Check or Slip #": "",
        "TransactionId": "20db1c70a476e009bc0b827f8816111e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/19/2021",
        "Description": "Wal-Mart Super Center ANKENY IA              07/19",
        "Amount": "-61.53",
        "Type": "DEBIT_CARD",
        "Balance": "23223.75",
        "Check or Slip #": "",
        "TransactionId": "1154a3e5fc0df295d925e4d5984a9ae4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/19/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/17",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "23285.28",
        "Check or Slip #": "",
        "TransactionId": "edae0b53197dc5e347c57b58cc72b293"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/19/2021",
        "Description": "B BOPS ANKENY ANKENY IA                      07/16",
        "Amount": "-8.13",
        "Type": "DEBIT_CARD",
        "Balance": "23290.28",
        "Check or Slip #": "",
        "TransactionId": "630c5347b1d991898cc415a3dc1c9d5a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/16/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/15",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "23298.41",
        "Check or Slip #": "",
        "TransactionId": "20472b173f49b5221ccf3ca5a844bd5e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/16/2021",
        "Description": "RAISING CANE'S 0667 ALTOONA IA               07/16",
        "Amount": "-8.89",
        "Type": "DEBIT_CARD",
        "Balance": "23299.41",
        "Check or Slip #": "",
        "TransactionId": "798ad8626cbd867590f599fd79dea898"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/15/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     004208  07/15",
        "Amount": "-61.2",
        "Type": "DEBIT_CARD",
        "Balance": "23308.3",
        "Check or Slip #": "",
        "TransactionId": "8505a634205410552b265c578e552da6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/15/2021",
        "Description": "SQ *OVER THE TOP ICE Pleasant Hill IA        07/14",
        "Amount": "-9.78",
        "Type": "DEBIT_CARD",
        "Balance": "23369.5",
        "Check or Slip #": "",
        "TransactionId": "fdc71c99df309e6e9c87f7528bd5f045"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/15/2021",
        "Description": "CASEYS GEN STORE2896 ANKENY IA               07/13",
        "Amount": "-30.03",
        "Type": "DEBIT_CARD",
        "Balance": "23379.28",
        "Check or Slip #": "",
        "TransactionId": "af4a763acec2cd6ece0b4a116ce16bd2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/14/2021",
        "Description": "CAPITAL ONE      MOBILE PMT 3G8URVF5YPVE8AL WEB ID: 9279744980",
        "Amount": "-29",
        "Type": "ACH_DEBIT",
        "Balance": "23409.31",
        "Check or Slip #": "",
        "TransactionId": "c90ddd12a9fb1db338d91c975e4b11ac"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/14/2021",
        "Description": "MCDONALD'S F5317 ALTOONA IA                  07/13",
        "Amount": "-2.76",
        "Type": "DEBIT_CARD",
        "Balance": "23438.31",
        "Check or Slip #": "",
        "TransactionId": "8774cfdf2cab2219567e43fbbe7e8ff5"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/14/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "680.06",
        "Type": "ACH_CREDIT",
        "Balance": "23441.07",
        "Check or Slip #": "",
        "TransactionId": "8256e77f46015a6731b4ce05da59672f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/13/2021",
        "Description": "QT 514 ANKENY IA                             07/12",
        "Amount": "-5.38",
        "Type": "DEBIT_CARD",
        "Balance": "22761.01",
        "Check or Slip #": "",
        "TransactionId": "0bcef292a3b8d59ad8f4fbd12cdbd942"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/13/2021",
        "Description": "ARBYS 5722 ANKENY IA                         07/12",
        "Amount": "-10.47",
        "Type": "DEBIT_CARD",
        "Balance": "22766.39",
        "Check or Slip #": "",
        "TransactionId": "b900a44679999fb30c2bfa70f5265c1f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/11",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "22776.86",
        "Check or Slip #": "",
        "TransactionId": "1337789c41e66c1fb26d374ada83e117"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/10",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "22782.86",
        "Check or Slip #": "",
        "TransactionId": "0822d6a5925a3b88d237f7e5098b79e9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/10",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "22784.86",
        "Check or Slip #": "",
        "TransactionId": "a2387dc319ce286b25ed07e371b4f0bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/12/2021",
        "Description": "DAIRY QUEEN #13726 ANKENY IA                 07/10",
        "Amount": "-9.73",
        "Type": "DEBIT_CARD",
        "Balance": "22789.86",
        "Check or Slip #": "",
        "TransactionId": "941def9359b611f3c7f4a194ff54adea"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/09",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "22799.59",
        "Check or Slip #": "",
        "TransactionId": "483d7b86f3526121c8bb880588e4ae88"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/09/2021",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            07/09",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "22803.59",
        "Check or Slip #": "",
        "TransactionId": "9db132e4ee1408ce1286305c1d7f5d22"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/09/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/09",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "22858.59",
        "Check or Slip #": "",
        "TransactionId": "808651ec254eb5edaa553d90bc51a25f"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/09/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "545.46",
        "Type": "ACH_CREDIT",
        "Balance": "22860.59",
        "Check or Slip #": "",
        "TransactionId": "a63cf31b13b453754f8ab364d8c98455"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2021",
        "Description": "CULVERS OF ALTOONA ALTOONA IA                07/07",
        "Amount": "-9.41",
        "Type": "DEBIT_CARD",
        "Balance": "22315.13",
        "Check or Slip #": "",
        "TransactionId": "23c1069672533bb492aa32bfba289dcc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2021",
        "Description": "FAZOLIS_5913 ANKENY IA                       07/07",
        "Amount": "-7.36",
        "Type": "DEBIT_CARD",
        "Balance": "22324.54",
        "Check or Slip #": "",
        "TransactionId": "e9ca6ad732a7eef32f3083c5aeaa147b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 07/07",
        "Amount": "-4.78",
        "Type": "DEBIT_CARD",
        "Balance": "22331.9",
        "Check or Slip #": "",
        "TransactionId": "322b580f6ef86a53dae88875e2724e14"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/07/2021",
        "Description": "Wal-Mart Super Center ALTOONA IA             07/07",
        "Amount": "-15.88",
        "Type": "DEBIT_CARD",
        "Balance": "22336.68",
        "Check or Slip #": "",
        "TransactionId": "c6eb7375b0822489fdd5d25c1018bd61"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/07/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "676.42",
        "Type": "ACH_CREDIT",
        "Balance": "22352.56",
        "Check or Slip #": "",
        "TransactionId": "6c70d1313df3a71bac3d3d01e1eba4b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/06/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/04",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "21676.14",
        "Check or Slip #": "",
        "TransactionId": "5b15d7fcf200caf55e60c0b5789a090c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/06/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/04",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "21679.14",
        "Check or Slip #": "",
        "TransactionId": "42af6ad92b0e70e93c68a5d2405caf9c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/06/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/03",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "21680.14",
        "Check or Slip #": "",
        "TransactionId": "b385cbbfe85d4a866984b6441352396c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/02/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     346009  07/02",
        "Amount": "-38.84",
        "Type": "DEBIT_CARD",
        "Balance": "21682.14",
        "Check or Slip #": "",
        "TransactionId": "f75e0014505b8236ed9833453bcf3c15"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/02/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/01",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "21720.98",
        "Check or Slip #": "",
        "TransactionId": "fb1cc713c5d6543c593bcef8c2014cc1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/02/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            07/01",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "21722.98",
        "Check or Slip #": "",
        "TransactionId": "381addb937de6d582cfe919060fac010"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/01/2021",
        "Description": "MCDONALD'S F5317 ALTOONA IA                  06/30",
        "Amount": "-4.47",
        "Type": "DEBIT_CARD",
        "Balance": "21728.98",
        "Check or Slip #": "",
        "TransactionId": "94def250ec2dbb562a0c1930c5434e75"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/30/2021",
        "Description": "KUM&GO 0185 BONDURANT BONDURANT IA   924592  06/30",
        "Amount": "-1.92",
        "Type": "DEBIT_CARD",
        "Balance": "21733.45",
        "Check or Slip #": "",
        "TransactionId": "ebfed43c225c9b4b232180f9d9f4a1a8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/30/2021",
        "Description": "MIDAMERICAN      ENERGY     0115123306W104  WEB ID: 4421425214",
        "Amount": "-40",
        "Type": "ACH_DEBIT",
        "Balance": "21735.37",
        "Check or Slip #": "",
        "TransactionId": "8377f63f3c9805078e9abaeb7a548fbd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/30/2021",
        "Description": "SONIC DRIVE IN #4871 ANKENY IA               06/29",
        "Amount": "-1.47",
        "Type": "DEBIT_CARD",
        "Balance": "21775.37",
        "Check or Slip #": "",
        "TransactionId": "33d64fd092cf946690ce8d9d332a2720"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/30/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "626.09",
        "Type": "ACH_CREDIT",
        "Balance": "21776.84",
        "Check or Slip #": "",
        "TransactionId": "6913060c650df316eba9376778cbf54d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/29/2021",
        "Description": "JENSENBRICKHOUSE WEB PMTS   PXMWW7          WEB ID: 9000615921",
        "Amount": "-850",
        "Type": "ACH_DEBIT",
        "Balance": "21150.75",
        "Check or Slip #": "",
        "TransactionId": "313c8aa96f2c2ab2f0cd9e600212fab9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/29/2021",
        "Description": "City of Ankeny U PAYMENT    999000000346153 WEB ID: 110312002",
        "Amount": "-48.86",
        "Type": "ACH_DEBIT",
        "Balance": "22000.75",
        "Check or Slip #": "",
        "TransactionId": "f76d468eb88eeda374e1a7863d9f5632"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/29/2021",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-66.68",
        "Type": "ACH_DEBIT",
        "Balance": "22049.61",
        "Check or Slip #": "",
        "TransactionId": "2cf2b37ca3fd1d54e535f0f9c85ef871"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/29/2021",
        "Description": "CHIPOTLE 2776 ANKENY IA                      06/28",
        "Amount": "-10.87",
        "Type": "DEBIT_CARD",
        "Balance": "22116.29",
        "Check or Slip #": "",
        "TransactionId": "5a33476ba926f6aa08c2900545cc83bb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/28/2021",
        "Description": "CAPITAL ONE      MOBILE PMT 3G5AE7B6X536U0T WEB ID: 9279744980",
        "Amount": "-77.07",
        "Type": "ACH_DEBIT",
        "Balance": "22127.16",
        "Check or Slip #": "",
        "TransactionId": "cacdeef7d867fe19400fd349ba864ad7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/28/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/27",
        "Amount": "-8.5",
        "Type": "DEBIT_CARD",
        "Balance": "22204.23",
        "Check or Slip #": "",
        "TransactionId": "bfecebb761abcbb19c4c3cff50d3bb74"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/28/2021",
        "Description": "WAL-MART #0892 ANKENY IA                     06/26",
        "Amount": "-48.39",
        "Type": "DEBIT_CARD",
        "Balance": "22212.73",
        "Check or Slip #": "",
        "TransactionId": "a27c09db88c3bdb42a226625c0459970"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/28/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     06/26",
        "Amount": "-9",
        "Type": "DEBIT_CARD",
        "Balance": "22261.12",
        "Check or Slip #": "",
        "TransactionId": "39a4bd4bc1605adec1564beae79eaf22"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/25/2021",
        "Description": "TARGET        00017673 ANKENY IA             06/24",
        "Amount": "-59.65",
        "Type": "DEBIT_CARD",
        "Balance": "22270.12",
        "Check or Slip #": "",
        "TransactionId": "bf1720948fdcb09234b9d6f35f3da13a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/25/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/24",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "22329.77",
        "Check or Slip #": "",
        "TransactionId": "339ef6b61b560b3024fafc81d49e1d0f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/25/2021",
        "Description": "MCDONALD'S F35350 ANKENY IA                  06/24",
        "Amount": "-2.84",
        "Type": "DEBIT_CARD",
        "Balance": "22334.77",
        "Check or Slip #": "",
        "TransactionId": "e89f9c95aaaae69cabf2db3dc5896968"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/24/2021",
        "Description": "SQ *SOMEWHERE IN THE MI Bondurant IA         06/23",
        "Amount": "-16.81",
        "Type": "DEBIT_CARD",
        "Balance": "22337.61",
        "Check or Slip #": "",
        "TransactionId": "25936f5c5514678f74c3ec25a4134525"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/24/2021",
        "Description": "MCDONALD'S F33070 ALTOONA IA                 06/23",
        "Amount": "-4.46",
        "Type": "DEBIT_CARD",
        "Balance": "22354.42",
        "Check or Slip #": "",
        "TransactionId": "7167b4dd97d4d1cbd6da1f4ce1d0f6f2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/23/2021",
        "Description": "WAL-MART #2764 ALTOONA IA                    06/23",
        "Amount": "-4.49",
        "Type": "DEBIT_CARD",
        "Balance": "22358.88",
        "Check or Slip #": "",
        "TransactionId": "62ac3a0f2f643d4e208dea373c4b2af4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/23/2021",
        "Description": "WENDY'S 10669 ALTOONA IA                     06/22",
        "Amount": "-4.28",
        "Type": "DEBIT_CARD",
        "Balance": "22363.37",
        "Check or Slip #": "",
        "TransactionId": "52535c3195981e4bd3bfd77a5dd5620b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/23/2021",
        "Description": "CASEYS GEN STORE 2689 ANKENY IA              06/21",
        "Amount": "-32.23",
        "Type": "DEBIT_CARD",
        "Balance": "22367.65",
        "Check or Slip #": "",
        "TransactionId": "ecb5cf61e66a6de06dcee8479eccbac1"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/23/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "614.86",
        "Type": "ACH_CREDIT",
        "Balance": "22399.88",
        "Check or Slip #": "",
        "TransactionId": "1e8d247456f5fed6ce03784673306808"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/22/2021",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             06/22",
        "Amount": "-4.6",
        "Type": "DEBIT_CARD",
        "Balance": "21785.02",
        "Check or Slip #": "",
        "TransactionId": "a7f3b1eaf8082d2d2d00a85d580cddfb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/22/2021",
        "Description": "Cash App*Cash Out VISA DIRECT CA     883791  06/22",
        "Amount": "545.59",
        "Type": "DEBIT_CARD",
        "Balance": "21789.62",
        "Check or Slip #": "",
        "TransactionId": "ad074d37b2ce1b3350e78d83a0f9d7aa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/21/2021",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      303228  06/21",
        "Amount": "-1.47",
        "Type": "DEBIT_CARD",
        "Balance": "21244.03",
        "Check or Slip #": "",
        "TransactionId": "1d7077e0310a09ef4f146d413342ea4f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/21/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/20",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "21245.5",
        "Check or Slip #": "",
        "TransactionId": "2ca27baf20878957dbdf0628d3146fd5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/21/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/19",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "21247.5",
        "Check or Slip #": "",
        "TransactionId": "071284f7bcc165ece3dec5f84c224a7b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/21/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/18",
        "Amount": "-550",
        "Type": "DEBIT_CARD",
        "Balance": "21249.5",
        "Check or Slip #": "",
        "TransactionId": "f399379f642495e20cb94a90f30f31c6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/18/2021",
        "Description": "TARGET        00017673 ANKENY IA             06/17",
        "Amount": "-35.16",
        "Type": "DEBIT_CARD",
        "Balance": "21799.5",
        "Check or Slip #": "",
        "TransactionId": "4fab366a9075d5e992901ac492474bcc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/17/2021",
        "Description": "TACO BELL #731560 ANKENY IA                  06/16",
        "Amount": "-5.41",
        "Type": "DEBIT_CARD",
        "Balance": "21834.66",
        "Check or Slip #": "",
        "TransactionId": "40d5c7bdb2497af20eeab2110173fb61"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/16/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     335747  06/16",
        "Amount": "-4.46",
        "Type": "DEBIT_CARD",
        "Balance": "21840.07",
        "Check or Slip #": "",
        "TransactionId": "631e8242cb5da0fa3ff5784e8b89209f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/16/2021",
        "Description": "QT 514 ANKENY IA                             06/15",
        "Amount": "-3.7",
        "Type": "DEBIT_CARD",
        "Balance": "21844.53",
        "Check or Slip #": "",
        "TransactionId": "1d3dc11b68a307f221b56f286530cb07"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/16/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "609.53",
        "Type": "ACH_CREDIT",
        "Balance": "21848.23",
        "Check or Slip #": "",
        "TransactionId": "f702bd085fea2e0e32bdf372b3f07c53"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/15/2021",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            06/15",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "21238.7",
        "Check or Slip #": "",
        "TransactionId": "52fb1d8dc5a1befc9e95c196e846bd30"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/15/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     06/14",
        "Amount": "-10.05",
        "Type": "DEBIT_CARD",
        "Balance": "21293.7",
        "Check or Slip #": "",
        "TransactionId": "f51fb5feeaf74f0621ec082f6459b967"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/15/2021",
        "Description": "HARDEES 1506082 ANKENY IA                    06/14",
        "Amount": "-10.15",
        "Type": "DEBIT_CARD",
        "Balance": "21303.75",
        "Check or Slip #": "",
        "TransactionId": "a350e2389888e78f1325d339bc7bc5d4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/14/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/14",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "21313.9",
        "Check or Slip #": "",
        "TransactionId": "e5d8d40d0e6cc10bc36a42b0823c7f86"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/14/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/13",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "21315.9",
        "Check or Slip #": "",
        "TransactionId": "9f0026ab3c05d4cf11316d2bb459f926"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/14/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/13",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "21320.9",
        "Check or Slip #": "",
        "TransactionId": "2cf1626d3e8205a469f00aa84cc1e67b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/14/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/11",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "21322.9",
        "Check or Slip #": "",
        "TransactionId": "54f4c1f93198d5773babcb6b2c2565b1"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/14/2021",
        "Description": "IASTTAXRFD       IASTTAXRFD                 PPD ID: 3426004574",
        "Amount": "145",
        "Type": "ACH_CREDIT",
        "Balance": "21324.9",
        "Check or Slip #": "",
        "TransactionId": "5c75db0d093a0d23d20c6c51ada619af"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/11/2021",
        "Description": "MCDONALD'S F3207 ANKENY IA                   06/10",
        "Amount": "-1.05",
        "Type": "DEBIT_CARD",
        "Balance": "21179.9",
        "Check or Slip #": "",
        "TransactionId": "1cfea8e198164786cd99fa38458d4646"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/11/2021",
        "Description": "SHOE CARNIVAL #0327 ANKENY IA                06/10",
        "Amount": "-116.58",
        "Type": "DEBIT_CARD",
        "Balance": "21180.95",
        "Check or Slip #": "",
        "TransactionId": "81b3534dbbfd1e173c1bc528bbc3d871"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/10/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     06/09",
        "Amount": "-9",
        "Type": "DEBIT_CARD",
        "Balance": "21297.53",
        "Check or Slip #": "",
        "TransactionId": "e75f0a066b663b39409b5a518d90b846"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/10/2021",
        "Description": "ZOMBIE BURGER DES MOINES IA                  06/09",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "21306.53",
        "Check or Slip #": "",
        "TransactionId": "fae64cd857be2619f860c8edf8f33bfd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/10/2021",
        "Description": "CASEYS GEN STORE 2689 ANKENY IA              06/08",
        "Amount": "-28.59",
        "Type": "DEBIT_CARD",
        "Balance": "21331.53",
        "Check or Slip #": "",
        "TransactionId": "f7783151b9e1b7adc0d2d681cdc29847"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/10/2021",
        "Description": "TACO JOHNS 9427 ANKENY IA                    06/08",
        "Amount": "-9.49",
        "Type": "DEBIT_CARD",
        "Balance": "21360.12",
        "Check or Slip #": "",
        "TransactionId": "6e2a470b40867c4111b0be8332ccffb0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/09/2021",
        "Description": "Wal-Mart Super Center ANKENY IA              06/09",
        "Amount": "-20.13",
        "Type": "DEBIT_CARD",
        "Balance": "21369.61",
        "Check or Slip #": "",
        "TransactionId": "e7bee2a466a183c3fd3f192dd5f6913c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/09/2021",
        "Description": "ANKENY DENTAL ASSOCIATE ANKENY IA            06/08",
        "Amount": "-300",
        "Type": "DEBIT_CARD",
        "Balance": "21389.74",
        "Check or Slip #": "",
        "TransactionId": "7419b40194516c1f47c43dbd0663c8fd"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/09/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "633.69",
        "Type": "ACH_CREDIT",
        "Balance": "21689.74",
        "Check or Slip #": "",
        "TransactionId": "617ec705791d46e8508ff79ec67f204f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/08/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/07",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "21056.05",
        "Check or Slip #": "",
        "TransactionId": "728b268d92818c27654d9477d8501aba"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/07/2021",
        "Description": "ALDI 72035 ANKENY IA                 374399  06/05",
        "Amount": "-16.01",
        "Type": "DEBIT_CARD",
        "Balance": "21062.05",
        "Check or Slip #": "",
        "TransactionId": "aeb45c9ee3ec4bf2cd82f03b99d33126"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/07/2021",
        "Description": "CAPITAL ONE      MOBILE PMT 3G0MS9MCZGBIXDP WEB ID: 9279744980",
        "Amount": "-48.98",
        "Type": "ACH_DEBIT",
        "Balance": "21078.06",
        "Check or Slip #": "",
        "TransactionId": "755a392b05deb4dd1c6de591c0c25bf4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/04/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            06/03",
        "Amount": "-264",
        "Type": "DEBIT_CARD",
        "Balance": "21127.04",
        "Check or Slip #": "",
        "TransactionId": "cd46b8768ce7477a3857efb3e76f0249"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/04/2021",
        "Description": "WM SUPERCENTER #892 ANKENY IA                06/02",
        "Amount": "316.94",
        "Type": "DEBIT_CARD",
        "Balance": "21391.04",
        "Check or Slip #": "",
        "TransactionId": "c1226a7cb30e40461804ee0bcb7e6a54"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/03/2021",
        "Description": "FAZOLIS_5913 ANKENY IA                       06/02",
        "Amount": "-12.32",
        "Type": "DEBIT_CARD",
        "Balance": "21074.1",
        "Check or Slip #": "",
        "TransactionId": "a9d02f5b4ad78a23a5adcdb329b78837"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/03/2021",
        "Description": "MCDONALD'S F35350 ANKENY IA                  06/02",
        "Amount": "-2.11",
        "Type": "DEBIT_CARD",
        "Balance": "21086.42",
        "Check or Slip #": "",
        "TransactionId": "9643aee0322433a8e3c2308512f1cd99"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/02/2021",
        "Description": "WAL-MART #0892 ANKENY IA                     06/02",
        "Amount": "-73.56",
        "Type": "DEBIT_CARD",
        "Balance": "21088.53",
        "Check or Slip #": "",
        "TransactionId": "d52433f7f539f82f6b632100b884f85b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/02/2021",
        "Description": "MCDONALD'S F35350 ANKENY IA                  06/01",
        "Amount": "-4.44",
        "Type": "DEBIT_CARD",
        "Balance": "21162.09",
        "Check or Slip #": "",
        "TransactionId": "bfd05d05634f9f29cf2b25c4994a6a15"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/02/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "565.31",
        "Type": "ACH_CREDIT",
        "Balance": "21166.53",
        "Check or Slip #": "",
        "TransactionId": "fcde7e53e8a475b8867f1e0b09420e7d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/01/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/31",
        "Amount": "-17",
        "Type": "DEBIT_CARD",
        "Balance": "20601.22",
        "Check or Slip #": "",
        "TransactionId": "5ba93d17eff8e4d14338df6043a41d5e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/01/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/31",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "20618.22",
        "Check or Slip #": "",
        "TransactionId": "84177a8e643c3e477d9785d72f42cc41"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/01/2021",
        "Description": "MIDAMERICAN      ENERGY     0115123306W083  WEB ID: 4421425214",
        "Amount": "-40",
        "Type": "ACH_DEBIT",
        "Balance": "20621.22",
        "Check or Slip #": "",
        "TransactionId": "113e8c47b38f83b73a538f1e45def97a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/01/2021",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-72.56",
        "Type": "ACH_DEBIT",
        "Balance": "20661.22",
        "Check or Slip #": "",
        "TransactionId": "0ce7bad602f27ed422e676d1c61e5953"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/01/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/29",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "20733.78",
        "Check or Slip #": "",
        "TransactionId": "bf1c03ddf82be28b5fbe3f6c8eb1479c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2021",
        "Description": "JENSENBRICKHOUSE WEB PMTS   JVPCQ7          WEB ID: 9000615921",
        "Amount": "-850",
        "Type": "ACH_DEBIT",
        "Balance": "20735.28",
        "Check or Slip #": "",
        "TransactionId": "7a5374506ebc60bf857371a941a8f23f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2021",
        "Description": "City of Ankeny U PAYMENT    999000000325785 WEB ID: 110312002",
        "Amount": "-50.15",
        "Type": "ACH_DEBIT",
        "Balance": "21585.28",
        "Check or Slip #": "",
        "TransactionId": "53cd6ebcfe551398e34ab3d9a1357aa0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 05/27",
        "Amount": "-10.14",
        "Type": "DEBIT_CARD",
        "Balance": "21635.43",
        "Check or Slip #": "",
        "TransactionId": "0c3e282e6dd7b7b6bfa00068a6972035"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/26/2021",
        "Description": "USPS PO 18033305 1011 ANKENY IA      431931  05/26",
        "Amount": "-40",
        "Type": "DEBIT_CARD",
        "Balance": "21645.57",
        "Check or Slip #": "",
        "TransactionId": "7bdda3c8abc43287ca0840c6a5ef792f"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/26/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "596.72",
        "Type": "ACH_CREDIT",
        "Balance": "21685.57",
        "Check or Slip #": "",
        "TransactionId": "0d40f22d2f2b4c184fe52e01bfa1e404"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/25/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     018784  05/25",
        "Amount": "-44.82",
        "Type": "DEBIT_CARD",
        "Balance": "21088.85",
        "Check or Slip #": "",
        "TransactionId": "32a055cfaf5abc97206208947d2a1d78"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/25/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/24",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "21133.67",
        "Check or Slip #": "",
        "TransactionId": "a742d169692c5cebcc191c2319fc2f6e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/24/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/24",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "21158.67",
        "Check or Slip #": "",
        "TransactionId": "5d9dcea9eed02ef75a916bcfa44fd758"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/24/2021",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             05/23",
        "Amount": "-18.36",
        "Type": "DEBIT_CARD",
        "Balance": "21160.17",
        "Check or Slip #": "",
        "TransactionId": "98f25e5a7295e5b90dd9691661f37ce7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/24/2021",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             05/23",
        "Amount": "-316.94",
        "Type": "DEBIT_CARD",
        "Balance": "21178.53",
        "Check or Slip #": "",
        "TransactionId": "0351ea751a161b5d632e3b63a3cd9fd8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/24/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     05/23",
        "Amount": "-8.79",
        "Type": "DEBIT_CARD",
        "Balance": "21495.47",
        "Check or Slip #": "",
        "TransactionId": "757e48fe35a4d6c899ca1419c715be8f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/24/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/23",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "21504.26",
        "Check or Slip #": "",
        "TransactionId": "51a8105094b3d64bbd8a8407a8782c13"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/24/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/22",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "21505.76",
        "Check or Slip #": "",
        "TransactionId": "8a28b6718bec50740346ed42e895c341"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/24/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/21",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "21508.76",
        "Check or Slip #": "",
        "TransactionId": "73006a43bf0855920abe0f5935643577"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/21/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/21",
        "Amount": "-1.86",
        "Type": "DEBIT_CARD",
        "Balance": "21514.76",
        "Check or Slip #": "",
        "TransactionId": "20dbc50ec11d8285dc5ebdba131c3b5c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/21/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/20",
        "Amount": "-12.71",
        "Type": "DEBIT_CARD",
        "Balance": "21516.62",
        "Check or Slip #": "",
        "TransactionId": "da6dfa41b883abdacf72752b4ead8eab"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/20/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 05/19",
        "Amount": "-11.35",
        "Type": "DEBIT_CARD",
        "Balance": "21529.33",
        "Check or Slip #": "",
        "TransactionId": "0191f3043c650af0cd75deac751a02d1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/20/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/19",
        "Amount": "-1.43",
        "Type": "DEBIT_CARD",
        "Balance": "21540.68",
        "Check or Slip #": "",
        "TransactionId": "f08e3436ca677f313910a78c623a5f9d"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/20/2021",
        "Description": "IRS  TREAS 310     TAX REF                  PPD ID: 9111736946",
        "Amount": "1516.61",
        "Type": "ACH_CREDIT",
        "Balance": "21542.11",
        "Check or Slip #": "",
        "TransactionId": "cee4328f3c64059a317a95650dc03bc9"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/19/2021",
        "Description": "FRANCHISE TAX BD CASTTAXRFD                 PPD ID: 9282532045",
        "Amount": "129",
        "Type": "ACH_CREDIT",
        "Balance": "20025.5",
        "Check or Slip #": "",
        "TransactionId": "a3048352601386820d9479304a87174d"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/19/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "639.45",
        "Type": "ACH_CREDIT",
        "Balance": "19896.5",
        "Check or Slip #": "",
        "TransactionId": "8daa242382958956d50ae57bf57c2a98"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/18/2021",
        "Description": "CAPITAL ONE      MOBILE PMT 3FWMXXX6H4HCQYL WEB ID: 9279744980",
        "Amount": "-61.08",
        "Type": "ACH_DEBIT",
        "Balance": "19257.05",
        "Check or Slip #": "",
        "TransactionId": "f8de139b2abf4415518425c2e504f9e8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/18/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     05/17",
        "Amount": "-9.11",
        "Type": "DEBIT_CARD",
        "Balance": "19318.13",
        "Check or Slip #": "",
        "TransactionId": "71335c48f5a2eee94105674ede7ef368"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/17/2021",
        "Description": "Wal-Mart Super Center ANKENY IA              05/17",
        "Amount": "-12.03",
        "Type": "DEBIT_CARD",
        "Balance": "19327.24",
        "Check or Slip #": "",
        "TransactionId": "6fb682d5212d38eff0af6570457c09bc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/17/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/17",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "19339.27",
        "Check or Slip #": "",
        "TransactionId": "e8c59ba9a2521b568511f2533a9b616e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/17/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/16",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "19341.27",
        "Check or Slip #": "",
        "TransactionId": "95a43e4411c2e01b41255253aea3bd43"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/17/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/15",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "19343.27",
        "Check or Slip #": "",
        "TransactionId": "adfcb70b5416c036f7cd7113346d74ae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/17/2021",
        "Description": "RAISING CANE'S 0665 WEST DES MOIN IA         05/14",
        "Amount": "-12.43",
        "Type": "DEBIT_CARD",
        "Balance": "19344.27",
        "Check or Slip #": "",
        "TransactionId": "58594dbd4fe1f846b04ef70131927347"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/13/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/13",
        "Amount": "-200",
        "Type": "DEBIT_CARD",
        "Balance": "19356.7",
        "Check or Slip #": "",
        "TransactionId": "621bf45ee5de17ff9535aecfa095d28b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/12/2021",
        "Description": "HY-VEE ANKENY 10 2510 ANKENY IA      259486  05/12",
        "Amount": "-71.96",
        "Type": "DEBIT_CARD",
        "Balance": "19556.7",
        "Check or Slip #": "",
        "TransactionId": "123c12e97d77e995f32df4b2e761a66d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/11",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "19628.66",
        "Check or Slip #": "",
        "TransactionId": "63a7ac0af2727974e5a43b9c4cd4f96f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/12/2021",
        "Description": "ANKENY DENTAL ASSOCIATE ANKENY IA            05/11",
        "Amount": "-158.24",
        "Type": "DEBIT_CARD",
        "Balance": "19633.66",
        "Check or Slip #": "",
        "TransactionId": "1db05fbe8e854e80121c3046364231ea"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/12/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "594.79",
        "Type": "ACH_CREDIT",
        "Balance": "19791.9",
        "Check or Slip #": "",
        "TransactionId": "79b83e37d94fa2c069219c1d6010f5d2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/11/2021",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            05/11",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "19197.11",
        "Check or Slip #": "",
        "TransactionId": "eb3cb526d1987ff22151a5141564cf7c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/11/2021",
        "Description": "HARDEES 1506082 ANKENY IA                    05/10",
        "Amount": "-10.15",
        "Type": "DEBIT_CARD",
        "Balance": "19252.11",
        "Check or Slip #": "",
        "TransactionId": "6e951dc33cc0af4ab43b74fd597d424f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/10/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/10",
        "Amount": "-1.4",
        "Type": "DEBIT_CARD",
        "Balance": "19262.26",
        "Check or Slip #": "",
        "TransactionId": "1dd34e7092f97dac933ec9ce4cd16923"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/10/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/09",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "19263.66",
        "Check or Slip #": "",
        "TransactionId": "ad181020d13ac3b8c4d8756b5b208499"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/10/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/08",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "19264.66",
        "Check or Slip #": "",
        "TransactionId": "569bf23e95e2abb0492e6664493daa6e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/07/2021",
        "Description": "WEBULL FINANCIAL ACH        20210506263857  WEB ID: 2561673990",
        "Amount": "-1000",
        "Type": "ACH_DEBIT",
        "Balance": "19267.66",
        "Check or Slip #": "",
        "TransactionId": "5d85ac60a440672e3a1f25eb189b5e48"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/07/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/07",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "20267.66",
        "Check or Slip #": "",
        "TransactionId": "49358f79df864d435ec4170ffbabddc9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/07/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/06",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "20269.16",
        "Check or Slip #": "",
        "TransactionId": "8936c61667df457907a4c95337aae43c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/07/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/06",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "20270.66",
        "Check or Slip #": "",
        "TransactionId": "8613244720bfc309c0874cd25b2984b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/06/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/05",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "20275.66",
        "Check or Slip #": "",
        "TransactionId": "b87d33dd017e0f4d10ae47a513624348"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/05/2021",
        "Description": "WENDY'S #4028 DES MOINES IA                  05/04",
        "Amount": "-7.25",
        "Type": "DEBIT_CARD",
        "Balance": "20281.66",
        "Check or Slip #": "",
        "TransactionId": "b8976a4da850ad9e7ae30168a74d3d07"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/05/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "601.46",
        "Type": "ACH_CREDIT",
        "Balance": "20288.91",
        "Check or Slip #": "",
        "TransactionId": "9f74a165ff266d1daba9b0ca17fd80d1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/04/2021",
        "Description": "MIDAMERICAN      ENERGY     0115123306W064  WEB ID: 4421425214",
        "Amount": "-40",
        "Type": "ACH_DEBIT",
        "Balance": "19687.45",
        "Check or Slip #": "",
        "TransactionId": "8c525f0302a92b7988f3864dcb724021"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/03/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/02",
        "Amount": "-1.3",
        "Type": "DEBIT_CARD",
        "Balance": "19727.45",
        "Check or Slip #": "",
        "TransactionId": "8f66e646a540f66abce1b5f54c4d150a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/03/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/01",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "19728.75",
        "Check or Slip #": "",
        "TransactionId": "d82c01900b61d4419b69411df9cd43d9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/03/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            05/01",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "19729.75",
        "Check or Slip #": "",
        "TransactionId": "d889ce5e4f7b35e1b2b09181fa952dec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/03/2021",
        "Description": "CASEYS GEN STORE 2689 ANKENY IA              04/29",
        "Amount": "-34.71",
        "Type": "DEBIT_CARD",
        "Balance": "19730.75",
        "Check or Slip #": "",
        "TransactionId": "0cd5bab06580bf926c833910fd6fe2b6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/03/2021",
        "Description": "BURGER KING #10435 ANKENY IA                 04/29",
        "Amount": "-4.24",
        "Type": "DEBIT_CARD",
        "Balance": "19765.46",
        "Check or Slip #": "",
        "TransactionId": "5380a522451a65a6bd384fc98a232c2d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2021",
        "Description": "JENSENBRICKHOUSE WEB PMTS   6FL9K7          WEB ID: 9000615921",
        "Amount": "-850",
        "Type": "ACH_DEBIT",
        "Balance": "19769.7",
        "Check or Slip #": "",
        "TransactionId": "bf9cbde881c5225658d21e95dc7aba15"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2021",
        "Description": "City of Ankeny U PAYMENT    999000000307298 WEB ID: 110312002",
        "Amount": "-50.15",
        "Type": "ACH_DEBIT",
        "Balance": "20619.7",
        "Check or Slip #": "",
        "TransactionId": "3624f626ff74d46a8e101687a6fd2196"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/30",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "20669.85",
        "Check or Slip #": "",
        "TransactionId": "155fbee9171d3fcef3e3492e2923b5a5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/29/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     114883  04/29",
        "Amount": "-53.81",
        "Type": "DEBIT_CARD",
        "Balance": "20670.85",
        "Check or Slip #": "",
        "TransactionId": "fdc70f99fee4c9e6581515ef870d939d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/29/2021",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-72.6",
        "Type": "ACH_DEBIT",
        "Balance": "20724.66",
        "Check or Slip #": "",
        "TransactionId": "a132521ca00f15f49e5804930ec6285e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/29/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/28",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "20797.26",
        "Check or Slip #": "",
        "TransactionId": "68d26ec2feaadb0822b02478f24c1968"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/28/2021",
        "Description": "RAISING CANE'S 0667 ALTOONA IA               04/28",
        "Amount": "-8.29",
        "Type": "DEBIT_CARD",
        "Balance": "20803.26",
        "Check or Slip #": "",
        "TransactionId": "0ab4548f94d2327e9cdb8799ddf29b18"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/28/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "628.72",
        "Type": "ACH_CREDIT",
        "Balance": "20811.55",
        "Check or Slip #": "",
        "TransactionId": "d6f93fc5955dba9d40b664c2827cd902"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/26/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/26",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "20182.83",
        "Check or Slip #": "",
        "TransactionId": "2a1d9bf770015b0ae58bde4db4072224"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/26/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/25",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "20184.83",
        "Check or Slip #": "",
        "TransactionId": "180796002b977f04e584d4fa2022a386"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/26/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     363205  04/24",
        "Amount": "-27.22",
        "Type": "DEBIT_CARD",
        "Balance": "20186.33",
        "Check or Slip #": "",
        "TransactionId": "53b7dea1e31817b098d5139cfa813914"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/26/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/24",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "20213.55",
        "Check or Slip #": "",
        "TransactionId": "aba1b552ab8d4644080fc9a1a7ba25eb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/26/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/24",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "20218.85",
        "Check or Slip #": "",
        "TransactionId": "6ffb94e4b1168223e2d2cca7c8a7a0cf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2021",
        "Description": "TACO BELL #31268 ANKENY IA                   04/22",
        "Amount": "-8",
        "Type": "DEBIT_CARD",
        "Balance": "20220.85",
        "Check or Slip #": "",
        "TransactionId": "d825ff20e2457eff15dda835055a4702"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/21/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 04/20",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "20228.85",
        "Check or Slip #": "",
        "TransactionId": "104716e5dfe254de4359081dafacec56"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/21/2021",
        "Description": "WENDY'S #4028 DES MOINES IA                  04/20",
        "Amount": "-4.82",
        "Type": "DEBIT_CARD",
        "Balance": "20233.27",
        "Check or Slip #": "",
        "TransactionId": "64ab0592dcc19fc0b58b5e8d4ee3c7b7"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/21/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "594.54",
        "Type": "ACH_CREDIT",
        "Balance": "20238.09",
        "Check or Slip #": "",
        "TransactionId": "b9178a539d0ff0788d2b2af5165a6963"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/19/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/18",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "19643.55",
        "Check or Slip #": "",
        "TransactionId": "f1ef226a787b8ef1b68e45c5aa0b3f0c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/19/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/17",
        "Amount": "-2.4",
        "Type": "DEBIT_CARD",
        "Balance": "19645.55",
        "Check or Slip #": "",
        "TransactionId": "c43eebb924ade7559a0295ef1e1599d4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/19/2021",
        "Description": "ALDI 72035 ANKENY IA                         04/17",
        "Amount": "-30.56",
        "Type": "DEBIT_CARD",
        "Balance": "19647.95",
        "Check or Slip #": "",
        "TransactionId": "2d98e0b4140f1ed545535cb16ff732ad"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/19/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/17",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "19678.51",
        "Check or Slip #": "",
        "TransactionId": "63c9111980a658e923796b5a50c36a12"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/19/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/16",
        "Amount": "-1.25",
        "Type": "DEBIT_CARD",
        "Balance": "19679.51",
        "Check or Slip #": "",
        "TransactionId": "8ed9de23218a8fb606a6de6834d7dcd1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/19/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/16",
        "Amount": "-12.71",
        "Type": "DEBIT_CARD",
        "Balance": "19680.76",
        "Check or Slip #": "",
        "TransactionId": "82cafc5138cd46daed5160b48d0aa2d0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/19/2021",
        "Description": "TACO BELL #31268 ANKENY IA                   04/15",
        "Amount": "-7.41",
        "Type": "DEBIT_CARD",
        "Balance": "19693.47",
        "Check or Slip #": "",
        "TransactionId": "f09817cfb22071288b38f828be67deb3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/15/2021",
        "Description": "CASEYS GEN STORE 2689 ANKENY IA              04/13",
        "Amount": "-31.04",
        "Type": "DEBIT_CARD",
        "Balance": "19700.88",
        "Check or Slip #": "",
        "TransactionId": "e592603e4c4cad94eeed89ac48547881"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/15/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "587.11",
        "Type": "ACH_CREDIT",
        "Balance": "19731.92",
        "Check or Slip #": "",
        "TransactionId": "d4de165b63d5287bbb06da93b39d2f8b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/14/2021",
        "Description": "WENDY'S 8654 ANKENY IA                       04/13",
        "Amount": "-5.93",
        "Type": "DEBIT_CARD",
        "Balance": "19144.81",
        "Check or Slip #": "",
        "TransactionId": "69ae35ec8ff61d942254e4951a24e3af"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/14/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "622.22",
        "Type": "ACH_CREDIT",
        "Balance": "19150.74",
        "Check or Slip #": "",
        "TransactionId": "73f0c3a997cd4d1988a1ed4004721a64"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/13/2021",
        "Description": "CHIPOTLE 2776 ANKENY IA                      04/12",
        "Amount": "-6.18",
        "Type": "DEBIT_CARD",
        "Balance": "18528.52",
        "Check or Slip #": "",
        "TransactionId": "41dcf389d972b8073410e68fc87efd9e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/12",
        "Amount": "-1.75",
        "Type": "DEBIT_CARD",
        "Balance": "18534.7",
        "Check or Slip #": "",
        "TransactionId": "50aba85b60e89966cd74ef31a2dacf50"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/11",
        "Amount": "-1.25",
        "Type": "DEBIT_CARD",
        "Balance": "18536.45",
        "Check or Slip #": "",
        "TransactionId": "1fa0d8d71e80e4bd7b956e1e8c4d9d71"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/10",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "18537.7",
        "Check or Slip #": "",
        "TransactionId": "885f21876efcb58c6c65c6f89ac2aeff"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/12/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/10",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "18539.2",
        "Check or Slip #": "",
        "TransactionId": "d05d51d814abff9c358ecf33a540d2c2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/12/2021",
        "Description": "IOWA ENDODONTICS PC ANKENY IA                04/08",
        "Amount": "-366.21",
        "Type": "DEBIT_CARD",
        "Balance": "18541.2",
        "Check or Slip #": "",
        "TransactionId": "f14a2f901a84c2671d9c0f12b3d92f70"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/08/2021",
        "Description": "ALDI 72035 ANKENY IA                 097126  04/08",
        "Amount": "-42.32",
        "Type": "DEBIT_CARD",
        "Balance": "18907.41",
        "Check or Slip #": "",
        "TransactionId": "0e1dbd9936fc0f4f14df5b8c25f05ac3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/08/2021",
        "Description": "WINGSTOP 1940 ANKENY IA                      04/07",
        "Amount": "-12.18",
        "Type": "DEBIT_CARD",
        "Balance": "18949.73",
        "Check or Slip #": "",
        "TransactionId": "ce208d178b08bfb5e322f78afdb26ad5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/08/2021",
        "Description": "ANKENY DENTAL ASSOCIATE ANKENY IA            04/07",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "18961.91",
        "Check or Slip #": "",
        "TransactionId": "e9790367b152ef20a1d74beff66de856"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/07/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 04/06",
        "Amount": "-3.57",
        "Type": "DEBIT_CARD",
        "Balance": "18971.91",
        "Check or Slip #": "",
        "TransactionId": "0b598df3d6315b265cfa24853c4b53ec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/07/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/06",
        "Amount": "-28.6",
        "Type": "DEBIT_CARD",
        "Balance": "18975.48",
        "Check or Slip #": "",
        "TransactionId": "d4733785087a64da468f063575a0f7a3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/07/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     04/06",
        "Amount": "-9.11",
        "Type": "DEBIT_CARD",
        "Balance": "19004.08",
        "Check or Slip #": "",
        "TransactionId": "257cafa683eb5e3da4f3c4170af6fd77"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/07/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "528.47",
        "Type": "ACH_CREDIT",
        "Balance": "19013.19",
        "Check or Slip #": "",
        "TransactionId": "c7c93e0838a8fc2a46367d2bee80a977"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/06/2021",
        "Description": "MIDAMERICAN      ENERGY     0115123306W044  WEB ID: 4421425214",
        "Amount": "-40",
        "Type": "ACH_DEBIT",
        "Balance": "18484.72",
        "Check or Slip #": "",
        "TransactionId": "af9de1cc1ec2e69bf2c47867aaab3193"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/05/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     141485  04/04",
        "Amount": "-23.74",
        "Type": "DEBIT_CARD",
        "Balance": "18524.72",
        "Check or Slip #": "",
        "TransactionId": "dd0fc1bf8d67f444bca034fd78957969"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/05/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/04",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "18548.46",
        "Check or Slip #": "",
        "TransactionId": "677dd6050d5043e5a0f04ee5162a1d27"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/05/2021",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            04/04",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "18549.46",
        "Check or Slip #": "",
        "TransactionId": "bef0c117c656f829dbf77e48c19715fb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/05/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/02",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "18604.46",
        "Check or Slip #": "",
        "TransactionId": "8b3db0df383a8fc169dbcf258fcbd9e0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/05/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/02",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "18609.46",
        "Check or Slip #": "",
        "TransactionId": "065ad5d21025a09e210fd39ff3d5f595"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/02/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/01",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "18621.46",
        "Check or Slip #": "",
        "TransactionId": "f9a68fdc2bfe615301598ba02c22fb41"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/02/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/01",
        "Amount": "-4.24",
        "Type": "DEBIT_CARD",
        "Balance": "18624.46",
        "Check or Slip #": "",
        "TransactionId": "2f16d54f3e54bd32fbd4b0103a95cc25"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/31",
        "Amount": "-5.2",
        "Type": "DEBIT_CARD",
        "Balance": "18628.7",
        "Check or Slip #": "",
        "TransactionId": "7635cfdd146c83a857a93c9d04ef19fb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2021",
        "Description": "MAIN STREET CAFE & BAKE ANKENY IA            03/30",
        "Amount": "-23.31",
        "Type": "DEBIT_CARD",
        "Balance": "18633.9",
        "Check or Slip #": "",
        "TransactionId": "6b8644b8c3d8eca7c00e3ce2bc4699ba"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/31/2021",
        "Description": "JENSENBRICKHOUSE WEB PMTS   WJZ5D7          WEB ID: 9000615921",
        "Amount": "-850",
        "Type": "ACH_DEBIT",
        "Balance": "18657.21",
        "Check or Slip #": "",
        "TransactionId": "b04e44cbfc50bea194657fb708d1e4a5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/31/2021",
        "Description": "City of Ankeny U PAYMENT    999000000288467 WEB ID: 110312002",
        "Amount": "-48.09",
        "Type": "ACH_DEBIT",
        "Balance": "19507.21",
        "Check or Slip #": "",
        "TransactionId": "223f0facd4c823089abeed8abffe5277"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/31/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "604.69",
        "Type": "ACH_CREDIT",
        "Balance": "19555.3",
        "Check or Slip #": "",
        "TransactionId": "6d8c1bc5b38a68c6fd29b613746917b8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/30/2021",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-72.6",
        "Type": "ACH_DEBIT",
        "Balance": "18950.61",
        "Check or Slip #": "",
        "TransactionId": "0dacc4bd64802c7c26fc8f0115dedbbe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/30/2021",
        "Description": "WENDY'S 8654 ANKENY IA                       03/29",
        "Amount": "-4.24",
        "Type": "DEBIT_CARD",
        "Balance": "19023.21",
        "Check or Slip #": "",
        "TransactionId": "58de47d0bc913345609637efa32929e2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/29/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     300481  03/29",
        "Amount": "-27.63",
        "Type": "DEBIT_CARD",
        "Balance": "19027.45",
        "Check or Slip #": "",
        "TransactionId": "f4860e25e328de5f80fa52bb7b6b60ac"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/29/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/29",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "19055.08",
        "Check or Slip #": "",
        "TransactionId": "8338348d2c7f3b9ebeb707cd4d4f29da"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/29/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/28",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "19056.08",
        "Check or Slip #": "",
        "TransactionId": "63529b5364e2e3a859bafb18e2e97f03"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/29/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/27",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "19057.08",
        "Check or Slip #": "",
        "TransactionId": "2dae920f6fb23f4a1738eb8aa97987e7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2021",
        "Description": "CAPITAL ONE      MOBILE PMT 3FLNFMX5KKL54SD WEB ID: 9279744980",
        "Amount": "-31.24",
        "Type": "ACH_DEBIT",
        "Balance": "19058.08",
        "Check or Slip #": "",
        "TransactionId": "af73b0157cd19ae67c6def16d0827b53"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2021",
        "Description": "FAZOLIS_5913 ANKENY IA                       03/25",
        "Amount": "-3.81",
        "Type": "DEBIT_CARD",
        "Balance": "19089.32",
        "Check or Slip #": "",
        "TransactionId": "c4df410073f55b6df81eeee5db2fe07c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/25/2021",
        "Description": "TARGET T- 2135 SE Dela Ankeny IA             03/25",
        "Amount": "-312.68",
        "Type": "DEBIT_CARD",
        "Balance": "19093.13",
        "Check or Slip #": "",
        "TransactionId": "5459eeace938029eacef365deee4e4d6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/25/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/24",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "19405.81",
        "Check or Slip #": "",
        "TransactionId": "9b96a18a41dab0a9def84c9791664e0e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/25/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/24",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "19440.81",
        "Check or Slip #": "",
        "TransactionId": "bfb8bd825bebd93343eb73880f16a641"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/24/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "653.32",
        "Type": "ACH_CREDIT",
        "Balance": "19443.81",
        "Check or Slip #": "",
        "TransactionId": "f1f47ba007741b6aa5be6154bde03178"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/23/2021",
        "Description": "SONIC DRIVE IN #4871 ANKENY IA               03/22",
        "Amount": "-11.53",
        "Type": "DEBIT_CARD",
        "Balance": "18790.49",
        "Check or Slip #": "",
        "TransactionId": "125796864fdee4b8841a359804e6be83"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/22/2021",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      228040  03/20",
        "Amount": "-2.99",
        "Type": "DEBIT_CARD",
        "Balance": "18802.02",
        "Check or Slip #": "",
        "TransactionId": "1c555b3a3cd6d156677ffd4d565197ca"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/22/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/19",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "18805.01",
        "Check or Slip #": "",
        "TransactionId": "2dfb803c477b6d247b2e28a9e1d10788"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/22/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/19",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "18840.01",
        "Check or Slip #": "",
        "TransactionId": "69669d5ebfc267fb58813c04217e0cc1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/19/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/18",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "18845.01",
        "Check or Slip #": "",
        "TransactionId": "0e17dcf9f423bca59ae4382219340e59"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/18/2021",
        "Description": "POPEYES 11337 ALTOONA IA                     03/17",
        "Amount": "-9.62",
        "Type": "DEBIT_CARD",
        "Balance": "18852.01",
        "Check or Slip #": "",
        "TransactionId": "e1e5161589a504eadf5feaecd47ca4f1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/17/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/17",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "18861.63",
        "Check or Slip #": "",
        "TransactionId": "5d3e5195846e5e119220e62dd2d67876"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/17/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/16",
        "Amount": "-13",
        "Type": "DEBIT_CARD",
        "Balance": "18891.63",
        "Check or Slip #": "",
        "TransactionId": "3b0bbff75a58e80a8ca8f357d638d881"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/17/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/16",
        "Amount": "-7.6",
        "Type": "DEBIT_CARD",
        "Balance": "18904.63",
        "Check or Slip #": "",
        "TransactionId": "8c24fc13c325cc39706e3b12bfb14f24"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/17/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "560.38",
        "Type": "ACH_CREDIT",
        "Balance": "18912.23",
        "Check or Slip #": "",
        "TransactionId": "59bdce5c08545e456ad729b6305e22b8"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/17/2021",
        "Description": "IRS  TREAS 310     TAXEIP3                  PPD ID: 9111736205",
        "Amount": "1400",
        "Type": "ACH_CREDIT",
        "Balance": "18351.85",
        "Check or Slip #": "",
        "TransactionId": "f2d50276b4ccb2fa017d18beed77769c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/15/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/15",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "16951.85",
        "Check or Slip #": "",
        "TransactionId": "8ff9a327c076e106c05d7aaf43f11dc8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/15/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/14",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "16952.85",
        "Check or Slip #": "",
        "TransactionId": "3311c64aac795db34a4122e12b92442c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/15/2021",
        "Description": "WAL-MART #0892 ANKENY IA                     03/14",
        "Amount": "-17.06",
        "Type": "DEBIT_CARD",
        "Balance": "16954.85",
        "Check or Slip #": "",
        "TransactionId": "cb6d121ca3e09d8945af58f946c66be4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/15/2021",
        "Description": "WENDY'S 8654 ANKENY IA                       03/14",
        "Amount": "-6.67",
        "Type": "DEBIT_CARD",
        "Balance": "16971.91",
        "Check or Slip #": "",
        "TransactionId": "9397f104104a4911fe8b0ff8fe81733d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/15/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/14",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "16978.58",
        "Check or Slip #": "",
        "TransactionId": "3ac219668b480aac4d18e015123ba7f9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/15/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/13",
        "Amount": "-15",
        "Type": "DEBIT_CARD",
        "Balance": "16979.58",
        "Check or Slip #": "",
        "TransactionId": "a042577d1490aa076da5b833ede6b43a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/15/2021",
        "Description": "Offer: Dunkin' Donuts",
        "Amount": "0.42",
        "Type": "MISC_CREDIT",
        "Balance": "16994.58",
        "Check or Slip #": "",
        "TransactionId": "db7a10671899121264f2cad39c27f091"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/12/2021",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            03/11",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "16994.16",
        "Check or Slip #": "",
        "TransactionId": "d88079c4ad347aac5bd5d7979efffd4b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/11/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     03/10",
        "Amount": "-7.3",
        "Type": "DEBIT_CARD",
        "Balance": "17049.16",
        "Check or Slip #": "",
        "TransactionId": "cb7e36285459d2390f72cb23b2ae6cda"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/10/2021",
        "Description": "HARDEES 1506082 ANKENY IA                    03/09",
        "Amount": "-5.29",
        "Type": "DEBIT_CARD",
        "Balance": "17056.46",
        "Check or Slip #": "",
        "TransactionId": "c5cf3fdeb7fa46dcb8ebdaf6f356294a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/10/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 03/09",
        "Amount": "-3.57",
        "Type": "DEBIT_CARD",
        "Balance": "17061.75",
        "Check or Slip #": "",
        "TransactionId": "d1044234aa5be7d7fb7f4dd02a061833"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/10/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "504.3",
        "Type": "ACH_CREDIT",
        "Balance": "17065.32",
        "Check or Slip #": "",
        "TransactionId": "2f816f0b2f04131b6cf2035297999e9c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/09/2021",
        "Description": "DUNKIN #351231 ANKENY IA                     03/08",
        "Amount": "-2.12",
        "Type": "DEBIT_CARD",
        "Balance": "16561.02",
        "Check or Slip #": "",
        "TransactionId": "5e506ebb5ad9d5128b805a8b3eda34d1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/08/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     051659  03/08",
        "Amount": "-18.58",
        "Type": "DEBIT_CARD",
        "Balance": "16563.14",
        "Check or Slip #": "",
        "TransactionId": "8b3b0c0b26cf89a41c2929ba376219a4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/08/2021",
        "Description": "RAISING CANE'S 0667 ALTOONA IA               03/08",
        "Amount": "-8.29",
        "Type": "DEBIT_CARD",
        "Balance": "16581.72",
        "Check or Slip #": "",
        "TransactionId": "28810d0449993d09a368d70a2990bb56"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/05/2021",
        "Description": "CASEYS GEN STORE 2689 ANKENY IA              03/03",
        "Amount": "-28.26",
        "Type": "DEBIT_CARD",
        "Balance": "16590.01",
        "Check or Slip #": "",
        "TransactionId": "b133f2edcf62da66be700cc8f2da4965"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/05/2021",
        "Description": "TACO JOHNS 9427 ANKENY IA                    03/03",
        "Amount": "-10.31",
        "Type": "DEBIT_CARD",
        "Balance": "16618.27",
        "Check or Slip #": "",
        "TransactionId": "83c960c22cbdce62c112418f1da34a03"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/04/2021",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             03/04",
        "Amount": "-58.63",
        "Type": "DEBIT_CARD",
        "Balance": "16628.58",
        "Check or Slip #": "",
        "TransactionId": "bc86010c783a6c2bb3ff5838a5f2faa2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/04/2021",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 03/03",
        "Amount": "-2.4",
        "Type": "DEBIT_CARD",
        "Balance": "16687.21",
        "Check or Slip #": "",
        "TransactionId": "a6ef5acd64cc38053cd05145b6361fe3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/04/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/03",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "16689.61",
        "Check or Slip #": "",
        "TransactionId": "3f5f15dcb5b10c7fabdcb3a9a7198aa3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/03/2021",
        "Description": "MIDAMERICAN      ENERGY     0115123306W020  WEB ID: 4421425214",
        "Amount": "-40",
        "Type": "ACH_DEBIT",
        "Balance": "16695.61",
        "Check or Slip #": "",
        "TransactionId": "7da7e5362da03117b91701f0a0a0da2e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/03/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     03/02",
        "Amount": "-11",
        "Type": "DEBIT_CARD",
        "Balance": "16735.61",
        "Check or Slip #": "",
        "TransactionId": "aaf3a09da08d6e0d729592e6aa83ab7a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/03/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "537.46",
        "Type": "ACH_CREDIT",
        "Balance": "16746.61",
        "Check or Slip #": "",
        "TransactionId": "ffa22077ff5f396808d5097fbce28bc7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/02/2021",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-72.6",
        "Type": "ACH_DEBIT",
        "Balance": "16209.15",
        "Check or Slip #": "",
        "TransactionId": "f7ac6546da99fa9bb868e950abd2709e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/02/2021",
        "Description": "JENSENBRICKHOUSE WEB PMTS   75BP77          WEB ID: 9000615921",
        "Amount": "-850",
        "Type": "ACH_DEBIT",
        "Balance": "16281.75",
        "Check or Slip #": "",
        "TransactionId": "eac5e1d607a14c5310027f4d6faf7005"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/02/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/01",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "17131.75",
        "Check or Slip #": "",
        "TransactionId": "76313ff9b1ea31f1643c635fb2bb3c64"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/01/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/01",
        "Amount": "-1.2",
        "Type": "DEBIT_CARD",
        "Balance": "17151.75",
        "Check or Slip #": "",
        "TransactionId": "dc389f833d935654916b3a01bb391b74"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/01/2021",
        "Description": "CULVERS ANKENY ANKENY IA                     02/27",
        "Amount": "-9.11",
        "Type": "DEBIT_CARD",
        "Balance": "17152.95",
        "Check or Slip #": "",
        "TransactionId": "041a8e069155c06afdb027f5f2f1e3c1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/01/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/27",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "17162.06",
        "Check or Slip #": "",
        "TransactionId": "e858763df3b9124ce9c551a07e23ea92"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/01/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/26",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "17163.06",
        "Check or Slip #": "",
        "TransactionId": "9a6c5c8daa957caf6204f287e8fe1767"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/26/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     236657  02/26",
        "Amount": "-18.89",
        "Type": "DEBIT_CARD",
        "Balance": "17165.06",
        "Check or Slip #": "",
        "TransactionId": "6a76a4ba1336eec83f45aedeb531e6fd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/25/2021",
        "Description": "City of Ankeny U PAYMENT    999000000266112 WEB ID: 110312002",
        "Amount": "-50.58",
        "Type": "ACH_DEBIT",
        "Balance": "17183.95",
        "Check or Slip #": "",
        "TransactionId": "f485ce5bd32d17d293d1ed0ca230a2fc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/25/2021",
        "Description": "TACO BELL #31560 ANKENY IA                   02/24",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "17234.53",
        "Check or Slip #": "",
        "TransactionId": "b2946ca3fd2f54c174e870920ed855a0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/24/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/23",
        "Amount": "-4.5",
        "Type": "DEBIT_CARD",
        "Balance": "17239.83",
        "Check or Slip #": "",
        "TransactionId": "eb36f2aa47ad945c5627a5d8aaea6219"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/24/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "572.15",
        "Type": "ACH_CREDIT",
        "Balance": "17244.33",
        "Check or Slip #": "",
        "TransactionId": "8075b1cbccd7dd6fa2a5b4f13f83b8bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/23/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/22",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "16672.18",
        "Check or Slip #": "",
        "TransactionId": "d44174154adbedca26c6e0e1b0c46d5e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/22/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/22",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "16682.18",
        "Check or Slip #": "",
        "TransactionId": "94a9dbba5e829e0662d759acf40a6627"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/22/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/21",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "16684.18",
        "Check or Slip #": "",
        "TransactionId": "6afb8de420dbc5b9327415dbe4a261f2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/19",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "16685.68",
        "Check or Slip #": "",
        "TransactionId": "bb9e9fee9b39f9cfa7ab7d8dc532c647"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/19",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "16687.68",
        "Check or Slip #": "",
        "TransactionId": "e4c1f54ad6b3e526ad863cebec20a232"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2021",
        "Description": "TARGET        00019398 ALTOONA IA            02/18",
        "Amount": "-18.96",
        "Type": "DEBIT_CARD",
        "Balance": "16688.68",
        "Check or Slip #": "",
        "TransactionId": "51511096694400171d0e74337775b34b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2021",
        "Description": "RAISING CANE'S 0667 ALTOONA IA               02/19",
        "Amount": "-8.29",
        "Type": "DEBIT_CARD",
        "Balance": "16707.64",
        "Check or Slip #": "",
        "TransactionId": "792f13f2a68c8dd3f3b8d46af30bf021"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/18/2021",
        "Description": "CAPITAL ONE      MOBILE PMT 3FE0WV2GRW3NO1P WEB ID: 9279744980",
        "Amount": "-26.41",
        "Type": "ACH_DEBIT",
        "Balance": "16715.93",
        "Check or Slip #": "",
        "TransactionId": "b226d13038a7820f49126f02ad84c907"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/17/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/16",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "16742.34",
        "Check or Slip #": "",
        "TransactionId": "c3766c39418639bcf3d174d639d3a93b"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/17/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "551.05",
        "Type": "ACH_CREDIT",
        "Balance": "16752.34",
        "Check or Slip #": "",
        "TransactionId": "fb8e29acdca4b6bf7d07fba221a8cd94"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/16/2021",
        "Description": "HY-VEE ANKENY 10 410 N ANKENY IA     262800  02/16",
        "Amount": "-76.3",
        "Type": "DEBIT_CARD",
        "Balance": "16201.29",
        "Check or Slip #": "",
        "TransactionId": "3dc5042dc2d7a075507a7d6193fd143e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/16/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/15",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "16277.59",
        "Check or Slip #": "",
        "TransactionId": "acf81c278cee1ef1c022d97cc567f034"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/16/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/14",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "16282.59",
        "Check or Slip #": "",
        "TransactionId": "2181a10cb883647293a5d81b26959dbf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/16/2021",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/14",
        "Amount": "-15",
        "Type": "DEBIT_CARD",
        "Balance": "16287.59",
        "Check or Slip #": "",
        "TransactionId": "f706cfb1727ed8b6601a5a04b8419edb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/10/2021",
        "Description": "HARDEES 1506082 ANKENY IA                    02/09",
        "Amount": "-10.05",
        "Type": "DEBIT_CARD",
        "Balance": "16302.59",
        "Check or Slip #": "",
        "TransactionId": "cc13e58b58a28009d1200f919fb8d8b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/10/2021",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            02/09",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "16312.64",
        "Check or Slip #": "",
        "TransactionId": "b6d329735728d339764cfa0db8320e6e"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/10/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "629.3",
        "Type": "ACH_CREDIT",
        "Balance": "16367.64",
        "Check or Slip #": "",
        "TransactionId": "b09e42739408d4dd6595f3af9e530a01"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/09/2021",
        "Description": "SONIC DRIVE IN #4871 ANKENY IA               02/08",
        "Amount": "-13.12",
        "Type": "DEBIT_CARD",
        "Balance": "15738.34",
        "Check or Slip #": "",
        "TransactionId": "311329a4e88eb5971c89257bab66122b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/03/2021",
        "Description": "PANDA EXPRESS #2710 ANKENY IA                02/02",
        "Amount": "-9",
        "Type": "DEBIT_CARD",
        "Balance": "15751.46",
        "Check or Slip #": "",
        "TransactionId": "ae9921fda2c1b1798bfa28290cb5ea41"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/03/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "618.38",
        "Type": "ACH_CREDIT",
        "Balance": "15760.46",
        "Check or Slip #": "",
        "TransactionId": "32980d8d1fc95f17084643bddb77ce19"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/02/2021",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             02/02",
        "Amount": "-52.01",
        "Type": "DEBIT_CARD",
        "Balance": "15142.08",
        "Check or Slip #": "",
        "TransactionId": "278ccc4f1caef9e300ad5f9ee29d2490"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2021",
        "Description": "MIDAMERICAN      ENERGY     0115123306W995  WEB ID: 4421425214",
        "Amount": "-40",
        "Type": "ACH_DEBIT",
        "Balance": "15194.09",
        "Check or Slip #": "",
        "TransactionId": "566af3a428f3ab8c67f002e9df7e4b54"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2021",
        "Description": "PROG UNIVERSAL   INS PREM                   PPD ID: 9409348039",
        "Amount": "-72.64",
        "Type": "ACH_DEBIT",
        "Balance": "15234.09",
        "Check or Slip #": "",
        "TransactionId": "635027c8e9d531e3f2a8f4188d132c1b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2021",
        "Description": "CASEYS GEN STORE 2689 ANKENY IA              01/27",
        "Amount": "-22.35",
        "Type": "DEBIT_CARD",
        "Balance": "15306.73",
        "Check or Slip #": "",
        "TransactionId": "ecac92efba2227df50304925ff82df33"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2021",
        "Description": "WEBULL FINANCIAL ACH        20210127164517  WEB ID: 2561673990",
        "Amount": "-2000",
        "Type": "ACH_DEBIT",
        "Balance": "15329.08",
        "Check or Slip #": "",
        "TransactionId": "83ff6962cebf0a3e8d648a105b5791be"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2021",
        "Description": "Wal-Mart Super Center ANKENY IA              01/28",
        "Amount": "-80.67",
        "Type": "DEBIT_CARD",
        "Balance": "17329.08",
        "Check or Slip #": "",
        "TransactionId": "4338cd6a135230d3881504996306e5cd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2021",
        "Description": "SONIC DRIVE IN #4871 ANKENY IA               01/27",
        "Amount": "-11.53",
        "Type": "DEBIT_CARD",
        "Balance": "17409.75",
        "Check or Slip #": "",
        "TransactionId": "40476cb2c25b11b7951657785d3a1207"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/27/2021",
        "Description": "City of Ankeny U PAYMENT    999000000247487 WEB ID: 110312002",
        "Amount": "-49.34",
        "Type": "ACH_DEBIT",
        "Balance": "17421.28",
        "Check or Slip #": "",
        "TransactionId": "b40376064e91ee7030bc2ead5c05b482"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/27/2021",
        "Description": "JENSENBRICKHOUSE WEB PMTS   5BKT17          WEB ID: 9000615921",
        "Amount": "-850",
        "Type": "ACH_DEBIT",
        "Balance": "17470.62",
        "Check or Slip #": "",
        "TransactionId": "eb6fac2cdb3949cd0e788e5659937bac"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/27/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "625.62",
        "Type": "ACH_CREDIT",
        "Balance": "18320.62",
        "Check or Slip #": "",
        "TransactionId": "9089a77d33a01ef2412e4d8926722dbd"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/25/2021",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "3.66",
        "Type": "ACH_CREDIT",
        "Balance": "17695",
        "Check or Slip #": "",
        "TransactionId": "6ce22b196e6e82be4facca8d69e3ffdc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/21/2021",
        "Description": "Wal-Mart Super Center ANKENY IA              01/21",
        "Amount": "-65.26",
        "Type": "DEBIT_CARD",
        "Balance": "17691.34",
        "Check or Slip #": "",
        "TransactionId": "8214c49de47dc03b37e8a0098d3da13a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/20/2021",
        "Description": "HARDEES 1506082 ANKENY IA                    01/19",
        "Amount": "-10.05",
        "Type": "DEBIT_CARD",
        "Balance": "17756.6",
        "Check or Slip #": "",
        "TransactionId": "f8c03858d7a8b09ee90ea9940d299e70"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/20/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "577.34",
        "Type": "ACH_CREDIT",
        "Balance": "17766.65",
        "Check or Slip #": "",
        "TransactionId": "e2acee8ebe09408ae9c8b5f0bb26c2b8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/19/2021",
        "Description": "CAPITAL ONE      MOBILE PMT 3F73N39EEB2WK8T WEB ID: 9279744980",
        "Amount": "-28.27",
        "Type": "ACH_DEBIT",
        "Balance": "17189.31",
        "Check or Slip #": "",
        "TransactionId": "168490208c898d0682d0d06989aad162"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/15/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "132.25",
        "Type": "ACH_CREDIT",
        "Balance": "17217.58",
        "Check or Slip #": "",
        "TransactionId": "cf388209fbc3c527b399ac0904e3563e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2021",
        "Description": "Wal-Mart Super Center ANKENY IA              01/14",
        "Amount": "-77.85",
        "Type": "DEBIT_CARD",
        "Balance": "17085.33",
        "Check or Slip #": "",
        "TransactionId": "3a63243c67ecb1707cc854a129aca6e7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2021",
        "Description": "ROSS STORES #2113 WEST DES MOIN IA           01/13",
        "Amount": "-36.35",
        "Type": "DEBIT_CARD",
        "Balance": "17163.18",
        "Check or Slip #": "",
        "TransactionId": "256cc75b3757b18b28cf5c041cb3877c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2021",
        "Description": "RAISING CANE'S 0665 WEST DES MOIN IA         01/14",
        "Amount": "-8.29",
        "Type": "DEBIT_CARD",
        "Balance": "17199.53",
        "Check or Slip #": "",
        "TransactionId": "cf4da9a93f9853676fe87b7c4f3eff38"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/14/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "472.69",
        "Type": "ACH_CREDIT",
        "Balance": "17207.82",
        "Check or Slip #": "",
        "TransactionId": "387592d2d013e48666e212848f52f808"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/13/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "599.04",
        "Type": "ACH_CREDIT",
        "Balance": "16735.13",
        "Check or Slip #": "",
        "TransactionId": "58fa2997e372389c230ed8a0985ea5e8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/11/2021",
        "Description": "CAPITAL ONE      MOBILE PMT 3F5L6L6KL5AYEM5 WEB ID: 9279744980",
        "Amount": "-30",
        "Type": "ACH_DEBIT",
        "Balance": "16136.09",
        "Check or Slip #": "",
        "TransactionId": "1ba12ab6f0281afd16c86b6d086bbe0c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/08/2021",
        "Description": "FAZOLIS_5913 ANKENY IA                       01/07",
        "Amount": "-11.32",
        "Type": "DEBIT_CARD",
        "Balance": "16166.09",
        "Check or Slip #": "",
        "TransactionId": "d98017cb039070dca2ede6d7f2ea66d6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2021",
        "Description": "BURGER KING #10435 ANKENY IA                 01/04",
        "Amount": "-4.24",
        "Type": "DEBIT_CARD",
        "Balance": "16177.41",
        "Check or Slip #": "",
        "TransactionId": "417a847cd781691200cd11d194faac79"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/06/2021",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "676.25",
        "Type": "ACH_CREDIT",
        "Balance": "16181.65",
        "Check or Slip #": "",
        "TransactionId": "8b95fe3ad17684bcf64e824e22a3e9db"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/04/2021",
        "Description": "IRS  TREAS 310   XXTAXEIP2                  PPD ID: 9111736098",
        "Amount": "600",
        "Type": "ACH_CREDIT",
        "Balance": "15505.4",
        "Check or Slip #": "",
        "TransactionId": "4965c6ae401827480ad4963f9ea6b299"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/30/2020",
        "Description": "MIDAMERICAN      ENERGY     0115123306W974  WEB ID: 4421425214",
        "Amount": "-40",
        "Type": "ACH_DEBIT",
        "Balance": "14905.4",
        "Check or Slip #": "",
        "TransactionId": "0926833d73a5bd1c73cbfd8defd91738"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/30/2020",
        "Description": "BURGER KING #10435 ANKENY IA                 12/28",
        "Amount": "-6.23",
        "Type": "DEBIT_CARD",
        "Balance": "14945.4",
        "Check or Slip #": "",
        "TransactionId": "628cc2e5550c33c6650e6d81571f1616"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/30/2020",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "2.2",
        "Type": "ACH_CREDIT",
        "Balance": "14951.63",
        "Check or Slip #": "",
        "TransactionId": "dd49b5a5a83a4822be4c80bc3eb3a98f"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/30/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "606.22",
        "Type": "ACH_CREDIT",
        "Balance": "14949.43",
        "Check or Slip #": "",
        "TransactionId": "8c3f9c14c0be212e5b8d23dcd67f760c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/29/2020",
        "Description": "JENSENBRICKHOUSE WEB PMTS   XSR3X6          WEB ID: 9000615921",
        "Amount": "-857.47",
        "Type": "ACH_DEBIT",
        "Balance": "14343.21",
        "Check or Slip #": "",
        "TransactionId": "a2d3dbc99dd1d30bfa1251f26d9cec14"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/29/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/28",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "15200.68",
        "Check or Slip #": "",
        "TransactionId": "71a6bce10e4905197ad5e64b4708fc4e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/28/2020",
        "Description": "City of Ankeny U PAYMENT    999000000226161 WEB ID: 110312002",
        "Amount": "-143.11",
        "Type": "ACH_DEBIT",
        "Balance": "15202.68",
        "Check or Slip #": "",
        "TransactionId": "6f87dd50f3879c5fd831fd7267053ae4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/28/2020",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             12/28",
        "Amount": "-36.3",
        "Type": "DEBIT_CARD",
        "Balance": "15345.79",
        "Check or Slip #": "",
        "TransactionId": "f125f8f121fc36abdd4106cbe5f3f8c2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/28/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/26",
        "Amount": "-55",
        "Type": "DEBIT_CARD",
        "Balance": "15382.09",
        "Check or Slip #": "",
        "TransactionId": "29192df63d2c9f28e2c9103f3382929e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/28/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/24",
        "Amount": "-6.1",
        "Type": "DEBIT_CARD",
        "Balance": "15437.09",
        "Check or Slip #": "",
        "TransactionId": "1dcfb9e367561904e08b1723cfa147e0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/28/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/24",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "15443.19",
        "Check or Slip #": "",
        "TransactionId": "832c5292a93b8169a727713039eb4270"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/24/2020",
        "Description": "SONIC DRIVE IN #4871 ANKENY IA               12/23",
        "Amount": "-10.17",
        "Type": "DEBIT_CARD",
        "Balance": "15445.19",
        "Check or Slip #": "",
        "TransactionId": "1601fdd6c373e62fa5be79ad7f2e2be0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/23/2020",
        "Description": "CULVER S OF ANKENY #119 ANKENY IA            12/22",
        "Amount": "-7.3",
        "Type": "DEBIT_CARD",
        "Balance": "15455.36",
        "Check or Slip #": "",
        "TransactionId": "ec0ddb1a8ceb2ca8875d40c49655e690"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/23/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "613.33",
        "Type": "ACH_CREDIT",
        "Balance": "15462.66",
        "Check or Slip #": "",
        "TransactionId": "214ce6746a76de68e06ab7105eef6b3c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/22/2020",
        "Description": "IA DOT DRIVER SVCS 042 ANKENY IA     923151  12/22",
        "Amount": "-33.5",
        "Type": "DEBIT_CARD",
        "Balance": "14849.33",
        "Check or Slip #": "",
        "TransactionId": "7eedccbd90dc5be9b52a5342c2f1cef5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/22/2020",
        "Description": "CASEYS GEN STORE 2689 ANKENY IA              12/20",
        "Amount": "-26.43",
        "Type": "DEBIT_CARD",
        "Balance": "14882.83",
        "Check or Slip #": "",
        "TransactionId": "0a8a526845b5442e689c4e16f0c76e78"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/21/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/21",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "14909.26",
        "Check or Slip #": "",
        "TransactionId": "44a6b0aadb3266cc08ecef4bc07a31e3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/21/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/19",
        "Amount": "-27.86",
        "Type": "DEBIT_CARD",
        "Balance": "14911.26",
        "Check or Slip #": "",
        "TransactionId": "bd19a7afdc163c60c28dc5a3998d0c5c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/21/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/19",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "14939.12",
        "Check or Slip #": "",
        "TransactionId": "bd4929edd1bab3f703339efe2533cf99"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/17/2020",
        "Description": "CHICK-FIL-A #03303 ANKENY IA                 12/15",
        "Amount": "-8.43",
        "Type": "DEBIT_CARD",
        "Balance": "14940.12",
        "Check or Slip #": "",
        "TransactionId": "7603f60f47624843faee84f7a98e933a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/16/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "662.25",
        "Type": "ACH_CREDIT",
        "Balance": "14948.55",
        "Check or Slip #": "",
        "TransactionId": "57fba110289618d2e5f81d4230bf763e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/15/2020",
        "Description": "WM SUPERC Wal-Mart Sup ANKENY IA             12/15",
        "Amount": "-34.26",
        "Type": "DEBIT_CARD",
        "Balance": "14286.3",
        "Check or Slip #": "",
        "TransactionId": "4dc2da54d161322a853ac83f1e1051e2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/11/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/10",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "14320.56",
        "Check or Slip #": "",
        "TransactionId": "f0fbcc85a2cfc0f0c340cba2a260c442"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/09",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "14340.56",
        "Check or Slip #": "",
        "TransactionId": "a6ef411a14360bb82a035d78dade33a6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            12/09",
        "Amount": "-80.5",
        "Type": "DEBIT_CARD",
        "Balance": "14350.56",
        "Check or Slip #": "",
        "TransactionId": "45fad68e5908d67d116d66454a6bcbe6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2020",
        "Description": "BURGER KING #10435 ANKENY IA                 12/08",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "14431.06",
        "Check or Slip #": "",
        "TransactionId": "e0066bc1e412ad18ca547d917115f645"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/09/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "662.95",
        "Type": "ACH_CREDIT",
        "Balance": "14436.36",
        "Check or Slip #": "",
        "TransactionId": "1d540103bb09d3824a2c707f1708ffbf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/08/2020",
        "Description": "TARGET T- 2135 SE Dela Ankeny IA             12/08",
        "Amount": "-19.27",
        "Type": "DEBIT_CARD",
        "Balance": "13773.41",
        "Check or Slip #": "",
        "TransactionId": "f421c11b651ac64c78cecef8163640f2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/08/2020",
        "Description": "WAL-MART #0892 ANKENY IA                     12/08",
        "Amount": "-42.96",
        "Type": "DEBIT_CARD",
        "Balance": "13792.68",
        "Check or Slip #": "",
        "TransactionId": "55cb327dad08d57385c2dbbc96fe2d78"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/08/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/07",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "13835.64",
        "Check or Slip #": "",
        "TransactionId": "ebb0218b11a23b34ba2ed0bfcb62d04c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/07/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/07",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "13837.14",
        "Check or Slip #": "",
        "TransactionId": "4c1bd6a3c6878cf954c65c8c8487f309"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/07/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/06",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "13839.14",
        "Check or Slip #": "",
        "TransactionId": "d8b76136dbd672d58c8834c0afab116e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/07/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/05",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "13840.64",
        "Check or Slip #": "",
        "TransactionId": "a421de6f86d31995f6e975b9527976b2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/04/2020",
        "Description": "CASEYS GEN STORE 2689 ANKENY IA              12/02",
        "Amount": "-25.16",
        "Type": "DEBIT_CARD",
        "Balance": "13841.64",
        "Check or Slip #": "",
        "TransactionId": "8f12de4da747fcf5520c472ecf36ca7b"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/04/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "85.58",
        "Type": "ACH_CREDIT",
        "Balance": "13866.8",
        "Check or Slip #": "",
        "TransactionId": "22ac0e36b020f48d84286ccbde41e8f0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/03/2020",
        "Description": "FAZOLIS_5913 ANKENY IA                       12/02",
        "Amount": "-9.2",
        "Type": "DEBIT_CARD",
        "Balance": "13781.22",
        "Check or Slip #": "",
        "TransactionId": "bcdc2a5af2c7fde589863495d42932c0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/03/2020",
        "Description": "MCDONALD'S F35350 ANKENY IA                  12/02",
        "Amount": "-4.01",
        "Type": "DEBIT_CARD",
        "Balance": "13790.42",
        "Check or Slip #": "",
        "TransactionId": "d8becb661aee36e524fcc190957219ab"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2020",
        "Description": "BEST BUY      00015123 ANKENY IA     174285  12/02",
        "Amount": "-158.99",
        "Type": "DEBIT_CARD",
        "Balance": "13794.43",
        "Check or Slip #": "",
        "TransactionId": "2d382487073cd75bf3464368ebd31472"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2020",
        "Description": "HARDEES 1506082 ANKENY IA                    12/01",
        "Amount": "-9.94",
        "Type": "DEBIT_CARD",
        "Balance": "13953.42",
        "Check or Slip #": "",
        "TransactionId": "aa7ada18a93f0b92f0a77ecee07a7484"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/02/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "645.77",
        "Type": "ACH_CREDIT",
        "Balance": "13963.36",
        "Check or Slip #": "",
        "TransactionId": "432bffee2217ca9d4b157646520130e5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/01/2020",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-77.13",
        "Type": "ACH_DEBIT",
        "Balance": "13317.59",
        "Check or Slip #": "",
        "TransactionId": "25289d128cde9b44925e3036b279af7f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/01/2020",
        "Description": "JENSENBRICKHOUSE WEB PMTS   XX1PR6          WEB ID: 9000615921",
        "Amount": "-903.08",
        "Type": "ACH_DEBIT",
        "Balance": "13394.72",
        "Check or Slip #": "",
        "TransactionId": "b240ac140499e66853b398b047d56eef"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/30/2020",
        "Description": "MIDAMERICAN      ENERGY     0115123306W954  WEB ID: 4421425214",
        "Amount": "-40",
        "Type": "ACH_DEBIT",
        "Balance": "14297.8",
        "Check or Slip #": "",
        "TransactionId": "0ad0695b514c97d99040149adb505490"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/30/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/28",
        "Amount": "-57",
        "Type": "DEBIT_CARD",
        "Balance": "14337.8",
        "Check or Slip #": "",
        "TransactionId": "ab960c81969c501409bb0ca49692ce9c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/30/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/28",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "14394.8",
        "Check or Slip #": "",
        "TransactionId": "09374de377b8c1264cc9b418418eda39"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/30/2020",
        "Description": "ARBYS 5722 ANKENY IA                         11/27",
        "Amount": "-5.33",
        "Type": "DEBIT_CARD",
        "Balance": "14399.8",
        "Check or Slip #": "",
        "TransactionId": "401cc8cbe4a484a229657249ac4bdf22"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/30/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/27",
        "Amount": "-249.29",
        "Type": "DEBIT_CARD",
        "Balance": "14405.13",
        "Check or Slip #": "",
        "TransactionId": "8b1d85e9f1c692cfd5d0a8bfa8cbf8e6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/27/2020",
        "Description": "CASEYS GEN STORE 1310 ANKENY IA      002781  11/26",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "14654.42",
        "Check or Slip #": "",
        "TransactionId": "9cb1e1eca0de94218db533792614040d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/25/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/24",
        "Amount": "-16",
        "Type": "DEBIT_CARD",
        "Balance": "14664.42",
        "Check or Slip #": "",
        "TransactionId": "7b1bf580b671de2aa4047528eaa005ca"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/25/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "661.09",
        "Type": "ACH_CREDIT",
        "Balance": "14680.42",
        "Check or Slip #": "",
        "TransactionId": "fb64565db4aa514b9eee999841640987"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/24/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/23",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "14019.33",
        "Check or Slip #": "",
        "TransactionId": "9146f3867ad8a2f26bb3c792babbe8c7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/23/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/23",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "14029.33",
        "Check or Slip #": "",
        "TransactionId": "9085828fadc945f875352f68017a292c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/23/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/22",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "14031.33",
        "Check or Slip #": "",
        "TransactionId": "7767016799a9ef72e390e530ebe74f23"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/23/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/21",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "14033.33",
        "Check or Slip #": "",
        "TransactionId": "79fb13ecabec1b3038c0da290bca7c9a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/19",
        "Amount": "-23",
        "Type": "DEBIT_CARD",
        "Balance": "14034.33",
        "Check or Slip #": "",
        "TransactionId": "47cd481ff8b58ac8f5a8479c0fe7755d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/19",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "14057.33",
        "Check or Slip #": "",
        "TransactionId": "08dac193ca54551b418a1a1309049527"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2020",
        "Description": "MCDONALD'S F12235 WEST DES MOIN IA           11/18",
        "Amount": "-1.06",
        "Type": "DEBIT_CARD",
        "Balance": "14063.33",
        "Check or Slip #": "",
        "TransactionId": "841607e5ceb885cda6161900f62909f8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2020",
        "Description": "BURGER KING #10435 ANKENY IA                 11/17",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "14064.39",
        "Check or Slip #": "",
        "TransactionId": "1a31386660531330020821bdf7579e64"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/18/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "655.59",
        "Type": "ACH_CREDIT",
        "Balance": "14069.69",
        "Check or Slip #": "",
        "TransactionId": "3a337f5e028fe324e9c1ec74bb39ee97"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/16/2020",
        "Description": "TARGET T- 2135 SE Dela Ankeny IA             11/16",
        "Amount": "-11.47",
        "Type": "DEBIT_CARD",
        "Balance": "13414.1",
        "Check or Slip #": "",
        "TransactionId": "994bc44ebd528c2212fc2cb186bf5930"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/16/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/16",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "13425.57",
        "Check or Slip #": "",
        "TransactionId": "6d5f0e9aff81d83b154efe8a64501ce1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/16/2020",
        "Description": "BEST BUY      00015123 ANKENY IA     691156  11/15",
        "Amount": "-116.59",
        "Type": "DEBIT_CARD",
        "Balance": "13426.57",
        "Check or Slip #": "",
        "TransactionId": "aff3253556de2fbc112de41e35142a85"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/16/2020",
        "Description": "CASEYS GEN STORE 2689 ANKENY IA              11/14",
        "Amount": "-23.58",
        "Type": "DEBIT_CARD",
        "Balance": "13543.16",
        "Check or Slip #": "",
        "TransactionId": "ecf4042eb3ba4ab93824500acdc2a99d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/16/2020",
        "Description": "Wal-Mart Super Center ANKENY IA              11/14",
        "Amount": "-8.92",
        "Type": "DEBIT_CARD",
        "Balance": "13566.74",
        "Check or Slip #": "",
        "TransactionId": "1f6236c83ec4d888156a165ea666aba6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/16/2020",
        "Description": "HARDEES 1506082 ANKENY IA                    11/14",
        "Amount": "-9.94",
        "Type": "DEBIT_CARD",
        "Balance": "13575.66",
        "Check or Slip #": "",
        "TransactionId": "562eb226101593b53985d67aacf59874"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/12/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/11",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "13585.6",
        "Check or Slip #": "",
        "TransactionId": "e7583d0f4dfcf1d74ea267a28f0f7d07"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/12/2020",
        "Description": "RAISING CANE 8 WEST DES MOIN IA              11/11",
        "Amount": "-7.46",
        "Type": "DEBIT_CARD",
        "Balance": "13620.6",
        "Check or Slip #": "",
        "TransactionId": "62dff1ea5ebe916b5ba431269824c42d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/12/2020",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 11/10",
        "Amount": "-4.44",
        "Type": "DEBIT_CARD",
        "Balance": "13628.06",
        "Check or Slip #": "",
        "TransactionId": "14e0b2bf20ee46e9f4d1175c57b38911"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/10/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/09",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "13632.5",
        "Check or Slip #": "",
        "TransactionId": "ead46ad3e43fea5e058e19f7950a5cb7"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/10/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "690.54",
        "Type": "ACH_CREDIT",
        "Balance": "13644.5",
        "Check or Slip #": "",
        "TransactionId": "75e4bf180f67b2256d84c333a7fe7b95"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            11/06",
        "Amount": "-80.5",
        "Type": "DEBIT_CARD",
        "Balance": "12953.96",
        "Check or Slip #": "",
        "TransactionId": "690907c3fb7852d3c9f4366abab2516f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/05",
        "Amount": "-13",
        "Type": "DEBIT_CARD",
        "Balance": "13034.46",
        "Check or Slip #": "",
        "TransactionId": "b5726e0aba8ab3ddf50d83d02921195e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2020",
        "Description": "MCDONALD'S F3207 ANKENY IA                   11/04",
        "Amount": "-3.37",
        "Type": "DEBIT_CARD",
        "Balance": "13047.46",
        "Check or Slip #": "",
        "TransactionId": "69607792b76816ea65960e6b7afb4bd4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/04/2020",
        "Description": "COLDSTONE #23531 ANKENY IA                   11/04",
        "Amount": "-4.76",
        "Type": "DEBIT_CARD",
        "Balance": "13050.83",
        "Check or Slip #": "",
        "TransactionId": "41e589d45373dbc2908edbbabe3649da"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/04/2020",
        "Description": "HARDEES 1506082 ANKENY IA                    11/03",
        "Amount": "-8.67",
        "Type": "DEBIT_CARD",
        "Balance": "13055.59",
        "Check or Slip #": "",
        "TransactionId": "478a2b487ffe120d92e41eb5ef4e8ab5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/04/2020",
        "Description": "BURGER KING #10435 ANKENY IA                 11/02",
        "Amount": "-4.24",
        "Type": "DEBIT_CARD",
        "Balance": "13064.26",
        "Check or Slip #": "",
        "TransactionId": "1772d971963c003b69d67481a9c395c9"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/04/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "664.63",
        "Type": "ACH_CREDIT",
        "Balance": "13068.5",
        "Check or Slip #": "",
        "TransactionId": "37cc4ee810afb7b88c0fd7d7bf763c60"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/02/2020",
        "Description": "Wal-Mart Super Center ALTOONA IA             11/02",
        "Amount": "-18.26",
        "Type": "DEBIT_CARD",
        "Balance": "12403.87",
        "Check or Slip #": "",
        "TransactionId": "15bfe161d79e338a67edfbb4b4c25e81"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2020",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-58.87",
        "Type": "ACH_DEBIT",
        "Balance": "12422.13",
        "Check or Slip #": "",
        "TransactionId": "f15ae2d9b1ea2fe93e83be0d51c6a4eb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2020",
        "Description": "CASEYS GEN STORE 2689 ANKENY IA              10/28",
        "Amount": "-24.56",
        "Type": "DEBIT_CARD",
        "Balance": "12481",
        "Check or Slip #": "",
        "TransactionId": "0be0dd67df5880e3995966ef0721d7da"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2020",
        "Description": "CAPITAL ONE      MOBILE PMT 030239800350747 WEB ID: 9279744980",
        "Amount": "-121.84",
        "Type": "ACH_DEBIT",
        "Balance": "12505.56",
        "Check or Slip #": "",
        "TransactionId": "61fb051fb0aba16b1cdda6a9df895c05"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2020",
        "Description": "JENSENBRICKHOUSE WEB PMTS   X38QL6          WEB ID: 9000615921",
        "Amount": "-853.78",
        "Type": "ACH_DEBIT",
        "Balance": "12627.4",
        "Check or Slip #": "",
        "TransactionId": "764ed4146ada8f9cc7e8b67cca2ff9b1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2020",
        "Description": "WAL-MART #0892 ANKENY IA                     10/29",
        "Amount": "-23.91",
        "Type": "DEBIT_CARD",
        "Balance": "13481.18",
        "Check or Slip #": "",
        "TransactionId": "a385b81688a500d6de6f350e2beb93b1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2020",
        "Description": "ARBYS 8464 DES MOINES IA                     10/28",
        "Amount": "-9.19",
        "Type": "DEBIT_CARD",
        "Balance": "13505.09",
        "Check or Slip #": "",
        "TransactionId": "cfd8e58a0972b8a928fee41f39e9fc9e"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/28/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "684.92",
        "Type": "ACH_CREDIT",
        "Balance": "13514.28",
        "Check or Slip #": "",
        "TransactionId": "557c6aecf9b81f0a4fcf2cd68f643149"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2020",
        "Description": "BURLINGTON STORES 35 DES MOINES IA   557305  10/22",
        "Amount": "-15.96",
        "Type": "DEBIT_CARD",
        "Balance": "12829.36",
        "Check or Slip #": "",
        "TransactionId": "79db73e1d351270d96a3707a4b36f3ec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2020",
        "Description": "RAISING CANE 8 WEST DES MOIN IA              10/21",
        "Amount": "-8.29",
        "Type": "DEBIT_CARD",
        "Balance": "12845.32",
        "Check or Slip #": "",
        "TransactionId": "ba6b1fc09a9cb8e80df4a4db64f888a2"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/22/2020",
        "Description": "Yardi Penny Test SIGONFILE                  PPD ID: 9000652497",
        "Amount": "0.2",
        "Type": "ACH_CREDIT",
        "Balance": "12853.61",
        "Check or Slip #": "",
        "TransactionId": "ce23dde2c53da08439e413379778be65"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/21/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/21",
        "Amount": "-40",
        "Type": "DEBIT_CARD",
        "Balance": "12853.41",
        "Check or Slip #": "",
        "TransactionId": "63f8c18e9d3ec0fb44cc6c736b7711b6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/21/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/21",
        "Amount": "-30.71",
        "Type": "DEBIT_CARD",
        "Balance": "12893.41",
        "Check or Slip #": "",
        "TransactionId": "c6459820b873c3edc6be4228d60ffd4c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/21/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/20",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "12924.12",
        "Check or Slip #": "",
        "TransactionId": "d11b75284bbc134ba7b0989b099f362f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/21/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/20",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "12949.12",
        "Check or Slip #": "",
        "TransactionId": "6a4eb17ca8a71ea96dcb6d595708dec3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/21/2020",
        "Description": "CASEYS GEN STORE 2689 ANKENY IA              10/19",
        "Amount": "-23.42",
        "Type": "DEBIT_CARD",
        "Balance": "12959.12",
        "Check or Slip #": "",
        "TransactionId": "d9e15083b845a692f0cde2bef6145593"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/21/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "695.44",
        "Type": "ACH_CREDIT",
        "Balance": "12982.54",
        "Check or Slip #": "",
        "TransactionId": "b59391cf5559556a93bd20a509ddebb7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/20/2020",
        "Description": "CAPITAL ONE      MOBILE PMT 029339800275253 WEB ID: 9279744980",
        "Amount": "-10.85",
        "Type": "ACH_DEBIT",
        "Balance": "12287.1",
        "Check or Slip #": "",
        "TransactionId": "6229ee3e7732ce4aa1ad10f7eebf0475"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/20/2020",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 10/19",
        "Amount": "-5.07",
        "Type": "DEBIT_CARD",
        "Balance": "12297.95",
        "Check or Slip #": "",
        "TransactionId": "12e2d707ad729b13517732424f199f6e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/19/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            10/17",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "12303.02",
        "Check or Slip #": "",
        "TransactionId": "a552b5ccc39ce5bb3954f274fbee2115"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2020",
        "Description": "TACO BELL #31268 ANKENY IA                   10/14",
        "Amount": "-5.41",
        "Type": "DEBIT_CARD",
        "Balance": "12328.02",
        "Check or Slip #": "",
        "TransactionId": "822cb118e582983ed9c75f614ebe60de"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/14",
        "Amount": "-33",
        "Type": "DEBIT_CARD",
        "Balance": "12333.43",
        "Check or Slip #": "",
        "TransactionId": "c1c8de672d96d04079abb30f202ded22"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2020",
        "Description": "MCDONALD'S F3207 ANKENY IA                   10/14",
        "Amount": "-4.02",
        "Type": "DEBIT_CARD",
        "Balance": "12366.43",
        "Check or Slip #": "",
        "TransactionId": "3858ee6a16c69ae3b905e9fc1ad18107"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/14/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/13",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "12370.45",
        "Check or Slip #": "",
        "TransactionId": "1d76ed350e6afd11d7cebffcfabd01ac"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/14/2020",
        "Description": "RAISING CANES 13 ALTOONA IA                  10/13",
        "Amount": "-8.61",
        "Type": "DEBIT_CARD",
        "Balance": "12375.45",
        "Check or Slip #": "",
        "TransactionId": "d5f02df3622bf18a83c24b06ef1292be"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/14/2020",
        "Description": "BURGER KING #10435 ANKENY IA                 10/12",
        "Amount": "-5.3",
        "Type": "DEBIT_CARD",
        "Balance": "12384.06",
        "Check or Slip #": "",
        "TransactionId": "1e6cd4ab731f02900e68c8e9bd13aa1a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/14/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "665.04",
        "Type": "ACH_CREDIT",
        "Balance": "12389.36",
        "Check or Slip #": "",
        "TransactionId": "6db431f95b9885d859d260e1716a06e7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/13/2020",
        "Description": "CAPITAL ONE      MOBILE PMT 028439800107954 WEB ID: 9279744980",
        "Amount": "-223.86",
        "Type": "ACH_DEBIT",
        "Balance": "11724.32",
        "Check or Slip #": "",
        "TransactionId": "57d5838da33b14b9f655f942fff6c6f1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/13/2020",
        "Description": "WAL-MART #0892 ANKENY IA                     10/12",
        "Amount": "-93.23",
        "Type": "DEBIT_CARD",
        "Balance": "11948.18",
        "Check or Slip #": "",
        "TransactionId": "79ccff0e304e9d2aeeb820906e189cfc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/13/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/11",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "12041.41",
        "Check or Slip #": "",
        "TransactionId": "df186489df28ef9401f86accb6f0b9fc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/13/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/11",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "12044.41",
        "Check or Slip #": "",
        "TransactionId": "34e2dc0511fd0ad085b0180eb6cae2ec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/13/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/10",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "12045.41",
        "Check or Slip #": "",
        "TransactionId": "5a32279b49d6b5f481c4ed889f3de47d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/13/2020",
        "Description": "MCDONALD'S F3207 ANKENY IA                   10/09",
        "Amount": "-5.02",
        "Type": "DEBIT_CARD",
        "Balance": "12047.41",
        "Check or Slip #": "",
        "TransactionId": "b216b7fd4fd54d22bf142115779410aa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/09/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/09",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "12052.43",
        "Check or Slip #": "",
        "TransactionId": "5a3762534830d47fceb6f29a9895f3bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/08/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            10/08",
        "Amount": "-55.5",
        "Type": "DEBIT_CARD",
        "Balance": "12054.43",
        "Check or Slip #": "",
        "TransactionId": "792c003580491ccb156465d84dae7bd1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/08/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/07",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "12109.93",
        "Check or Slip #": "",
        "TransactionId": "3c2f3f3fc3f5b5f9a18455c1ff8a9b50"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/08/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/07",
        "Amount": "-13",
        "Type": "DEBIT_CARD",
        "Balance": "12110.93",
        "Check or Slip #": "",
        "TransactionId": "3127cc9f889d186cb6aa32691c2e417c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/08/2020",
        "Description": "COLDSTONE #23531 ANKENY IA                   10/08",
        "Amount": "-5.61",
        "Type": "DEBIT_CARD",
        "Balance": "12123.93",
        "Check or Slip #": "",
        "TransactionId": "ed3163b04347b931b42f2764d3e36016"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/08/2020",
        "Description": "BURGER KING #10435 ANKENY IA                 10/06",
        "Amount": "-4.24",
        "Type": "DEBIT_CARD",
        "Balance": "12129.54",
        "Check or Slip #": "",
        "TransactionId": "43ba68caf33d435f433d2dec2a3d7be8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2020",
        "Description": "CASEYS GEN STORE 302 S ANKENY IA     346316  10/07",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "12133.78",
        "Check or Slip #": "",
        "TransactionId": "36dd95e8757071f4c18136df7c78470f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2020",
        "Description": "SMOOTHIE KING - 1514 - ANKENY IA             10/06",
        "Amount": "-3.5",
        "Type": "DEBIT_CARD",
        "Balance": "12135.78",
        "Check or Slip #": "",
        "TransactionId": "9b87665456e5e0bb60c6c0413de71e90"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/07/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "687.85",
        "Type": "ACH_CREDIT",
        "Balance": "12139.28",
        "Check or Slip #": "",
        "TransactionId": "da731935683bbecae285845245d292a8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/06/2020",
        "Description": "Wal-Mart Super Center ANKENY IA              10/06",
        "Amount": "-79.31",
        "Type": "DEBIT_CARD",
        "Balance": "11451.43",
        "Check or Slip #": "",
        "TransactionId": "57e78726b001e3036707f28d4e77f28d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/06/2020",
        "Description": "HARDEES 1506082 ANKENY IA                    10/05",
        "Amount": "-8.58",
        "Type": "DEBIT_CARD",
        "Balance": "11530.74",
        "Check or Slip #": "",
        "TransactionId": "f926f4c8f8e426c6dc963e238bbfafc6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/06/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/05",
        "Amount": "-193",
        "Type": "DEBIT_CARD",
        "Balance": "11539.32",
        "Check or Slip #": "",
        "TransactionId": "697b0e550fe8076cc372ac10340501d8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/05/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/02",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "11732.32",
        "Check or Slip #": "",
        "TransactionId": "6c38d19bb928021abcc1a97f6cfdf4d0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/02/2020",
        "Description": "HY-VEE GAS ANKEN 414 N ANKENY IA     310081  10/02",
        "Amount": "-23.56",
        "Type": "DEBIT_CARD",
        "Balance": "11742.32",
        "Check or Slip #": "",
        "TransactionId": "9df674a56dfc526b8b908ba6aa339ef8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/02/2020",
        "Description": "CHICK-FIL-A #03303 ANKENY IA                 09/30",
        "Amount": "-7.69",
        "Type": "DEBIT_CARD",
        "Balance": "11765.88",
        "Check or Slip #": "",
        "TransactionId": "804ba77475ef1a09d97cf5342149d81d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/02/2020",
        "Description": "BLAZE PIZZA DES MOINES DES MOINES IA         09/30",
        "Amount": "-13.17",
        "Type": "DEBIT_CARD",
        "Balance": "11773.57",
        "Check or Slip #": "",
        "TransactionId": "75ff7ef3eb14dcce9cfa829b28d5edba"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2020",
        "Description": "VENMO            PAYMENT    4523031608      WEB ID: 3264681992",
        "Amount": "-10",
        "Type": "ACH_DEBIT",
        "Balance": "11786.74",
        "Check or Slip #": "",
        "TransactionId": "879d9bca31d695a21d210289b3b62021"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2020",
        "Description": "WAL-MART #0892 ANKENY IA                     10/01",
        "Amount": "-48.6",
        "Type": "DEBIT_CARD",
        "Balance": "11796.74",
        "Check or Slip #": "",
        "TransactionId": "44a822b04a799b86221c7aaecbf46626"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/30/2020",
        "Description": "VENMO            PAYMENT    4513138355      WEB ID: 3264681992",
        "Amount": "-35",
        "Type": "ACH_DEBIT",
        "Balance": "11845.34",
        "Check or Slip #": "",
        "TransactionId": "8ba1ef53362314b1ba8901600dffd38a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/30/2020",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-77.17",
        "Type": "ACH_DEBIT",
        "Balance": "11880.34",
        "Check or Slip #": "",
        "TransactionId": "0271a0b37dfb9024ee252a39fb040f56"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/30/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/29",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "11957.51",
        "Check or Slip #": "",
        "TransactionId": "f1ac2f011d7a9adaff34a977a3c143b8"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/30/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "607.98",
        "Type": "ACH_CREDIT",
        "Balance": "11967.51",
        "Check or Slip #": "",
        "TransactionId": "fa94db96e8ba85819efe61d59af2b8f7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/29/2020",
        "Description": "FAZOLIS_5913 ANKENY IA                       09/28",
        "Amount": "-7.61",
        "Type": "DEBIT_CARD",
        "Balance": "11359.53",
        "Check or Slip #": "",
        "TransactionId": "2a74ad39652b07ad2cb60e192a5c0143"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/28",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "11367.14",
        "Check or Slip #": "",
        "TransactionId": "9b2a3099c46f9dfae7a17905b7a92571"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/27",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "11372.14",
        "Check or Slip #": "",
        "TransactionId": "7cd76bd53339a4222073fea36f1e669b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2020",
        "Description": "HY-VEE ALTOONA 1 100 8 ALTOONA IA    341420  09/26",
        "Amount": "-36.51",
        "Type": "DEBIT_CARD",
        "Balance": "11373.14",
        "Check or Slip #": "",
        "TransactionId": "21ab705fc8b3d801afb251f0d80217c2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2020",
        "Description": "MCDONALD'S F5317 ALTOONA IA                  09/26",
        "Amount": "-6.08",
        "Type": "DEBIT_CARD",
        "Balance": "11409.65",
        "Check or Slip #": "",
        "TransactionId": "79199cf0eb448ff5425331dbb0b9ab3b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2020",
        "Description": "B-BOPS-ALTOONA ALTOONA IA                    09/25",
        "Amount": "-5.97",
        "Type": "DEBIT_CARD",
        "Balance": "11415.73",
        "Check or Slip #": "",
        "TransactionId": "60feb50be917bf8b4670db5e2cd99645"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2020",
        "Description": "TACO JOHNS 9703 ALTOONA IA                   09/24",
        "Amount": "-5.23",
        "Type": "DEBIT_CARD",
        "Balance": "11421.7",
        "Check or Slip #": "",
        "TransactionId": "1ed0ea393789ee03b767214d889ebc8b"
    },
    {
        "Details": "DSLIP",
        "Posting Date": "09/28/2020",
        "Description": "REMOTE ONLINE DEPOSIT #          1",
        "Amount": "427.33",
        "Type": "CHECK_DEPOSIT",
        "Balance": "11426.93",
        "Check or Slip #": "1",
        "TransactionId": "1afa994e70614ab4b9ccb3db6dfb58e1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/25/2020",
        "Description": "MCDONALD'S F5317 ALTOONA IA                  09/24",
        "Amount": "-1.06",
        "Type": "DEBIT_CARD",
        "Balance": "10999.6",
        "Check or Slip #": "",
        "TransactionId": "7732426242739124310f3055fd14550c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/25/2020",
        "Description": "BLAZE PIZZA DES MOINES DES MOINES IA         09/23",
        "Amount": "-12.36",
        "Type": "DEBIT_CARD",
        "Balance": "11000.66",
        "Check or Slip #": "",
        "TransactionId": "dc091fa8aa2dba23fe4ee2c4dfb2b437"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/24/2020",
        "Description": "HY-VEE ALTOONA 1 100 8 ALTOONA IA    455251  09/24",
        "Amount": "-15.89",
        "Type": "DEBIT_CARD",
        "Balance": "11013.02",
        "Check or Slip #": "",
        "TransactionId": "37e35fd4f2797993a3bb516f3e7c0921"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/24/2020",
        "Description": "SHOE CARNIVAL #0327 ANKENY IA                09/22",
        "Amount": "90.08",
        "Type": "DEBIT_CARD",
        "Balance": "11028.91",
        "Check or Slip #": "",
        "TransactionId": "17635488aa7c66961037886cfa5d238a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/23/2020",
        "Description": "CAPITAL ONE      MOBILE PMT 026639800548390 WEB ID: 9279744980",
        "Amount": "-64.87",
        "Type": "ACH_DEBIT",
        "Balance": "10938.83",
        "Check or Slip #": "",
        "TransactionId": "3384ce98597cdbfdf65f2a8666a4d194"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/23/2020",
        "Description": "TARGET        00017673 ANKENY IA             09/22",
        "Amount": "-6.03",
        "Type": "DEBIT_CARD",
        "Balance": "11003.7",
        "Check or Slip #": "",
        "TransactionId": "05a5abbbf9a9bbdfe3e8e3707f6ed690"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/23/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/22",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "11009.73",
        "Check or Slip #": "",
        "TransactionId": "badc3db93f16d00eadbce14f62274523"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/23/2020",
        "Description": "PERISHABLE DIST. PAYROLL                    PPD ID: 1421356368",
        "Amount": "620.69",
        "Type": "ACH_CREDIT",
        "Balance": "11019.73",
        "Check or Slip #": "",
        "TransactionId": "9d8bcf20f0ca9098cee1e5ad7f11722e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/22/2020",
        "Description": "WAL-MART #0892 ANKENY IA                     09/22",
        "Amount": "-10.47",
        "Type": "DEBIT_CARD",
        "Balance": "10399.04",
        "Check or Slip #": "",
        "TransactionId": "bfd641ddfa0b735ab9cf7da8571e522f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/22/2020",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 09/21",
        "Amount": "-2.86",
        "Type": "DEBIT_CARD",
        "Balance": "10409.51",
        "Check or Slip #": "",
        "TransactionId": "dda5a6fe14e09775ecc28c9102a6cead"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/22/2020",
        "Description": "SONIC DRIVE IN #4871 ANKENY IA               09/21",
        "Amount": "-9.32",
        "Type": "DEBIT_CARD",
        "Balance": "10412.37",
        "Check or Slip #": "",
        "TransactionId": "0632b079e13a94438a90043489909661"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/22/2020",
        "Description": "YSI*Brick Towne at Sig 515-2332752 IA        09/21",
        "Amount": "-1404.95",
        "Type": "DEBIT_CARD",
        "Balance": "10421.69",
        "Check or Slip #": "",
        "TransactionId": "dccfbe36773d67fb4a5d867f32c7954e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/21/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/20",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "11826.64",
        "Check or Slip #": "",
        "TransactionId": "8e1a98daa232a1758a444c4a893720e9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/21/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/20",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "11827.64",
        "Check or Slip #": "",
        "TransactionId": "b24ec0ea3c558a24004ac0b6e3333f70"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/21/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/20",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "11828.64",
        "Check or Slip #": "",
        "TransactionId": "fb67d77ea4df7fd6130354a9be18f18f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/21/2020",
        "Description": "B-BOPS-ALTOONA ALTOONA IA                    09/20",
        "Amount": "-6.07",
        "Type": "DEBIT_CARD",
        "Balance": "11830.64",
        "Check or Slip #": "",
        "TransactionId": "f5ad7d3f7260f26bba024eefd24d1673"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/21/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/18",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "11836.71",
        "Check or Slip #": "",
        "TransactionId": "6237e8e9c3a0dc67961a4fb5760c8d62"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/21/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/18",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "11837.71",
        "Check or Slip #": "",
        "TransactionId": "18893e4f58cab198485eeaa951a46152"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/21/2020",
        "Description": "TACO JOHNS 9427 ANKENY IA                    09/17",
        "Amount": "-8.47",
        "Type": "DEBIT_CARD",
        "Balance": "11847.71",
        "Check or Slip #": "",
        "TransactionId": "c2c5027b5a9063f83d9926a6f59f9c1c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/18/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/17",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "11856.18",
        "Check or Slip #": "",
        "TransactionId": "b4b3fd14240a702009f176da2a1878e5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2020",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 09/16",
        "Amount": "-3.27",
        "Type": "DEBIT_CARD",
        "Balance": "11866.18",
        "Check or Slip #": "",
        "TransactionId": "d38873e8460bcd25a645f55fa3be5a5e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/16/2020",
        "Description": "CAPITAL ONE      MOBILE PMT 025939800793121 WEB ID: 9279744980",
        "Amount": "-89.09",
        "Type": "ACH_DEBIT",
        "Balance": "11869.45",
        "Check or Slip #": "",
        "TransactionId": "34e7cc04d14f1bb4710b3e838b82f639"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/16/2020",
        "Description": "CULVER S OF ALTOONA #23 ALTOONA IA           09/15",
        "Amount": "-6.73",
        "Type": "DEBIT_CARD",
        "Balance": "11958.54",
        "Check or Slip #": "",
        "TransactionId": "311b23f67ac87fa24592243965c981a2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/16/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/15",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "11965.27",
        "Check or Slip #": "",
        "TransactionId": "f7f944b88130f4222c4ee012c2d06c81"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/15/2020",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 09/14",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "11975.27",
        "Check or Slip #": "",
        "TransactionId": "febdd52308b5e14a07423f4c4ca15dc2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/15/2020",
        "Description": "FAZOLIS_5913 ANKENY IA                       09/14",
        "Amount": "-7.93",
        "Type": "DEBIT_CARD",
        "Balance": "11979.69",
        "Check or Slip #": "",
        "TransactionId": "256badcd375ab037d6b87f50bcae0362"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/14/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/14",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "11987.62",
        "Check or Slip #": "",
        "TransactionId": "519478eba7314b0c51a49f81d27c8c98"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/14/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/13",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "11990.62",
        "Check or Slip #": "",
        "TransactionId": "9584999b309764b9d20506041b7d1437"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/14/2020",
        "Description": "Wal-Mart Super Center ALTOONA IA             09/12",
        "Amount": "-7.7",
        "Type": "DEBIT_CARD",
        "Balance": "11993.62",
        "Check or Slip #": "",
        "TransactionId": "ce53842e8da7b303a3c31d8f03cfd8ad"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/14/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/12",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "12001.32",
        "Check or Slip #": "",
        "TransactionId": "34ed9d6bcf02d33fe418daf515f99b4e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/14/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/12",
        "Amount": "-1.33",
        "Type": "DEBIT_CARD",
        "Balance": "12002.32",
        "Check or Slip #": "",
        "TransactionId": "fa79e5b9657d0262ac330c33719d511c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/11/2020",
        "Description": "B-BOPS-SOUTH DES MOINES IA                   09/10",
        "Amount": "-5.55",
        "Type": "DEBIT_CARD",
        "Balance": "12003.65",
        "Check or Slip #": "",
        "TransactionId": "fed123beb81ed9f58493dbe5adb69d55"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/11/2020",
        "Description": "BANK OF AMERICA  FndTrnsfr  BOARD,JEREMY,A  WEB ID: 2941721694",
        "Amount": "4022.5",
        "Type": "ACH_CREDIT",
        "Balance": "12009.2",
        "Check or Slip #": "",
        "TransactionId": "13907b419c9bdb4e757b27af83ce230b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/10/2020",
        "Description": "WM SUPERC Wal-Mart Sup DES MOINES IA         09/10",
        "Amount": "-15.88",
        "Type": "DEBIT_CARD",
        "Balance": "7986.7",
        "Check or Slip #": "",
        "TransactionId": "76d10046edb8af933f49cc8ff4296d88"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/10/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            09/09",
        "Amount": "-842",
        "Type": "DEBIT_CARD",
        "Balance": "8002.58",
        "Check or Slip #": "",
        "TransactionId": "b6c5ac2ef2721ed687a356d0a4a12cc2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/10/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/09",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "8844.58",
        "Check or Slip #": "",
        "TransactionId": "a6a5d259100e9b96d9fb8486e6b15479"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/09/2020",
        "Description": "HY-VEE ALTOONA 1 100 8 ALTOONA IA    018676  09/09",
        "Amount": "-1.99",
        "Type": "DEBIT_CARD",
        "Balance": "8849.58",
        "Check or Slip #": "",
        "TransactionId": "5f4b503b387deb0ed0e008bac5dc06a4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/09/2020",
        "Description": "HY-VEE ALTOONA 1 100 8 ALTOONA IA    025671  09/09",
        "Amount": "-18.89",
        "Type": "DEBIT_CARD",
        "Balance": "8851.57",
        "Check or Slip #": "",
        "TransactionId": "14440ede8cb165e27a9aecaa824b89ad"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/09/2020",
        "Description": "BASS PRO STORE ALTOONA ALTOONA IA            09/09",
        "Amount": "-104",
        "Type": "DEBIT_CARD",
        "Balance": "8870.46",
        "Check or Slip #": "",
        "TransactionId": "8ae7bfafdc4e93100432937a1831a809"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/08/2020",
        "Description": "ARBYS 5722 ANKENY IA                         09/06",
        "Amount": "-6.03",
        "Type": "DEBIT_CARD",
        "Balance": "8974.46",
        "Check or Slip #": "",
        "TransactionId": "a06f3db48e2a024481c0502f4e46579b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/08/2020",
        "Description": "SHOE CARNIVAL #0411 DES MOINES IA            09/05",
        "Amount": "-90.93",
        "Type": "DEBIT_CARD",
        "Balance": "8980.49",
        "Check or Slip #": "",
        "TransactionId": "8e5c1ac2375d24806db48937c30c854b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/08/2020",
        "Description": "HOMEMAKERS FURNITURE URBANDALE IA            09/05",
        "Amount": "-560.72",
        "Type": "DEBIT_CARD",
        "Balance": "9071.42",
        "Check or Slip #": "",
        "TransactionId": "ad288e409b38487ebe11faf9c77ecc64"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/08/2020",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 09/04",
        "Amount": "-10.28",
        "Type": "DEBIT_CARD",
        "Balance": "9632.14",
        "Check or Slip #": "",
        "TransactionId": "1a1f7a133601966b7ecd3e0889612cc4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/02/2020",
        "Description": "SMOKEYROW_6 PLEASANTVILLE IA                 09/01",
        "Amount": "-4.42",
        "Type": "DEBIT_CARD",
        "Balance": "9642.42",
        "Check or Slip #": "",
        "TransactionId": "33194dd86e9c119ff6855450d4440104"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/01/2020",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-77.17",
        "Type": "ACH_DEBIT",
        "Balance": "9646.84",
        "Check or Slip #": "",
        "TransactionId": "0e1c0e1c8a53cf23554d2d11d149a07b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/01/2020",
        "Description": "CULVER S OF ANKENY #119 ANKENY IA            08/31",
        "Amount": "-9.31",
        "Type": "DEBIT_CARD",
        "Balance": "9724.01",
        "Check or Slip #": "",
        "TransactionId": "3bd469dc747a3d28d1c3c677054bd522"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/01/2020",
        "Description": "CASEYS LINCOLN LINCOLN NE                    08/30",
        "Amount": "-30.05",
        "Type": "DEBIT_CARD",
        "Balance": "9733.32",
        "Check or Slip #": "",
        "TransactionId": "d41220cf4e69c7fcfb2b99bee623c123"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2020",
        "Description": "ARBYS 7059 GRAND ISLAND NE                   08/30",
        "Amount": "-8.01",
        "Type": "DEBIT_CARD",
        "Balance": "9763.37",
        "Check or Slip #": "",
        "TransactionId": "f7775b372f996b36ae1fa42060506e3a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2020",
        "Description": "LOVES TRAVEL STOPS 625 SIDNEY NE     059854  08/30",
        "Amount": "-16.03",
        "Type": "DEBIT_CARD",
        "Balance": "9771.38",
        "Check or Slip #": "",
        "TransactionId": "434937d26730e5051c81f21d477a6c7a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2020",
        "Description": "MOTEL 6 CHEYENNE WY                          08/29",
        "Amount": "-71.49",
        "Type": "DEBIT_CARD",
        "Balance": "9787.41",
        "Check or Slip #": "",
        "TransactionId": "819d5d0684ffd0bb9376c50312e614bd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2020",
        "Description": "FLYING J #763 RAWLINS WY             025710  08/29",
        "Amount": "-23.49",
        "Type": "DEBIT_CARD",
        "Balance": "9858.9",
        "Check or Slip #": "",
        "TransactionId": "370a6fae682edcdfbb84c0fd32cff74d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/29",
        "Amount": "-100",
        "Type": "DEBIT_CARD",
        "Balance": "9882.39",
        "Check or Slip #": "",
        "TransactionId": "ac35b36b3d9f994fa2f02758e094a24a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2020",
        "Description": "Motel 6 BEAVER BEAVER CITY UT                08/29",
        "Amount": "-62.1",
        "Type": "DEBIT_CARD",
        "Balance": "9982.39",
        "Check or Slip #": "",
        "TransactionId": "c1cf3a3857088c4bce97103f2ea88d50"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2020",
        "Description": "MCDONALD'S F25740 SEARCHLIGHT NV             08/28",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "10044.49",
        "Check or Slip #": "",
        "TransactionId": "fa4f5c72fc52ad4b4fa8d1d1b58e95b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/28/2020",
        "Description": "LOVES COUNTRY LAS VEGAS NV           054028  08/28",
        "Amount": "-19.65",
        "Type": "DEBIT_CARD",
        "Balance": "10048.8",
        "Check or Slip #": "",
        "TransactionId": "97074ab8026c34bedd084f2195d80b87"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/28/2020",
        "Description": "ARCO #42214 AMPM YERMO CA                    08/28",
        "Amount": "-17.6",
        "Type": "DEBIT_CARD",
        "Balance": "10068.45",
        "Check or Slip #": "",
        "TransactionId": "7c01ecefbbc1e221d8838f4ece554fee"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/28/2020",
        "Description": "RITE AID STORE - 5525 LONG BEACH CA  548762  08/28",
        "Amount": "-12.67",
        "Type": "DEBIT_CARD",
        "Balance": "10086.05",
        "Check or Slip #": "",
        "TransactionId": "4daf9197eeb8f24c138922fc6959a608"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/26/2020",
        "Description": "WITHDRAWAL 08/26",
        "Amount": "-10",
        "Type": "MISC_DEBIT",
        "Balance": "10098.72",
        "Check or Slip #": "",
        "TransactionId": "6156455d6fb509cf4cafa2a961768172"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/26/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            08/25",
        "Amount": "-17",
        "Type": "DEBIT_CARD",
        "Balance": "10108.72",
        "Check or Slip #": "",
        "TransactionId": "c9bb5ba6622e7e3a0a9e21fbc6350cca"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/26/2020",
        "Description": "ATM CASH DEPOSIT 08/26 4501 E PACIFIC COAST HWY LONG BEACH CA",
        "Amount": "71",
        "Type": "ATM",
        "Balance": "10125.72",
        "Check or Slip #": "",
        "TransactionId": "21452946418cc59802f5dc1fde8d76bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/25/2020",
        "Description": "PEPBOYS STORE # 803 46 LONG BEACH CA         08/25",
        "Amount": "-1849",
        "Type": "DEBIT_CARD",
        "Balance": "10054.72",
        "Check or Slip #": "",
        "TransactionId": "1a4e6bb73c78bdecb80215b17313156b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/24/2020",
        "Description": "ROSS STORES #38 LOS ANGELES CA               08/24",
        "Amount": "-14.22",
        "Type": "DEBIT_CARD",
        "Balance": "11903.72",
        "Check or Slip #": "",
        "TransactionId": "9b5a67f019b9e00ef6ab72e26d7c4766"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/20/2020",
        "Description": "MCDONALDS  F1229 LAKEWOOD CA                 08/19",
        "Amount": "-4.4",
        "Type": "DEBIT_CARD",
        "Balance": "11917.94",
        "Check or Slip #": "",
        "TransactionId": "d51e461a9ad6ea526b1da480e8ca6519"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/19/2020",
        "Description": "IRS  TREAS 310     TAX REF                  PPD ID: 9111736946",
        "Amount": "4.88",
        "Type": "ACH_CREDIT",
        "Balance": "11922.34",
        "Check or Slip #": "",
        "TransactionId": "94d30e2b66dc7df44e594e0100bb4c79"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/17/2020",
        "Description": "ARCO #42400 AMPM LONG BEACH CA               08/15",
        "Amount": "-30.35",
        "Type": "DEBIT_CARD",
        "Balance": "11917.46",
        "Check or Slip #": "",
        "TransactionId": "8ef394151ee4dffbe11b17ab1de14684"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/14/2020",
        "Description": "DEL TACO 0086 LONG BEACH CA                  08/13",
        "Amount": "-4.95",
        "Type": "DEBIT_CARD",
        "Balance": "11947.81",
        "Check or Slip #": "",
        "TransactionId": "0d96db88d587f1f54abd57582db90602"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/10/2020",
        "Description": "RITE AID STORE - 5518 LONG BEACH CA  979582  08/10",
        "Amount": "-7.71",
        "Type": "DEBIT_CARD",
        "Balance": "11952.76",
        "Check or Slip #": "",
        "TransactionId": "ac2cf20005bcb14af2b4459926bc961a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/10/2020",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         670097  08/08",
        "Amount": "-9.99",
        "Type": "DEBIT_CARD",
        "Balance": "11960.47",
        "Check or Slip #": "",
        "TransactionId": "1d2917a8cf0447ca80e22a02a31d76d3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/06/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            08/05",
        "Amount": "-887",
        "Type": "DEBIT_CARD",
        "Balance": "11970.46",
        "Check or Slip #": "",
        "TransactionId": "23a63053a0c90465285ab3578b2e5471"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/05/2020",
        "Description": "BEST BUY      00008722 DOWNEY CA             08/05",
        "Amount": "-1130.27",
        "Type": "DEBIT_CARD",
        "Balance": "12857.46",
        "Check or Slip #": "",
        "TransactionId": "430e225ac57cce831475f252aeefd8e1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/05/2020",
        "Description": "CULVER S OF ANKENY #119 ANKENY IA            08/04",
        "Amount": "-6.67",
        "Type": "DEBIT_CARD",
        "Balance": "13987.73",
        "Check or Slip #": "",
        "TransactionId": "aa09cd0dca0c30d92f8d8fef1598184b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/04/2020",
        "Description": "TARGET T- 2135 SE Dela Ankeny IA             08/04",
        "Amount": "-4.24",
        "Type": "DEBIT_CARD",
        "Balance": "13994.4",
        "Check or Slip #": "",
        "TransactionId": "97ec2f24a395dd0cdeb363ddf0bf445e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/03/2020",
        "Description": "FAZOLIS_5913 ANKENY IA                       07/31",
        "Amount": "-10.47",
        "Type": "DEBIT_CARD",
        "Balance": "13998.64",
        "Check or Slip #": "",
        "TransactionId": "94b25426d0a2a516beb030eec1235b94"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/30/2020",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-66.19",
        "Type": "ACH_DEBIT",
        "Balance": "14009.11",
        "Check or Slip #": "",
        "TransactionId": "1e526f22ec4d8886ffbf262eca94cb10"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/27/2020",
        "Description": "KRISPY KREME #1577 ANKENY IA                 07/25",
        "Amount": "-4.02",
        "Type": "DEBIT_CARD",
        "Balance": "14075.3",
        "Check or Slip #": "",
        "TransactionId": "6721e355200d81418d3f3876e79b02b3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/24/2020",
        "Description": "GOODWILL ANKENY ANKENY IA                    07/23",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "14079.32",
        "Check or Slip #": "",
        "TransactionId": "2d8f045f85d3921b31c0d63265d5d920"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/24/2020",
        "Description": "TACO JOHNS 9427 ANKENY IA                    07/22",
        "Amount": "-9.47",
        "Type": "DEBIT_CARD",
        "Balance": "14091.32",
        "Check or Slip #": "",
        "TransactionId": "1969908556c3926d4b5d61c1ca112644"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/21/2020",
        "Description": "FAZOLIS_5913 ANKENY IA                       07/20",
        "Amount": "-13.02",
        "Type": "DEBIT_CARD",
        "Balance": "14100.79",
        "Check or Slip #": "",
        "TransactionId": "da24d97f84bfb74c01e8faea729b2823"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/17/2020",
        "Description": "Wal-Mart Super Center ANKENY IA              07/17",
        "Amount": "-1.12",
        "Type": "DEBIT_CARD",
        "Balance": "14113.81",
        "Check or Slip #": "",
        "TransactionId": "cf5d5a4746598198804311cbcbd6f74c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/17/2020",
        "Description": "ARBYS 5722 ANKENY IA                         07/16",
        "Amount": "-9.11",
        "Type": "DEBIT_CARD",
        "Balance": "14114.93",
        "Check or Slip #": "",
        "TransactionId": "79df1056bf97b6d490cb1cf026f2b4b3"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/16/2020",
        "Description": "BANK OF AMERICA  FndTrnsfr  BOARD,JEREMY,A  WEB ID: 2941721694",
        "Amount": "3000",
        "Type": "ACH_CREDIT",
        "Balance": "14124.04",
        "Check or Slip #": "",
        "TransactionId": "bc1c67a644390ece3f42382ba4187869"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/14/2020",
        "Description": "IRS  TREAS 310     TAX REF                  PPD ID: 9111036170",
        "Amount": "433",
        "Type": "ACH_CREDIT",
        "Balance": "11124.04",
        "Check or Slip #": "",
        "TransactionId": "d0048af23b0b39c0ed3aa0fe878d91dc"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/09/2020",
        "Description": "Offer: Turbo Tax",
        "Amount": "5",
        "Type": "MISC_CREDIT",
        "Balance": "10691.04",
        "Check or Slip #": "",
        "TransactionId": "5488b77c261dbf1cbe0b8e9a9265c9c4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2020",
        "Description": "FRANCHISE TAX BO PAYMENTS                   PPD ID: 1282532045",
        "Amount": "-39",
        "Type": "ACH_DEBIT",
        "Balance": "10686.04",
        "Check or Slip #": "",
        "TransactionId": "3b29e22e9ad9abe90e83cfcd90659917"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/07/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            07/07",
        "Amount": "-913",
        "Type": "DEBIT_CARD",
        "Balance": "10725.04",
        "Check or Slip #": "",
        "TransactionId": "002149abcd06f8b4fd63029fc8721f32"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/07/2020",
        "Description": "INTUIT *TURBOTAX 800-446-8848 CA             07/07",
        "Amount": "-140",
        "Type": "DEBIT_CARD",
        "Balance": "11638.04",
        "Check or Slip #": "",
        "TransactionId": "6a2b8fa01d170a83058b2a41022a74d0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/30/2020",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-58.47",
        "Type": "ACH_DEBIT",
        "Balance": "11778.04",
        "Check or Slip #": "",
        "TransactionId": "20f2b2a674e4a30ce5cd01464fbcf070"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/29/2020",
        "Description": "VENMO            PAYMENT    3682156832      WEB ID: 3264681992",
        "Amount": "-10",
        "Type": "ACH_DEBIT",
        "Balance": "11836.51",
        "Check or Slip #": "",
        "TransactionId": "d0415056a2a952116d388649dd3a2dfd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/23/2020",
        "Description": "CAPITAL ONE      MOBILE PMT 017439800253977 WEB ID: 9279744980",
        "Amount": "-76.98",
        "Type": "ACH_DEBIT",
        "Balance": "11846.51",
        "Check or Slip #": "",
        "TransactionId": "1782538cf8ee8b055a915456b116af38"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/08/2020",
        "Description": "BURLINGTON STORES 1196 LA HABRA CA   129402  06/08",
        "Amount": "-18.93",
        "Type": "DEBIT_CARD",
        "Balance": "11923.49",
        "Check or Slip #": "",
        "TransactionId": "87b284b402bcdc1f8c67abc2e48b9036"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/04/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            06/03",
        "Amount": "-905",
        "Type": "DEBIT_CARD",
        "Balance": "11942.42",
        "Check or Slip #": "",
        "TransactionId": "8cd1a1ee2cc559d766666f66e04bf614"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/01/2020",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-82.38",
        "Type": "ACH_DEBIT",
        "Balance": "12847.42",
        "Check or Slip #": "",
        "TransactionId": "59c20adb04816e350fa1a8ec6139b1f8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/29/2020",
        "Description": "YOSHINOYA  WILLOW & ATL LONG BEACH CA        05/28",
        "Amount": "-7.27",
        "Type": "DEBIT_CARD",
        "Balance": "12929.8",
        "Check or Slip #": "",
        "TransactionId": "5d454715b57cb8ce17a92f3d546481a1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/21/2020",
        "Description": "CA DMV FEE 678-7315516 CA                    05/19",
        "Amount": "-2.77",
        "Type": "DEBIT_CARD",
        "Balance": "12937.07",
        "Check or Slip #": "",
        "TransactionId": "f3399c2382df64b78317324ba5de1b4a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/20/2020",
        "Description": "STATE OF CALIF DMV INT 800-7770133 CA        05/19",
        "Amount": "-132",
        "Type": "DEBIT_CARD",
        "Balance": "12939.84",
        "Check or Slip #": "",
        "TransactionId": "8caf3f383b37194657118d3afd3458c1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/19/2020",
        "Description": "CAPITAL ONE      MOBILE PMT 013939800297231 WEB ID: 9279744980",
        "Amount": "-5.51",
        "Type": "ACH_DEBIT",
        "Balance": "13071.84",
        "Check or Slip #": "",
        "TransactionId": "9495c31427fff00cd4692b4161a004ef"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/19/2020",
        "Description": "RALPHS 0251 LONG BEACH CA            190067  05/19",
        "Amount": "-2.98",
        "Type": "DEBIT_CARD",
        "Balance": "13077.35",
        "Check or Slip #": "",
        "TransactionId": "4631ecc416945c9f78feb367ebd5839e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/19/2020",
        "Description": "CALIFORNIA SMOG LONG BEACH CA        643778  05/19",
        "Amount": "-49.95",
        "Type": "DEBIT_CARD",
        "Balance": "13080.33",
        "Check or Slip #": "",
        "TransactionId": "c7bb1c7573d9ed32f9db81b2cdf5a882"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/18/2020",
        "Description": "ARCO #42420 MAYWOOD CA                       05/18",
        "Amount": "-27.47",
        "Type": "DEBIT_CARD",
        "Balance": "13130.28",
        "Check or Slip #": "",
        "TransactionId": "4bb2c3aac6ee7949258f65b25d79e35a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/11/2020",
        "Description": "RAISING CANE'S 358 LONG BEACH CA             05/10",
        "Amount": "-9.21",
        "Type": "DEBIT_CARD",
        "Balance": "13157.75",
        "Check or Slip #": "",
        "TransactionId": "c6e1b45bd6582459c017436b825392fd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/11/2020",
        "Description": "MCDONALD'S F6470 LONG BEACH CA               05/07",
        "Amount": "-4.41",
        "Type": "DEBIT_CARD",
        "Balance": "13166.96",
        "Check or Slip #": "",
        "TransactionId": "509bdc1b0f2d9bb7b16270064d94d7b7"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/11/2020",
        "Description": "ATM CASH DEPOSIT 05/11 4501 E PACIFIC COAST HWY LONG BEACH CA",
        "Amount": "650",
        "Type": "ATM",
        "Balance": "13171.37",
        "Check or Slip #": "",
        "TransactionId": "66476836e2cf070f1d197afc1b4d85b9"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/11/2020",
        "Description": "ATM CHECK DEPOSIT 05/11 4501 E PACIFIC COAST HWY LONG BEACH CA",
        "Amount": "3996.57",
        "Type": "ATM_DEPOSIT",
        "Balance": "12521.37",
        "Check or Slip #": "",
        "TransactionId": "449d426d34148f0a14c83d45183f295a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/07/2020",
        "Description": "VENMO            PAYMENT    3445252119      WEB ID: 3264681992",
        "Amount": "-5",
        "Type": "ACH_DEBIT",
        "Balance": "8524.8",
        "Check or Slip #": "",
        "TransactionId": "62a7a66692fc25a400bfeeb4a4e09d90"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/07/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            05/06",
        "Amount": "-115",
        "Type": "DEBIT_CARD",
        "Balance": "8529.8",
        "Check or Slip #": "",
        "TransactionId": "704516256f252f8deffeffcb34176834"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/06/2020",
        "Description": "VENMO            PAYMENT    3440573144      WEB ID: 3264681992",
        "Amount": "-50",
        "Type": "ACH_DEBIT",
        "Balance": "8644.8",
        "Check or Slip #": "",
        "TransactionId": "f0488f08cd9028e045db03a8104133b4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/06/2020",
        "Description": "VENMO            PAYMENT    3439876125      WEB ID: 3264681992",
        "Amount": "-75",
        "Type": "ACH_DEBIT",
        "Balance": "8694.8",
        "Check or Slip #": "",
        "TransactionId": "5e2a4e9b32dcec6f501ef70673add66f"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/06/2020",
        "Description": "ATM CASH DEPOSIT 05/06 4501 E PACIFIC COAST HWY LONG BEACH CA",
        "Amount": "505",
        "Type": "ATM",
        "Balance": "8769.8",
        "Check or Slip #": "",
        "TransactionId": "d0d24b25397e1e62f3d863191f3120b9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/05/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            05/04",
        "Amount": "-905",
        "Type": "DEBIT_CARD",
        "Balance": "8264.8",
        "Check or Slip #": "",
        "TransactionId": "32a107ef1c60c154c5341dfe7d7d2a0b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/04/2020",
        "Description": "VENMO            PAYMENT    3429564769      WEB ID: 3264681992",
        "Amount": "-20",
        "Type": "ACH_DEBIT",
        "Balance": "9169.8",
        "Check or Slip #": "",
        "TransactionId": "04b55ca393f17e132518c89a0c2719b1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/01/2020",
        "Description": "ARCO #42155 LONG BEACH CA                    05/01",
        "Amount": "-31.54",
        "Type": "DEBIT_CARD",
        "Balance": "9189.8",
        "Check or Slip #": "",
        "TransactionId": "4c7396525be728885572f26e5c266ab8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2020",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-102",
        "Type": "ACH_DEBIT",
        "Balance": "9221.34",
        "Check or Slip #": "",
        "TransactionId": "434e343605ac0ebe1bc3a18f13b70021"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/22",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "9323.34",
        "Check or Slip #": "",
        "TransactionId": "de82dd13057016042941693d3a34c43a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            04/22",
        "Amount": "-154.61",
        "Type": "DEBIT_CARD",
        "Balance": "9329.34",
        "Check or Slip #": "",
        "TransactionId": "2eed5b1966816be7785feade06d98f8a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/22/2020",
        "Description": "CAPITAL ONE      MOBILE PMT 011239800334695 WEB ID: 9279744980",
        "Amount": "-15.39",
        "Type": "ACH_DEBIT",
        "Balance": "9483.95",
        "Check or Slip #": "",
        "TransactionId": "41bde45fa42ca045c62bba53947a7bfb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/20/2020",
        "Description": "ARCO #42179 AMPM HUNTINGTON BE CA            04/20",
        "Amount": "-30.59",
        "Type": "DEBIT_CARD",
        "Balance": "9499.34",
        "Check or Slip #": "",
        "TransactionId": "48a7046e736150b379b697fa35633fe0"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/17/2020",
        "Description": "HOUSEABLES       PAYROLL                    PPD ID: P942875288",
        "Amount": "479.53",
        "Type": "ACH_CREDIT",
        "Balance": "9529.93",
        "Check or Slip #": "",
        "TransactionId": "c9e9feb09cf97ae7df2e38325d15a9c9"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/17/2020",
        "Description": "HOUSEABLES       COOPER GRO                 PPD ID: P942875288",
        "Amount": "562.51",
        "Type": "ACH_CREDIT",
        "Balance": "9050.4",
        "Check or Slip #": "",
        "TransactionId": "5076d5073e6a675777d665d0070283c8"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/15/2020",
        "Description": "IRS  TREAS 310     TAX REF                  PPD ID: 9111736085",
        "Amount": "1200",
        "Type": "ACH_CREDIT",
        "Balance": "8487.89",
        "Check or Slip #": "",
        "TransactionId": "fd7ee04579cba9b19d9a9241ec4ba5af"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/14/2020",
        "Description": "BURGER KING #11490 LOS ANGELES CA            04/12",
        "Amount": "-5.46",
        "Type": "DEBIT_CARD",
        "Balance": "7287.89",
        "Check or Slip #": "",
        "TransactionId": "f51d5bf2f40fc48a7b51bd2d7f6560e3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/09/2020",
        "Description": "ARCO #42155 LONG BEACH CA                    04/09",
        "Amount": "-33.59",
        "Type": "DEBIT_CARD",
        "Balance": "7293.35",
        "Check or Slip #": "",
        "TransactionId": "558e9f5fff5a2b363de6b148973e5c1d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/06/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            04/04",
        "Amount": "-907",
        "Type": "DEBIT_CARD",
        "Balance": "7326.94",
        "Check or Slip #": "",
        "TransactionId": "811a236d121c5aef5851652c67aa46b4"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/03/2020",
        "Description": "HOUSEABLES       PAYROLL                    PPD ID: P942875288",
        "Amount": "489.4",
        "Type": "ACH_CREDIT",
        "Balance": "8233.94",
        "Check or Slip #": "",
        "TransactionId": "75f8e893d2c218abf1e59fc6af781a29"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/03/2020",
        "Description": "HOUSEABLES       COOPER GRO                 PPD ID: P942875288",
        "Amount": "530.89",
        "Type": "ACH_CREDIT",
        "Balance": "7744.54",
        "Check or Slip #": "",
        "TransactionId": "418bd00c22550456c1498a9da2614ebd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/31/2020",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-102",
        "Type": "ACH_DEBIT",
        "Balance": "7213.65",
        "Check or Slip #": "",
        "TransactionId": "6f9eab5f683e55796393d1d3e6d6c65b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/31/2020",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         118713  03/31",
        "Amount": "-20.8",
        "Type": "DEBIT_CARD",
        "Balance": "7315.65",
        "Check or Slip #": "",
        "TransactionId": "9fdb779ad5b9796a5379432582e504ee"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/30/2020",
        "Description": "Square Inc       * Cash App T200210861340   CCD ID: 8800429876",
        "Amount": "922.1",
        "Type": "ACH_CREDIT",
        "Balance": "7336.45",
        "Check or Slip #": "",
        "TransactionId": "f260d5cefcb4e9b32b876163b714a339"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/27/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/26",
        "Amount": "-999.98",
        "Type": "DEBIT_CARD",
        "Balance": "6414.35",
        "Check or Slip #": "",
        "TransactionId": "d078b8e31c43f5b3a5dea3ef6137b7c7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2020",
        "Description": "CHIPOTLE 0261 BEVERLY HILLS CA               03/25",
        "Amount": "-8.43",
        "Type": "DEBIT_CARD",
        "Balance": "7414.33",
        "Check or Slip #": "",
        "TransactionId": "907ae0260530758b85b5b2d0109c0494"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/25",
        "Amount": "-500",
        "Type": "DEBIT_CARD",
        "Balance": "7422.76",
        "Check or Slip #": "",
        "TransactionId": "6f756b4ac447eabe034051e60ffb376e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/25/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/24",
        "Amount": "-3.9",
        "Type": "DEBIT_CARD",
        "Balance": "7922.76",
        "Check or Slip #": "",
        "TransactionId": "441f0954b85e840b49befe7f9a565b25"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/24/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/23",
        "Amount": "-1.38",
        "Type": "DEBIT_CARD",
        "Balance": "7926.66",
        "Check or Slip #": "",
        "TransactionId": "a128d4ef3a84429346a9ddb44ab45a47"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/24/2020",
        "Description": "CRYSTAL COVE SP REEF LAGUNA BEACH CA         03/23",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "7928.04",
        "Check or Slip #": "",
        "TransactionId": "4dddd018f28cc1c14c55e9728b01adf3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/23/2020",
        "Description": "ARCO #42155 LONG BEACH CA                    03/23",
        "Amount": "-26.68",
        "Type": "DEBIT_CARD",
        "Balance": "7933.04",
        "Check or Slip #": "",
        "TransactionId": "2d9355098000ee6382e55bb2f4a62f2b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/23/2020",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         102652  03/21",
        "Amount": "-28.15",
        "Type": "DEBIT_CARD",
        "Balance": "7959.72",
        "Check or Slip #": "",
        "TransactionId": "b26cd0699a4ee9068da7f8439142c5d8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/23/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/20",
        "Amount": "-4.96",
        "Type": "DEBIT_CARD",
        "Balance": "7987.87",
        "Check or Slip #": "",
        "TransactionId": "330aeb8157c291ec8472d25cd7a66d61"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/20/2020",
        "Description": "HOUSEABLES       JEREMY BOA                 PPD ID: P942875288",
        "Amount": "52.49",
        "Type": "ACH_CREDIT",
        "Balance": "7992.83",
        "Check or Slip #": "",
        "TransactionId": "c5ee905fb40dbaba2a598447449e0ec8"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/20/2020",
        "Description": "Square Inc       * Cash App T200208570339   CCD ID: 8800429876",
        "Amount": "323.25",
        "Type": "ACH_CREDIT",
        "Balance": "7940.34",
        "Check or Slip #": "",
        "TransactionId": "13272b9a01870e0f18041c1bfc6e22da"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/20/2020",
        "Description": "HOUSEABLES       PAYROLL                    PPD ID: P942875288",
        "Amount": "935.83",
        "Type": "ACH_CREDIT",
        "Balance": "7617.09",
        "Check or Slip #": "",
        "TransactionId": "cbdb17aa3bdd409c9b3549233fce555a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/19/2020",
        "Description": "CAPITAL ONE      MOBILE PMT 007839800080967 WEB ID: 9279744980",
        "Amount": "-40.71",
        "Type": "ACH_DEBIT",
        "Balance": "6681.26",
        "Check or Slip #": "",
        "TransactionId": "3f499993ec89a5db38bb5f926f31b171"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/17/2020",
        "Description": "VONS #2090 HUNTINGTON BE CA          261332  03/17",
        "Amount": "-20.74",
        "Type": "DEBIT_CARD",
        "Balance": "6721.97",
        "Check or Slip #": "",
        "TransactionId": "fd85efe6b8ea29c17ecd2f310a0fdb71"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/17/2020",
        "Description": "7-ELEVEN HUNTINGTON BE CA                    03/17",
        "Amount": "-4.72",
        "Type": "DEBIT_CARD",
        "Balance": "6742.71",
        "Check or Slip #": "",
        "TransactionId": "f735ca23b5445636632ac421b565ae16"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/16/2020",
        "Description": "TACO BELL 146 LONG BEACH CA                  03/15",
        "Amount": "-6.6",
        "Type": "DEBIT_CARD",
        "Balance": "6747.43",
        "Check or Slip #": "",
        "TransactionId": "7861801c2f9b600ae780bb8f8626c075"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/16/2020",
        "Description": "SONIC DRIVE IN #6506 HUNTINGTON BE CA        03/14",
        "Amount": "-11.94",
        "Type": "DEBIT_CARD",
        "Balance": "6754.03",
        "Check or Slip #": "",
        "TransactionId": "d49262e2a866637b8136122cf20c9dcd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/16/2020",
        "Description": "JACK'S SURFBOARDS HB HUNTINGTON BE CA189230  03/14",
        "Amount": "-323.25",
        "Type": "DEBIT_CARD",
        "Balance": "6765.97",
        "Check or Slip #": "",
        "TransactionId": "49540f2805ed57bd45151804134ef144"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/13/2020",
        "Description": "AUTOZONE  5543 6611 WE WESTMINSTER CA133561  03/13",
        "Amount": "-3.25",
        "Type": "DEBIT_CARD",
        "Balance": "7089.22",
        "Check or Slip #": "",
        "TransactionId": "f22093a9a46a17d9686c03c230dd7b05"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/12/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/11",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "7092.47",
        "Check or Slip #": "",
        "TransactionId": "c7036a5ce5f3d4c670ef8421bf67493b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/11/2020",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         337927  03/11",
        "Amount": "-7.02",
        "Type": "DEBIT_CARD",
        "Balance": "7096.78",
        "Check or Slip #": "",
        "TransactionId": "a48187486879290be3d8f9f9dec5e7ac"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/10/2020",
        "Description": "ARCO #42155 LONG BEACH CA                    03/10",
        "Amount": "-36.51",
        "Type": "DEBIT_CARD",
        "Balance": "7103.8",
        "Check or Slip #": "",
        "TransactionId": "c3374959f7261128b8940be7e9a6350e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/10/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/09",
        "Amount": "-5.21",
        "Type": "DEBIT_CARD",
        "Balance": "7140.31",
        "Check or Slip #": "",
        "TransactionId": "67106a22a89d09c0050c8cd1cd20d852"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/09/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/08",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "7145.52",
        "Check or Slip #": "",
        "TransactionId": "cabff11de928b00efdd762c2e62c0347"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/09/2020",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              03/08",
        "Amount": "-94",
        "Type": "DEBIT_CARD",
        "Balance": "7151.03",
        "Check or Slip #": "",
        "TransactionId": "81af034ec18a2405f26c5ce16bcdf7f8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/09/2020",
        "Description": "DOLLARTRE 2189 N LAKEW LONG BEACH CA         03/07",
        "Amount": "-3.3",
        "Type": "DEBIT_CARD",
        "Balance": "7245.03",
        "Check or Slip #": "",
        "TransactionId": "e01bce572364d92a6f32173ab87e1f43"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/09/2020",
        "Description": "RAISING CANE'S 358 LONG BEACH CA             03/07",
        "Amount": "-9.21",
        "Type": "DEBIT_CARD",
        "Balance": "7248.33",
        "Check or Slip #": "",
        "TransactionId": "8a68fb5f58df34da89cb64396d20e398"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/09/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/06",
        "Amount": "-7.87",
        "Type": "DEBIT_CARD",
        "Balance": "7257.54",
        "Check or Slip #": "",
        "TransactionId": "82b6de961a43285ad97b5f0f211c6f43"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/09/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            03/06",
        "Amount": "-860",
        "Type": "DEBIT_CARD",
        "Balance": "7265.41",
        "Check or Slip #": "",
        "TransactionId": "c602712f1325811b8e1abbac99b1c38e"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/06/2020",
        "Description": "HOUSEABLES       PAYROLL                    PPD ID: P942875288",
        "Amount": "942.91",
        "Type": "ACH_CREDIT",
        "Balance": "8125.41",
        "Check or Slip #": "",
        "TransactionId": "7460d804540e22c90fcd422fa89f92f7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/05/2020",
        "Description": "7-ELEVEN HUNTINGTON BE CA                    03/05",
        "Amount": "-3.35",
        "Type": "DEBIT_CARD",
        "Balance": "7182.5",
        "Check or Slip #": "",
        "TransactionId": "f2e83fe66e30934cea0ddc642bac7d47"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/05/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/04",
        "Amount": "-5.38",
        "Type": "DEBIT_CARD",
        "Balance": "7185.85",
        "Check or Slip #": "",
        "TransactionId": "83f8022db80c11ef285df3adc13ef17a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/03/2020",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-102",
        "Type": "ACH_DEBIT",
        "Balance": "7191.23",
        "Check or Slip #": "",
        "TransactionId": "144169d082bd0016a11ff5e8544c2c27"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/03/2020",
        "Description": "7-ELEVEN HUNTINGTON BE CA                    03/03",
        "Amount": "-2.14",
        "Type": "DEBIT_CARD",
        "Balance": "7293.23",
        "Check or Slip #": "",
        "TransactionId": "5351aad20191d8db6b0822326e3ec7b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/03/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/02",
        "Amount": "-6.78",
        "Type": "DEBIT_CARD",
        "Balance": "7295.37",
        "Check or Slip #": "",
        "TransactionId": "3b5901760e38ec20914785eeddf0a729"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/02/2020",
        "Description": "GOODWILL 422-BELMONT LONG BEACH CA   918767  03/01",
        "Amount": "-15",
        "Type": "DEBIT_CARD",
        "Balance": "7302.15",
        "Check or Slip #": "",
        "TransactionId": "c59d2d2025b367bf0e935e4a9b37192f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/02/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            03/01",
        "Amount": "-1.99",
        "Type": "DEBIT_CARD",
        "Balance": "7317.15",
        "Check or Slip #": "",
        "TransactionId": "3f1b6b6994584b1bfebfee737d8d088f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/02/2020",
        "Description": "WENDY'S #84400 LONG BEACH CA                 03/01",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "7319.14",
        "Check or Slip #": "",
        "TransactionId": "cf259b7ffa3842070da1a85e717be9c7"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/28/2020",
        "Description": "Square Inc       * Cash App T200201322231   CCD ID: 8800429876",
        "Amount": "1044.47",
        "Type": "ACH_CREDIT",
        "Balance": "7324.65",
        "Check or Slip #": "",
        "TransactionId": "5364eb0941bd91d91003c602d0d1f76e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/24/2020",
        "Description": "ARCO #42179 AMPM HUNTINGTON BE CA    794050  02/24",
        "Amount": "-37.13",
        "Type": "DEBIT_CARD",
        "Balance": "6280.18",
        "Check or Slip #": "",
        "TransactionId": "05695dde55f031208ce52a14fcfcfd0c"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/21/2020",
        "Description": "HOUSEABLES       PAYROLL                    PPD ID: P942875288",
        "Amount": "935.94",
        "Type": "ACH_CREDIT",
        "Balance": "6317.31",
        "Check or Slip #": "",
        "TransactionId": "043a5ea32820b4c787df035fe8ac5530"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2020",
        "Description": "MARKET VONS #2280 LONG BEACH CA      638678  02/19",
        "Amount": "-23.14",
        "Type": "DEBIT_CARD",
        "Balance": "5381.37",
        "Check or Slip #": "",
        "TransactionId": "9d6059291eeba602b658b14cf6c8de7b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/18",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5404.51",
        "Check or Slip #": "",
        "TransactionId": "223ddf32bcf561678af46e8f3948f3fc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/18",
        "Amount": "-3.1",
        "Type": "DEBIT_CARD",
        "Balance": "5405.51",
        "Check or Slip #": "",
        "TransactionId": "34549f7cadc2afaee6a4b04732125907"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/18/2020",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         223260  02/18",
        "Amount": "-5.69",
        "Type": "DEBIT_CARD",
        "Balance": "5408.61",
        "Check or Slip #": "",
        "TransactionId": "bd605346ac112343615b5557687389ec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/18/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/17",
        "Amount": "-6.6",
        "Type": "DEBIT_CARD",
        "Balance": "5414.3",
        "Check or Slip #": "",
        "TransactionId": "3cc9822b88ef273b5e6722c850f5540e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/18/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/15",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5420.9",
        "Check or Slip #": "",
        "TransactionId": "c5028d4db0907383f85a1df254fe48b1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/18/2020",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              02/15",
        "Amount": "-9.14",
        "Type": "DEBIT_CARD",
        "Balance": "5421.9",
        "Check or Slip #": "",
        "TransactionId": "010231b6353caac2cd6cbea8f72384da"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/18/2020",
        "Description": "ARCO #42246 AMPM ANAHEIM CA          753778  02/15",
        "Amount": "-30.45",
        "Type": "DEBIT_CARD",
        "Balance": "5431.04",
        "Check or Slip #": "",
        "TransactionId": "cc3fff8a66115e144d3840f2e4bb4b7a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/18/2020",
        "Description": "ROBINHOOD        Funds      645018383       WEB ID: 1464364776",
        "Amount": "4.27",
        "Type": "ACH_CREDIT",
        "Balance": "5461.49",
        "Check or Slip #": "",
        "TransactionId": "fe9cfb858cfd328d9ac48f8206547c2c"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/18/2020",
        "Description": "Square Inc       * Cash App T200197363594   CCD ID: 8800429876",
        "Amount": "203.06",
        "Type": "ACH_CREDIT",
        "Balance": "5457.22",
        "Check or Slip #": "",
        "TransactionId": "79fff0f1cb7c711ace1399f51280161b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/14/2020",
        "Description": "WEBULL FINANCIAL ACH        20200212128736  WEB ID: 2561673990",
        "Amount": "-1",
        "Type": "ACH_DEBIT",
        "Balance": "5254.16",
        "Check or Slip #": "",
        "TransactionId": "978b4b805233a6f1b76d18d12c004f1e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/14/2020",
        "Description": "7-ELEVEN HUNTINGTON BE CA                    02/14",
        "Amount": "-5.58",
        "Type": "DEBIT_CARD",
        "Balance": "5255.16",
        "Check or Slip #": "",
        "TransactionId": "6c7498d1c5f069ac251a98e22e7e0529"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/14/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/14",
        "Amount": "-1000",
        "Type": "DEBIT_CARD",
        "Balance": "5260.74",
        "Check or Slip #": "",
        "TransactionId": "ff692f47af8781cc9349d68dca444f35"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/14/2020",
        "Description": "DAIRY QUEEN #13058 GARDEN GROVE CA           02/14",
        "Amount": "-4.67",
        "Type": "DEBIT_CARD",
        "Balance": "6260.74",
        "Check or Slip #": "",
        "TransactionId": "60581d88cf7b1a5c1b1ef3d777793034"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/14/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/13",
        "Amount": "-93.79",
        "Type": "DEBIT_CARD",
        "Balance": "6265.41",
        "Check or Slip #": "",
        "TransactionId": "cc871199514ac4b46e0ad93aa8aad885"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/14/2020",
        "Description": "PAYPAL           TRANSFER                   PPD ID: PAYPALSD11",
        "Amount": "7.12",
        "Type": "ACH_CREDIT",
        "Balance": "6359.2",
        "Check or Slip #": "",
        "TransactionId": "eb08930ce4bffd805ad1a41d453fc5b4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/12/2020",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         983632  02/12",
        "Amount": "-8.98",
        "Type": "DEBIT_CARD",
        "Balance": "6352.08",
        "Check or Slip #": "",
        "TransactionId": "0b4dc4017d20402f3e8711be12f7085b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/10/2020",
        "Description": "ARCO #42155 LONG BEACH CA            872377  02/08",
        "Amount": "-31.89",
        "Type": "DEBIT_CARD",
        "Balance": "6361.06",
        "Check or Slip #": "",
        "TransactionId": "fef3d8ca6210049ee727db6f89b4142a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/10/2020",
        "Description": "WAL-MART #2609 LAKEWOOD CA                   02/08",
        "Amount": "-13.57",
        "Type": "DEBIT_CARD",
        "Balance": "6392.95",
        "Check or Slip #": "",
        "TransactionId": "518e630a48c2810f60c429921dab42ee"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/10/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/08",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "6406.52",
        "Check or Slip #": "",
        "TransactionId": "527f099fb16a0ee871b5d4578703de6b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/10/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            02/07",
        "Amount": "-903.15",
        "Type": "DEBIT_CARD",
        "Balance": "6416.52",
        "Check or Slip #": "",
        "TransactionId": "6feb46c7b706d7bd0603e0df21774539"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/07/2020",
        "Description": "FOOD4LESS 0518 STANTON CA            911138  02/07",
        "Amount": "-1.49",
        "Type": "DEBIT_CARD",
        "Balance": "7319.67",
        "Check or Slip #": "",
        "TransactionId": "2043b933fbce152b014c80d2e6505519"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/07/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/06",
        "Amount": "-2.58",
        "Type": "DEBIT_CARD",
        "Balance": "7321.16",
        "Check or Slip #": "",
        "TransactionId": "5457ecae1554e29ef33eb6774d818348"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/07/2020",
        "Description": "HOUSEABLES       PAYROLL                    PPD ID: P942875288",
        "Amount": "939.09",
        "Type": "ACH_CREDIT",
        "Balance": "7323.74",
        "Check or Slip #": "",
        "TransactionId": "1a60db9dfe733eb5c396614cdde0269b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/05/2020",
        "Description": "CAPITAL ONE CARD ONLINE DEP SW56ELXN3N9ETVZ WEB ID: 9541719881",
        "Amount": "-100",
        "Type": "ACH_DEBIT",
        "Balance": "6384.65",
        "Check or Slip #": "",
        "TransactionId": "5ea87c25a6a8eef33fe80aba011aaadb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/04/2020",
        "Description": "WINCO FOODS #107 3400 LAKEWOOD CA    623994  02/04",
        "Amount": "-23.84",
        "Type": "DEBIT_CARD",
        "Balance": "6484.65",
        "Check or Slip #": "",
        "TransactionId": "78b25488c4dcc03f47f50ce01cff7887"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/04/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            02/04",
        "Amount": "-60.17",
        "Type": "DEBIT_CARD",
        "Balance": "6508.49",
        "Check or Slip #": "",
        "TransactionId": "05dc748958c93a1decc361a7cb7d2c22"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/03/2020",
        "Description": "TST* CAROLINA S ITALIAN ANAHEIM CA           02/02",
        "Amount": "-39.49",
        "Type": "DEBIT_CARD",
        "Balance": "6568.66",
        "Check or Slip #": "",
        "TransactionId": "dbfc3b6de4bea01f3c0d74e18ffbb0ae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/31/2020",
        "Description": "ARCO #42179 AMPM HUNTINGTON BE CA    862526  01/31",
        "Amount": "-34.7",
        "Type": "DEBIT_CARD",
        "Balance": "6608.15",
        "Check or Slip #": "",
        "TransactionId": "f4425cc73a320742a2e1b3420afe48ad"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/30/2020",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-102",
        "Type": "ACH_DEBIT",
        "Balance": "6642.85",
        "Check or Slip #": "",
        "TransactionId": "49d936f845e2beae3a83b0ba71a08eed"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/30/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/30",
        "Amount": "-100",
        "Type": "DEBIT_CARD",
        "Balance": "6744.85",
        "Check or Slip #": "",
        "TransactionId": "e9c7f5f8f9a54f55bb16ed016ec1f2d6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2020",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         421101  01/29",
        "Amount": "-10.55",
        "Type": "DEBIT_CARD",
        "Balance": "6844.85",
        "Check or Slip #": "",
        "TransactionId": "a2913dfa84fc8fff3897be31be116ea7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/29",
        "Amount": "-13.01",
        "Type": "DEBIT_CARD",
        "Balance": "6855.4",
        "Check or Slip #": "",
        "TransactionId": "9f504d76a21f041de09cbcf379e0e6e1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/28",
        "Amount": "-50",
        "Type": "DEBIT_CARD",
        "Balance": "6868.41",
        "Check or Slip #": "",
        "TransactionId": "63919e6c2492261eb1aeb0a4132c282a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2020",
        "Description": "DOG HAUS LONG BEACH LONG BEACH CA            01/26",
        "Amount": "-12.11",
        "Type": "DEBIT_CARD",
        "Balance": "6918.41",
        "Check or Slip #": "",
        "TransactionId": "1d7d746e2218f4e9e72d3a3ce586d579"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/27/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/25",
        "Amount": "-23.85",
        "Type": "DEBIT_CARD",
        "Balance": "6930.52",
        "Check or Slip #": "",
        "TransactionId": "a525ab663e1960a7d964d773fb5835a1"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/24/2020",
        "Description": "HOUSEABLES       PAYROLL                    PPD ID: P942875288",
        "Amount": "930.88",
        "Type": "ACH_CREDIT",
        "Balance": "6954.37",
        "Check or Slip #": "",
        "TransactionId": "e7e0a2130108e2f93f0666069408bcf9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2020",
        "Description": "MCDONALD'S F6470 LONG BEACH CA               01/20",
        "Amount": "-5.38",
        "Type": "DEBIT_CARD",
        "Balance": "6023.49",
        "Check or Slip #": "",
        "TransactionId": "2c27256e7b52c09d716ae5503623ee41"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/21/2020",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         616926  01/21",
        "Amount": "-11.34",
        "Type": "DEBIT_CARD",
        "Balance": "6028.87",
        "Check or Slip #": "",
        "TransactionId": "d4f21e96e88f3a519397d0d598fe65ce"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/21/2020",
        "Description": "ARCO #42155 LONG BEACH CA            775411  01/20",
        "Amount": "-33.93",
        "Type": "DEBIT_CARD",
        "Balance": "6040.21",
        "Check or Slip #": "",
        "TransactionId": "b55249dcf6ca7cc299d9be12fe468dd9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/21/2020",
        "Description": "THE KROFT LONG BEACH CA                      01/20",
        "Amount": "-11.02",
        "Type": "DEBIT_CARD",
        "Balance": "6074.14",
        "Check or Slip #": "",
        "TransactionId": "5231d0a711ff12d8a349f895e3f3c6a9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/21/2020",
        "Description": "DAIRY QUEEN #13058 GARDEN GROVE CA           01/19",
        "Amount": "-3.33",
        "Type": "DEBIT_CARD",
        "Balance": "6085.16",
        "Check or Slip #": "",
        "TransactionId": "78cabd9860cd41ad5098a2d65c57239c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/21/2020",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              01/18",
        "Amount": "-9.14",
        "Type": "DEBIT_CARD",
        "Balance": "6088.49",
        "Check or Slip #": "",
        "TransactionId": "da3c750a5ce8c393e815c84d3a3be755"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/17/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/16",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "6097.63",
        "Check or Slip #": "",
        "TransactionId": "018b322a396f49733e10fbf8a23d5dd3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/16/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/16",
        "Amount": "-40.12",
        "Type": "DEBIT_CARD",
        "Balance": "6102.63",
        "Check or Slip #": "",
        "TransactionId": "8c92f547d49143afd00106bd6ce0ea9f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/13/2020",
        "Description": "ALDI 79027 WESTMINSTER CA                    01/13",
        "Amount": "-26.38",
        "Type": "DEBIT_CARD",
        "Balance": "6142.75",
        "Check or Slip #": "",
        "TransactionId": "11b3eb399eef49492eddaa0504b6c445"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/13/2020",
        "Description": "ARCO #42155 LONG BEACH CA            762766  01/12",
        "Amount": "-35.64",
        "Type": "DEBIT_CARD",
        "Balance": "6169.13",
        "Check or Slip #": "",
        "TransactionId": "931c49aea9bfd249ef51f0cdec27423f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/13/2020",
        "Description": "GRINDER RESTAURANTS SAN SAN PEDRO CA         01/13",
        "Amount": "-37.96",
        "Type": "DEBIT_CARD",
        "Balance": "6204.77",
        "Check or Slip #": "",
        "TransactionId": "c715b1001c751b13729fdb971ca8416f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/13/2020",
        "Description": "COSTCO WHSE #0424 SIGNAL HILL CA     467452  01/11",
        "Amount": "-4.92",
        "Type": "DEBIT_CARD",
        "Balance": "6242.73",
        "Check or Slip #": "",
        "TransactionId": "f0d77ebef629dd6aebd74786003e8ee9"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/10/2020",
        "Description": "HOUSEABLES       PAYROLL FO                 PPD ID: P942875288",
        "Amount": "589.95",
        "Type": "ACH_CREDIT",
        "Balance": "6247.65",
        "Check or Slip #": "",
        "TransactionId": "1b38e045327627fc6b329fea50cc2a13"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/09/2020",
        "Description": "WITHDRAWAL 01/09",
        "Amount": "-10",
        "Type": "MISC_DEBIT",
        "Balance": "5657.7",
        "Check or Slip #": "",
        "TransactionId": "dfa7072d6b5977e2a111fb84bfe6af6e"
    },
    {
        "Details": "DSLIP",
        "Posting Date": "01/08/2020",
        "Description": "DEPOSIT  ID NUMBER  74681",
        "Amount": "160",
        "Type": "DEPOSIT",
        "Balance": "5667.7",
        "Check or Slip #": "",
        "TransactionId": "c4505e7e3a63779f3ac1f9f4f2bcdf76"
    },
    {
        "Details": "DSLIP",
        "Posting Date": "01/08/2020",
        "Description": "DEPOSIT  ID NUMBER  74679",
        "Amount": "916.12",
        "Type": "DEPOSIT",
        "Balance": "5507.7",
        "Check or Slip #": "",
        "TransactionId": "3619f1629c11a456fdf00f59975fdc30"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2020",
        "Description": "PAYPAL *NETFLIX.COM 402-935-7733 CA          01/04",
        "Amount": "-6.96",
        "Type": "DEBIT_CARD",
        "Balance": "4591.58",
        "Check or Slip #": "",
        "TransactionId": "947f17bd29b1c6c35b2c06ca523a7427"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2020",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            01/06",
        "Amount": "-911.8",
        "Type": "DEBIT_CARD",
        "Balance": "4598.54",
        "Check or Slip #": "",
        "TransactionId": "5234a8f745b236f90806155a96c4b704"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2020",
        "Description": "WINCO FOODS #107 3400 LAKEWOOD CA    832285  01/05",
        "Amount": "-11.08",
        "Type": "DEBIT_CARD",
        "Balance": "5510.34",
        "Check or Slip #": "",
        "TransactionId": "445699c2b2d72fa0fdfeeb4d77d2bbaf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2020",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    01/05",
        "Amount": "-5.48",
        "Type": "DEBIT_CARD",
        "Balance": "5521.42",
        "Check or Slip #": "",
        "TransactionId": "e35e831b6c6e35523b48f094b168f85a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2020",
        "Description": "WAL-MART #4101 LONG BEACH CA                 01/05",
        "Amount": "-24.97",
        "Type": "DEBIT_CARD",
        "Balance": "5526.9",
        "Check or Slip #": "",
        "TransactionId": "d1a357ddc138b13027f9a09b58a6785b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2020",
        "Description": "ARCO #42155 LONG BEACH CA            846169  01/05",
        "Amount": "-36.25",
        "Type": "DEBIT_CARD",
        "Balance": "5551.87",
        "Check or Slip #": "",
        "TransactionId": "335f957dfaa9fe9fc590303e37874fec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2020",
        "Description": "LA METRO 7TH ST LOS ANGELES CA       537558  01/04",
        "Amount": "-1.75",
        "Type": "DEBIT_CARD",
        "Balance": "5588.12",
        "Check or Slip #": "",
        "TransactionId": "92c0f33cde31cc244873cb959bd72de5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2020",
        "Description": "CARLS JR 1119N Q29 LOS ANGELES CA            01/04",
        "Amount": "-6.55",
        "Type": "DEBIT_CARD",
        "Balance": "5589.87",
        "Check or Slip #": "",
        "TransactionId": "98e3a6d72da47f451bfbb9f33a70af96"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2020",
        "Description": "STARBUCKS STORE 17989 LOS ANGELES CA         01/04",
        "Amount": "-5.25",
        "Type": "DEBIT_CARD",
        "Balance": "5596.42",
        "Check or Slip #": "",
        "TransactionId": "8cac0522b5966b201041bbc1e6484eef"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2020",
        "Description": "CHICK-FIL-A #03750 LOS ANGELES CA            01/04",
        "Amount": "-5.09",
        "Type": "DEBIT_CARD",
        "Balance": "5601.67",
        "Check or Slip #": "",
        "TransactionId": "f9b409a17d50f226f1aa86a18b706dd7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2020",
        "Description": "LA METRO WARDLOW LONG BEACH CA       945360  01/04",
        "Amount": "-3.75",
        "Type": "DEBIT_CARD",
        "Balance": "5606.76",
        "Check or Slip #": "",
        "TransactionId": "2787e97dbb612d0da8b2b3c6f1a2633b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/06/2020",
        "Description": "7-ELEVEN LONG BEACH CA                       01/04",
        "Amount": "-1.49",
        "Type": "DEBIT_CARD",
        "Balance": "5610.51",
        "Check or Slip #": "",
        "TransactionId": "9bbcfae24bb4cf2a0041802f6489d320"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/03/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/03",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "5612",
        "Check or Slip #": "",
        "TransactionId": "86d55d7eb06d1dff585ddc8a30143d15"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/03/2020",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            01/02",
        "Amount": "-2.11",
        "Type": "DEBIT_CARD",
        "Balance": "5615",
        "Check or Slip #": "",
        "TransactionId": "24315286988ee9e0485a7d2471fbf775"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/03/2020",
        "Description": "UBER TECHNOLOGIES INC 866-576-1039 CA        01/02",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5617.11",
        "Check or Slip #": "",
        "TransactionId": "83bedd78ff0791e984354188bc8f4258"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/03/2020",
        "Description": "UBER TECHNOLOGIES INC 866-576-1039 CA        01/02",
        "Amount": "-12.36",
        "Type": "DEBIT_CARD",
        "Balance": "5618.11",
        "Check or Slip #": "",
        "TransactionId": "cd515c959e38c6fa51df23d4e4f004bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2020",
        "Description": "WINCO FOODS #107 3400 LAKEWOOD CA    629082  01/02",
        "Amount": "-14.86",
        "Type": "DEBIT_CARD",
        "Balance": "5630.47",
        "Check or Slip #": "",
        "TransactionId": "d041be02ab24230ba2f615fb23bb435d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/31/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-102.9",
        "Type": "ACH_DEBIT",
        "Balance": "5645.33",
        "Check or Slip #": "",
        "TransactionId": "f6b824db54495f13620747d78c58a434"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/31/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/30",
        "Amount": "-1.99",
        "Type": "DEBIT_CARD",
        "Balance": "5748.23",
        "Check or Slip #": "",
        "TransactionId": "24b7b8a479369a11c965c85ccd56574d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/31/2019",
        "Description": "CKE*FAIR OAKS COFFEE HO FAIR OAKS CA         12/30",
        "Amount": "-8.34",
        "Type": "DEBIT_CARD",
        "Balance": "5750.22",
        "Check or Slip #": "",
        "TransactionId": "07351d39dafb7812b3975b2d9b21abfd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/30/2019",
        "Description": "ORIGINAL MELS - FOLSOM FOLSOM CA             12/29",
        "Amount": "-43.6",
        "Type": "DEBIT_CARD",
        "Balance": "5758.56",
        "Check or Slip #": "",
        "TransactionId": "721c4a6a22c2a817694a0b447b16fdcb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/27/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/27",
        "Amount": "-9.01",
        "Type": "DEBIT_CARD",
        "Balance": "5802.16",
        "Check or Slip #": "",
        "TransactionId": "9fc6489b43e81a4a249a3f6906f80aff"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/27/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "915.79",
        "Type": "ACH_CREDIT",
        "Balance": "5811.17",
        "Check or Slip #": "",
        "TransactionId": "55bccb3be589221a11ebe84506cb29e3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2019",
        "Description": "LYFT   *RIDE THU 3AM LYFT.COM CA             12/26",
        "Amount": "-18.32",
        "Type": "DEBIT_CARD",
        "Balance": "4895.38",
        "Check or Slip #": "",
        "TransactionId": "87888b7850d946bffebfbed8370d0c42"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/25",
        "Amount": "-1.01",
        "Type": "DEBIT_CARD",
        "Balance": "4913.7",
        "Check or Slip #": "",
        "TransactionId": "596f9f3a62a299a809f9dac6e7f11728"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/24/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         744995  12/24",
        "Amount": "-11.63",
        "Type": "DEBIT_CARD",
        "Balance": "4914.71",
        "Check or Slip #": "",
        "TransactionId": "0af73e45bc7fce9f8d9f38ca64126140"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/23/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/23",
        "Amount": "-4.1",
        "Type": "DEBIT_CARD",
        "Balance": "4926.34",
        "Check or Slip #": "",
        "TransactionId": "931b62e936f37d832a40990bcb7504b8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/23/2019",
        "Description": "Wal-Mart Super Center LAKEWOOD CA            12/22",
        "Amount": "-50.41",
        "Type": "DEBIT_CARD",
        "Balance": "4930.44",
        "Check or Slip #": "",
        "TransactionId": "2cdb7ece4600d722e6d559e37e84de17"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/23/2019",
        "Description": "ROSS STORES #307 LONG BEACH CA               12/22",
        "Amount": "-14.32",
        "Type": "DEBIT_CARD",
        "Balance": "4980.85",
        "Check or Slip #": "",
        "TransactionId": "18c6e7d06bf3d82807a40d3be0c634ce"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/23/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/22",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "4995.17",
        "Check or Slip #": "",
        "TransactionId": "33b2027b2d23e95cfaef6b8975320cf1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/23/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/22",
        "Amount": "-10.97",
        "Type": "DEBIT_CARD",
        "Balance": "4996.17",
        "Check or Slip #": "",
        "TransactionId": "42f27906a90d092d660545aa3d45f0bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/23/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         076790  12/21",
        "Amount": "-8.77",
        "Type": "DEBIT_CARD",
        "Balance": "5007.14",
        "Check or Slip #": "",
        "TransactionId": "5735ad8d4d4856c7eb8a9621f2414312"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/19/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         081659  12/19",
        "Amount": "-31.55",
        "Type": "DEBIT_CARD",
        "Balance": "5015.91",
        "Check or Slip #": "",
        "TransactionId": "e5e7fd81accf27f07114d46a59f669d3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/18/2019",
        "Description": "7-ELEVEN HUNTINGTON BE CA                    12/18",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "5047.46",
        "Check or Slip #": "",
        "TransactionId": "685ab0b99251e3f3e37485a4a95a5c84"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/18/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/18",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5051.77",
        "Check or Slip #": "",
        "TransactionId": "827b5476912e6a68ab1ab570a855d44b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/18/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/17",
        "Amount": "-4.18",
        "Type": "DEBIT_CARD",
        "Balance": "5052.77",
        "Check or Slip #": "",
        "TransactionId": "fc34b09581e4cf975cd8dea4fa5fe9c4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/17/2019",
        "Description": "ARCO #42155 LONG BEACH CA            710164  12/17",
        "Amount": "-37.31",
        "Type": "DEBIT_CARD",
        "Balance": "5056.95",
        "Check or Slip #": "",
        "TransactionId": "ab5abbe5b2679497dc8a11b81c41ae5c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/16/2019",
        "Description": "RUBIO'S #033 LONG BEACH CA                   12/15",
        "Amount": "-1.87",
        "Type": "DEBIT_CARD",
        "Balance": "5094.26",
        "Check or Slip #": "",
        "TransactionId": "270e50a6edfc9cce19ec62899b45f1e8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/16/2019",
        "Description": "TACO BELL 2828 LONG BEACH CA                 12/15",
        "Amount": "-6.05",
        "Type": "DEBIT_CARD",
        "Balance": "5096.13",
        "Check or Slip #": "",
        "TransactionId": "c348e1d34c65ebda2668bd186c3d2d10"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/16/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              12/15",
        "Amount": "-91",
        "Type": "DEBIT_CARD",
        "Balance": "5102.18",
        "Check or Slip #": "",
        "TransactionId": "8fc65a2cb8a40db0db558bc6b7951b23"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/16/2019",
        "Description": "GODIVA 293 CERRITOS CA                       12/14",
        "Amount": "-14.95",
        "Type": "DEBIT_CARD",
        "Balance": "5193.18",
        "Check or Slip #": "",
        "TransactionId": "c748003702c7e0c1adf6b1c3206dfe46"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/16/2019",
        "Description": "BURGER KING #13869 ARTESIA CA                12/14",
        "Amount": "-6.57",
        "Type": "DEBIT_CARD",
        "Balance": "5208.13",
        "Check or Slip #": "",
        "TransactionId": "f21b0de694d2a1785b71182c521bdb58"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/16/2019",
        "Description": "WENDY'S 846 HUNTINGTON BE CA                 12/12",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "5214.7",
        "Check or Slip #": "",
        "TransactionId": "d7c1c74a6722ad6c0d7b3170f4e67db0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/13/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/12",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5219.01",
        "Check or Slip #": "",
        "TransactionId": "e24d118992d73dba5248258a57998e2a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/13/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "907.41",
        "Type": "ACH_CREDIT",
        "Balance": "5220.01",
        "Check or Slip #": "",
        "TransactionId": "853a07831ca073551f5e783b881ed4da"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/11/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         972225  12/11",
        "Amount": "-4.48",
        "Type": "DEBIT_CARD",
        "Balance": "4312.6",
        "Check or Slip #": "",
        "TransactionId": "4ee0debae50cef5920f65dcccd3b088f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         238874  12/10",
        "Amount": "-11.02",
        "Type": "DEBIT_CARD",
        "Balance": "4317.08",
        "Check or Slip #": "",
        "TransactionId": "35726c884e5467494e2b2b9d4f036a10"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/09",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "4328.1",
        "Check or Slip #": "",
        "TransactionId": "36d3d9f3a7da911d2bbb18d9a624367e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/09",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "4333.1",
        "Check or Slip #": "",
        "TransactionId": "aaf32d3fddf476b7e538521791534d34"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/09/2019",
        "Description": "ARCO #42155 LONG BEACH CA            801332  12/08",
        "Amount": "-41.57",
        "Type": "DEBIT_CARD",
        "Balance": "4336.1",
        "Check or Slip #": "",
        "TransactionId": "b09a7d6c121a2c822b6720b45b700edd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/09/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         118221  12/08",
        "Amount": "-10.33",
        "Type": "DEBIT_CARD",
        "Balance": "4377.67",
        "Check or Slip #": "",
        "TransactionId": "f2982b5553dbfb5be55c17217d0ffc23"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/09/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/07",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "4388",
        "Check or Slip #": "",
        "TransactionId": "6a597cab6b7b5f220e8aad6f0ec3dac4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/06/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/05",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "4398",
        "Check or Slip #": "",
        "TransactionId": "328fa5dbe71f4ed883987ea232298620"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/05/2019",
        "Description": "PAYPAL *NETFLIX.COM 402-935-7733 CA          12/04",
        "Amount": "-2.66",
        "Type": "DEBIT_CARD",
        "Balance": "4403",
        "Check or Slip #": "",
        "TransactionId": "27da815f8cd478826d134ddd9e8a1b15"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/04/2019",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            12/04",
        "Amount": "-798.98",
        "Type": "DEBIT_CARD",
        "Balance": "4405.66",
        "Check or Slip #": "",
        "TransactionId": "f12bcafe8b5804c10cb1a9d708a85bb8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/03/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/02",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5204.64",
        "Check or Slip #": "",
        "TransactionId": "9fa4949f9f9621582f2b7a4ce935023a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-104.82",
        "Type": "ACH_DEBIT",
        "Balance": "5205.64",
        "Check or Slip #": "",
        "TransactionId": "014b36a2d9145802db3275c66c6842f5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         361558  12/02",
        "Amount": "-13.2",
        "Type": "DEBIT_CARD",
        "Balance": "5310.46",
        "Check or Slip #": "",
        "TransactionId": "e22aa9013f8bfc0a2e4410cff055b654"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         611373  12/01",
        "Amount": "-7.98",
        "Type": "DEBIT_CARD",
        "Balance": "5323.66",
        "Check or Slip #": "",
        "TransactionId": "fbdbe1f9b8aca84b6df0c6fd84e6fcbc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2019",
        "Description": "RITE AID STORE - 6219 LONG BEACH CA  331151  12/01",
        "Amount": "-4.73",
        "Type": "DEBIT_CARD",
        "Balance": "5331.64",
        "Check or Slip #": "",
        "TransactionId": "6d3c8aebad7491b2d4a3185807f57749"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            12/01",
        "Amount": "-3.29",
        "Type": "DEBIT_CARD",
        "Balance": "5336.37",
        "Check or Slip #": "",
        "TransactionId": "0e972ac07604845fe801e0bde3e34edc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              12/01",
        "Amount": "-91",
        "Type": "DEBIT_CARD",
        "Balance": "5339.66",
        "Check or Slip #": "",
        "TransactionId": "2d83988c3212aa6843623bdf716556dd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2019",
        "Description": "RAISING CANE'S 358 LONG BEACH CA             11/30",
        "Amount": "-9.21",
        "Type": "DEBIT_CARD",
        "Balance": "5430.66",
        "Check or Slip #": "",
        "TransactionId": "0e04b4e2e8be73ae1182e34aa9ab811d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/30",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5439.87",
        "Check or Slip #": "",
        "TransactionId": "71be9283cf8e3481fc66fd76ef3bda2f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/02/2019",
        "Description": "JACK IN THE BOX 0216 LONG BEACH CA           11/29",
        "Amount": "-6.6",
        "Type": "DEBIT_CARD",
        "Balance": "5440.87",
        "Check or Slip #": "",
        "TransactionId": "a6f71f2abcfca8eb9316049907d279a9"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/29/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "905.56",
        "Type": "ACH_CREDIT",
        "Balance": "5447.47",
        "Check or Slip #": "",
        "TransactionId": "735a093933575009908f315045d812f8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/26/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         766392  11/26",
        "Amount": "-9.84",
        "Type": "DEBIT_CARD",
        "Balance": "4541.91",
        "Check or Slip #": "",
        "TransactionId": "0aeab439adda1c6e3a60d2e64ba08ba3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/25/2019",
        "Description": "ARCO #42155 LONG BEACH CA            772279  11/25",
        "Amount": "-42.6",
        "Type": "DEBIT_CARD",
        "Balance": "4551.75",
        "Check or Slip #": "",
        "TransactionId": "0e38387779294b156e53273ae3c47998"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/25/2019",
        "Description": "ALDI 79047 LONG BEACH CA                     11/24",
        "Amount": "-16.47",
        "Type": "DEBIT_CARD",
        "Balance": "4594.35",
        "Check or Slip #": "",
        "TransactionId": "1be8f3d37fd9c3770361339a5bc65c21"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/25/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/23",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "4610.82",
        "Check or Slip #": "",
        "TransactionId": "9ad5ad770aa6506f6059b53fc6272b4c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/22/2019",
        "Description": "WENDY'S 846 HUNTINGTON BE CA                 11/21",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "4616.32",
        "Check or Slip #": "",
        "TransactionId": "f941f3187e375b1a87b4704d7797fb8a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/21/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         514863  11/21",
        "Amount": "-14.1",
        "Type": "DEBIT_CARD",
        "Balance": "4620.63",
        "Check or Slip #": "",
        "TransactionId": "22c8ca5a3f3b1578726ec14fc825692a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/21/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         695995  11/20",
        "Amount": "-2.5",
        "Type": "DEBIT_CARD",
        "Balance": "4634.73",
        "Check or Slip #": "",
        "TransactionId": "768c504618459fe934ed40568233199d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/21/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/20",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "4637.23",
        "Check or Slip #": "",
        "TransactionId": "678d3012bbe1b9218c1010cccd772610"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         113906  11/19",
        "Amount": "-10.27",
        "Type": "DEBIT_CARD",
        "Balance": "4640.23",
        "Check or Slip #": "",
        "TransactionId": "109e9c0f3b14f798e7372b2749866458"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2019",
        "Description": "7-ELEVEN HUNTINGTON BE CA                    11/19",
        "Amount": "-2.63",
        "Type": "DEBIT_CARD",
        "Balance": "4650.5",
        "Check or Slip #": "",
        "TransactionId": "3022a45ecb7f57bb7ed5ab6a7f73e51b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2019",
        "Description": "BURGER KING #2119 LONG BEACH CA              11/17",
        "Amount": "-4.41",
        "Type": "DEBIT_CARD",
        "Balance": "4653.13",
        "Check or Slip #": "",
        "TransactionId": "6b1dc70a333bcb826e9019a236753b36"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/18/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              11/17",
        "Amount": "-90",
        "Type": "DEBIT_CARD",
        "Balance": "4657.54",
        "Check or Slip #": "",
        "TransactionId": "01c666afa93a732c625662dc5aafe5c4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/18/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/16",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "4747.54",
        "Check or Slip #": "",
        "TransactionId": "ee46804be9ee55e620b9c6abe8e64888"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/18/2019",
        "Description": "WENDY'S 846 HUNTINGTON BE CA                 11/15",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "4750.54",
        "Check or Slip #": "",
        "TransactionId": "5ad20e0787ff1396121203c4eff2103a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/15/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/14",
        "Amount": "-33.09",
        "Type": "DEBIT_CARD",
        "Balance": "4754.85",
        "Check or Slip #": "",
        "TransactionId": "760f1e35be0cd6fa1abbff0cd1293188"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/15/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "903.67",
        "Type": "ACH_CREDIT",
        "Balance": "4787.94",
        "Check or Slip #": "",
        "TransactionId": "1d737937ce0bfe02858328b9ec5033b0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/14/2019",
        "Description": "ARCO #42155 LONG BEACH CA            774614  11/14",
        "Amount": "-42.33",
        "Type": "DEBIT_CARD",
        "Balance": "3884.27",
        "Check or Slip #": "",
        "TransactionId": "85fbdf2e95592182a1351493f9fd87d2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/14/2019",
        "Description": "TACO BELL 146 LONG BEACH CA                  11/13",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "3926.6",
        "Check or Slip #": "",
        "TransactionId": "125d2291ad0ea089934483bbbdfd30be"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2019",
        "Description": "7-ELEVEN HUNTINGTON BE CA                    11/13",
        "Amount": "-2.63",
        "Type": "DEBIT_CARD",
        "Balance": "3932.11",
        "Check or Slip #": "",
        "TransactionId": "f5e348e9bd9b6e03e494d41bf882af4c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2019",
        "Description": "HABIT - LONG BEACH  #98 LONG BEACH CA        11/12",
        "Amount": "-2.98",
        "Type": "DEBIT_CARD",
        "Balance": "3934.74",
        "Check or Slip #": "",
        "TransactionId": "b3002c3877de6d949777ec09ec4b5f11"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/12/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/11",
        "Amount": "-5.77",
        "Type": "DEBIT_CARD",
        "Balance": "3937.72",
        "Check or Slip #": "",
        "TransactionId": "457eb9fbf3f56b473ae3f5f386fd6d93"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/12/2019",
        "Description": "SQ *BOBA GUYS LONG BEAC Long Beach CA        11/10",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "3943.49",
        "Check or Slip #": "",
        "TransactionId": "13a59b1e42aa935237a2fe91cd436d15"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/12/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/09",
        "Amount": "-14.11",
        "Type": "DEBIT_CARD",
        "Balance": "3948.99",
        "Check or Slip #": "",
        "TransactionId": "c7b9dd85f60b52b0457c4b14d4a164e5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/12/2019",
        "Description": "ARBYS 5853 LAKEWOOD CA                       11/09",
        "Amount": "-6.67",
        "Type": "DEBIT_CARD",
        "Balance": "3963.1",
        "Check or Slip #": "",
        "TransactionId": "6490e29f927a2f0ec8fa27c7104521e4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/12/2019",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            11/08",
        "Amount": "-767.5",
        "Type": "DEBIT_CARD",
        "Balance": "3969.77",
        "Check or Slip #": "",
        "TransactionId": "cb76fb3898dd99d42f401067ca0fa982"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         007140  11/06",
        "Amount": "-14.76",
        "Type": "DEBIT_CARD",
        "Balance": "4737.27",
        "Check or Slip #": "",
        "TransactionId": "ad17a26d5fd260d07e09960caf84e301"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         474654  11/06",
        "Amount": "-13.06",
        "Type": "DEBIT_CARD",
        "Balance": "4752.03",
        "Check or Slip #": "",
        "TransactionId": "f447562e3b69ffb1b57bea48fb4c91cd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2019",
        "Description": "DUNKIN #356694 LONG BEACH CA                 11/05",
        "Amount": "-2.21",
        "Type": "DEBIT_CARD",
        "Balance": "4765.09",
        "Check or Slip #": "",
        "TransactionId": "67c02b31b313ab38bcf7607c8be9435a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            11/05",
        "Amount": "-4.5",
        "Type": "DEBIT_CARD",
        "Balance": "4767.3",
        "Check or Slip #": "",
        "TransactionId": "5ee8f0419423d95694f0842f7ae116ea"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2019",
        "Description": "PAYPAL *NETFLIX.COM 402-935-7733 CA          11/04",
        "Amount": "-6.84",
        "Type": "DEBIT_CARD",
        "Balance": "4771.8",
        "Check or Slip #": "",
        "TransactionId": "fcb4821ec87b135bc72f2924922da67c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2019",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              11/02",
        "Amount": "-9.14",
        "Type": "DEBIT_CARD",
        "Balance": "4778.64",
        "Check or Slip #": "",
        "TransactionId": "71985a93b44b1f653f79ff2711ed9608"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/04/2019",
        "Description": "ARCO #42179 AMPM HUNTINGTON BE CA    790995  11/04",
        "Amount": "-44.42",
        "Type": "DEBIT_CARD",
        "Balance": "4787.78",
        "Check or Slip #": "",
        "TransactionId": "73f8eca3d5f4cb9b399da0514f8f550e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/04/2019",
        "Description": "Cash App*Cash Out VISA DIRECT CA     206462  11/02",
        "Amount": "25.86",
        "Type": "DEBIT_CARD",
        "Balance": "4832.2",
        "Check or Slip #": "",
        "TransactionId": "f9fa5b0ca360c5a22d0acaac45f2af65"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/01/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "914.75",
        "Type": "ACH_CREDIT",
        "Balance": "4806.34",
        "Check or Slip #": "",
        "TransactionId": "f4c0c44128d6253bdc3a34c6c6d472b3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/31/2019",
        "Description": "ALDI 79027 WESTMINSTER CA                    10/31",
        "Amount": "-7.48",
        "Type": "DEBIT_CARD",
        "Balance": "3891.59",
        "Check or Slip #": "",
        "TransactionId": "42af11f5d3ea446cc4366ea263715d9c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-104.83",
        "Type": "ACH_DEBIT",
        "Balance": "3899.07",
        "Check or Slip #": "",
        "TransactionId": "e2966de4759cdb8161729278c0da5d6e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/29",
        "Amount": "-2.25",
        "Type": "DEBIT_CARD",
        "Balance": "4003.9",
        "Check or Slip #": "",
        "TransactionId": "ba83b45c701de584c0aad016a98d0cda"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2019",
        "Description": "BURGER KING #4413 LONG BEACH CA              10/27",
        "Amount": "-3.31",
        "Type": "DEBIT_CARD",
        "Balance": "4006.15",
        "Check or Slip #": "",
        "TransactionId": "41533e5073d994dcf6449c6cfad055c1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/28/2019",
        "Description": "ALDI 79027 WESTMINSTER CA                    10/28",
        "Amount": "-14.23",
        "Type": "DEBIT_CARD",
        "Balance": "4009.46",
        "Check or Slip #": "",
        "TransactionId": "44a9f4b87ff2efed10339145dc1a4dd6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/28/2019",
        "Description": "ARBYS 5853 LAKEWOOD CA                       10/27",
        "Amount": "-9.63",
        "Type": "DEBIT_CARD",
        "Balance": "4023.69",
        "Check or Slip #": "",
        "TransactionId": "39145bb48c4ef6aa3b4730cf44b22b93"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/28/2019",
        "Description": "TST* BURGERIM - LONG BE LONG BEACH CA        10/26",
        "Amount": "-12.01",
        "Type": "DEBIT_CARD",
        "Balance": "4033.32",
        "Check or Slip #": "",
        "TransactionId": "23ad7289a23b237860dd06db573428d2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/24",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "4045.33",
        "Check or Slip #": "",
        "TransactionId": "11a22d68a4e43328b8a36f1ce0758491"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/24/2019",
        "Description": "TACO BELL #3075 NORWALK CA                   10/23",
        "Amount": "-5.48",
        "Type": "DEBIT_CARD",
        "Balance": "4049.64",
        "Check or Slip #": "",
        "TransactionId": "f04961647616ce2618d0bdf0ece9934c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/23/2019",
        "Description": "ARCO #42767 CERRITOS CA              725630  10/23",
        "Amount": "-42.97",
        "Type": "DEBIT_CARD",
        "Balance": "4055.12",
        "Check or Slip #": "",
        "TransactionId": "d39a4d3be81065de039c5ea169653075"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/23/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/22",
        "Amount": "-3.26",
        "Type": "DEBIT_CARD",
        "Balance": "4098.09",
        "Check or Slip #": "",
        "TransactionId": "6318f790a5a0e0e226425361560b2209"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         335898  10/21",
        "Amount": "-4.74",
        "Type": "DEBIT_CARD",
        "Balance": "4101.35",
        "Check or Slip #": "",
        "TransactionId": "2a54436f2b118f38c1576e19020cea29"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/21",
        "Amount": "-2.89",
        "Type": "DEBIT_CARD",
        "Balance": "4106.09",
        "Check or Slip #": "",
        "TransactionId": "3f5b5dbd3a6ffef3a37cafa38cb78748"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2019",
        "Description": "BURGER KING #9481 LONG BEACH CA              10/20",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "4108.98",
        "Check or Slip #": "",
        "TransactionId": "2cd4bdfa7576865deb9134fb6083e704"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2019",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              10/19",
        "Amount": "-9.14",
        "Type": "DEBIT_CARD",
        "Balance": "4114.49",
        "Check or Slip #": "",
        "TransactionId": "2e91f41cd2981919595067619976287d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/21/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              10/20",
        "Amount": "-98",
        "Type": "DEBIT_CARD",
        "Balance": "4123.63",
        "Check or Slip #": "",
        "TransactionId": "aa22f590cbdc29845002a7cb42cbde2d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/21/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/19",
        "Amount": "-16.88",
        "Type": "DEBIT_CARD",
        "Balance": "4221.63",
        "Check or Slip #": "",
        "TransactionId": "5c5bfa2033c008cf21badd13dc021bf8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/18/2019",
        "Description": "WENDY'S 846 HUNTINGTON BE CA                 10/17",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "4238.51",
        "Check or Slip #": "",
        "TransactionId": "724b1250f5e0741965cfc8b9a3fad01a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/18/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/17",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "4242.82",
        "Check or Slip #": "",
        "TransactionId": "10c6e65b5a3e258d67716c843640b1c8"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/18/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "972.35",
        "Type": "ACH_CREDIT",
        "Balance": "4244.32",
        "Check or Slip #": "",
        "TransactionId": "afee34234ea75011677d6522ddb0e613"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/17/2019",
        "Description": "WENDY'S 846 HUNTINGTON BE CA                 10/15",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "3271.97",
        "Check or Slip #": "",
        "TransactionId": "7ff110d416531e2cefee5b1333611503"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/16/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         993591  10/16",
        "Amount": "-12.57",
        "Type": "DEBIT_CARD",
        "Balance": "3276.28",
        "Check or Slip #": "",
        "TransactionId": "24c72a739743bd3e83553d3f26146f85"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/16/2019",
        "Description": "FANTASTIC CAFE #2 SAN PEDRO CA               10/14",
        "Amount": "-9.82",
        "Type": "DEBIT_CARD",
        "Balance": "3288.85",
        "Check or Slip #": "",
        "TransactionId": "2aa9b829e1662a880d9374a82d7662d3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         018548  10/15",
        "Amount": "-11.13",
        "Type": "DEBIT_CARD",
        "Balance": "3298.67",
        "Check or Slip #": "",
        "TransactionId": "efbebba53a0087a62789102f9f45a89d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/14",
        "Amount": "-4.65",
        "Type": "DEBIT_CARD",
        "Balance": "3309.8",
        "Check or Slip #": "",
        "TransactionId": "6b01bc0932d4a494ec34410b35975b4b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2019",
        "Description": "ARCO #42155 LONG BEACH CA            847715  10/14",
        "Amount": "-46.51",
        "Type": "DEBIT_CARD",
        "Balance": "3314.45",
        "Check or Slip #": "",
        "TransactionId": "8207fe641de4e649aec2d6144c6e0ee1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2019",
        "Description": "DOG HAUS LONG BEACH LONG BEACH CA            10/13",
        "Amount": "-27.51",
        "Type": "DEBIT_CARD",
        "Balance": "3360.96",
        "Check or Slip #": "",
        "TransactionId": "fef5b0646085e094a982d3f369e59c63"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2019",
        "Description": "CHICK-FIL-A #02503 LAKEWOOD CA               10/12",
        "Amount": "-9.03",
        "Type": "DEBIT_CARD",
        "Balance": "3388.47",
        "Check or Slip #": "",
        "TransactionId": "787252b7890a5b5f6621f906795a1234"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2019",
        "Description": "SOUTHWES    526212979 800-435-9792 TX        10/10",
        "Amount": "-146.96",
        "Type": "DEBIT_CARD",
        "Balance": "3397.5",
        "Check or Slip #": "",
        "TransactionId": "b99eda03dbcd17358c021c3b6dca2e52"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/15/2019",
        "Description": "Square Inc       * Cash App T200160074178   CCD ID: 8800429876",
        "Amount": "146.96",
        "Type": "ACH_CREDIT",
        "Balance": "3544.46",
        "Check or Slip #": "",
        "TransactionId": "bd4910fb1cfc25a367bf726359569360"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/11/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/10",
        "Amount": "-146.96",
        "Type": "DEBIT_CARD",
        "Balance": "3397.5",
        "Check or Slip #": "",
        "TransactionId": "73be0bce61c038e81088f5000df6ffa2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/11/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/10",
        "Amount": "-2.44",
        "Type": "DEBIT_CARD",
        "Balance": "3544.46",
        "Check or Slip #": "",
        "TransactionId": "a3e7e13353a3a29cf5730f92c7950dd2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/08/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         210395  10/08",
        "Amount": "-12.24",
        "Type": "DEBIT_CARD",
        "Balance": "3546.9",
        "Check or Slip #": "",
        "TransactionId": "9ca6b27ac74c6a2c0ef400fb4936efe6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/08/2019",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              10/05",
        "Amount": "-9.14",
        "Type": "DEBIT_CARD",
        "Balance": "3559.14",
        "Check or Slip #": "",
        "TransactionId": "3da5a1a988941ecad1de2ed042ecee29"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2019",
        "Description": "PAYPAL *NETFLIX.COM 402-935-7733 CA          10/04",
        "Amount": "-8.99",
        "Type": "DEBIT_CARD",
        "Balance": "3568.28",
        "Check or Slip #": "",
        "TransactionId": "191285685490c7307b8769bfb593c88a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2019",
        "Description": "VONS #3076 LONG BEACH CA             749650  10/07",
        "Amount": "-12.97",
        "Type": "DEBIT_CARD",
        "Balance": "3577.27",
        "Check or Slip #": "",
        "TransactionId": "a90f3f36bfa9454783d71b7bd9ef275b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2019",
        "Description": "TST* BURGERIM - LONG BE LONG BEACH CA        10/07",
        "Amount": "-12.01",
        "Type": "DEBIT_CARD",
        "Balance": "3590.24",
        "Check or Slip #": "",
        "TransactionId": "3fee78d62a9059263066f9623321615e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/06",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "3602.25",
        "Check or Slip #": "",
        "TransactionId": "67ce591041326aa3b3e267687fae31b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              10/06",
        "Amount": "-92",
        "Type": "DEBIT_CARD",
        "Balance": "3607.76",
        "Check or Slip #": "",
        "TransactionId": "7a34c2dbbcbef2b8f6d9a1718754390d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2019",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            10/06",
        "Amount": "-767.5",
        "Type": "DEBIT_CARD",
        "Balance": "3699.76",
        "Check or Slip #": "",
        "TransactionId": "7c18311a898bf1e6288026c46ab57f92"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2019",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            10/06",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "4467.26",
        "Check or Slip #": "",
        "TransactionId": "784765e9e5ad7c20bb974d4a68a7d717"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/05",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "4497.26",
        "Check or Slip #": "",
        "TransactionId": "a58cca6d610169150a4c6bc3032a0091"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2019",
        "Description": "GAMESTOP #4644 129 LAK LAKEWOOD CA   424648  10/05",
        "Amount": "-121.44",
        "Type": "DEBIT_CARD",
        "Balance": "4507.26",
        "Check or Slip #": "",
        "TransactionId": "9886f47fdc16189b04fdbf510112a256"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/07/2019",
        "Description": "WENDY'S 846 HUNTINGTON BE CA                 10/02",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "4628.7",
        "Check or Slip #": "",
        "TransactionId": "f256e763f6e9c45d6456a88895c6a7f8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/04/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            10/03",
        "Amount": "-3.3",
        "Type": "DEBIT_CARD",
        "Balance": "4633.01",
        "Check or Slip #": "",
        "TransactionId": "e07c02d51dfd8cb11e8c6ccae9f107e8"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/04/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "914.23",
        "Type": "ACH_CREDIT",
        "Balance": "4636.31",
        "Check or Slip #": "",
        "TransactionId": "9532179dbc4dd0d04adccbfbd3647b23"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/03/2019",
        "Description": "ARCO #42155 LONG BEACH CA            719198  10/03",
        "Amount": "-43.3",
        "Type": "DEBIT_CARD",
        "Balance": "3722.08",
        "Check or Slip #": "",
        "TransactionId": "b98233bec4568633dda1972036059616"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-104.83",
        "Type": "ACH_DEBIT",
        "Balance": "3765.38",
        "Check or Slip #": "",
        "TransactionId": "da886a62fd7fdc57bd0fed2ec5f0da52"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         840857  10/01",
        "Amount": "-13.65",
        "Type": "DEBIT_CARD",
        "Balance": "3870.21",
        "Check or Slip #": "",
        "TransactionId": "60694ee85bdf376ef8f45676f9aecb4d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2019",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              09/28",
        "Amount": "-9.14",
        "Type": "DEBIT_CARD",
        "Balance": "3883.86",
        "Check or Slip #": "",
        "TransactionId": "0cce2160988767c2e782686883d5e83b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/30/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         146537  09/30",
        "Amount": "-14.26",
        "Type": "DEBIT_CARD",
        "Balance": "3893",
        "Check or Slip #": "",
        "TransactionId": "4be41152cf5c9628e7ceeeaeb8ffd61c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/30/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/29",
        "Amount": "-4.03",
        "Type": "DEBIT_CARD",
        "Balance": "3907.26",
        "Check or Slip #": "",
        "TransactionId": "b91f19cb4c9c502a4fec8a7e802bb732"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/30/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/28",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "3911.29",
        "Check or Slip #": "",
        "TransactionId": "a590d61c5f5a133c0583221fa3788e74"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/25/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/24",
        "Amount": "-4.01",
        "Type": "DEBIT_CARD",
        "Balance": "3917.29",
        "Check or Slip #": "",
        "TransactionId": "6626055f5b55554c5f2746671e9f71c3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/24/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         659417  09/24",
        "Amount": "-17.46",
        "Type": "DEBIT_CARD",
        "Balance": "3921.3",
        "Check or Slip #": "",
        "TransactionId": "50833ee8f0f665e70f38597d0740d551"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/24/2019",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              09/21",
        "Amount": "-9.14",
        "Type": "DEBIT_CARD",
        "Balance": "3938.76",
        "Check or Slip #": "",
        "TransactionId": "782dea77169109c11d8c37266f7259c8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/23/2019",
        "Description": "ARCO #42155 LONG BEACH CA                    09/23",
        "Amount": "-42.39",
        "Type": "DEBIT_CARD",
        "Balance": "3947.9",
        "Check or Slip #": "",
        "TransactionId": "6f7e86ee279c85ffd14ebce414c6a947"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/23/2019",
        "Description": "ALDI 79047 LONG BEACH CA                     09/22",
        "Amount": "-8.9",
        "Type": "DEBIT_CARD",
        "Balance": "3990.29",
        "Check or Slip #": "",
        "TransactionId": "98448fa02d1147684c13546b6ce77575"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/23/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              09/22",
        "Amount": "-82",
        "Type": "DEBIT_CARD",
        "Balance": "3999.19",
        "Check or Slip #": "",
        "TransactionId": "958041f9bb841de5f949d4a703c1dad1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/23/2019",
        "Description": "CASH APP*JOSH FLEMI 8774174551 CA            09/21",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "4081.19",
        "Check or Slip #": "",
        "TransactionId": "078d206818eedfd4a66690212fcc5b9f"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/20/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "816.23",
        "Type": "ACH_CREDIT",
        "Balance": "4082.19",
        "Check or Slip #": "",
        "TransactionId": "135d500ff8d95a04291753e542345f41"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/19/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         493371  09/19",
        "Amount": "-7.99",
        "Type": "DEBIT_CARD",
        "Balance": "3265.96",
        "Check or Slip #": "",
        "TransactionId": "073580dee99a7cf4db6f333340e27427"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/18/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/17",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "3273.95",
        "Check or Slip #": "",
        "TransactionId": "83877e65501756524807dbc3b800ea4d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/16",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "3275.95",
        "Check or Slip #": "",
        "TransactionId": "94ff54b731fd9bd05da02036db21180a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2019",
        "Description": "DOG HAUS LONG BEACH LONG BEACH CA            09/15",
        "Amount": "-12.11",
        "Type": "DEBIT_CARD",
        "Balance": "3285.95",
        "Check or Slip #": "",
        "TransactionId": "c2d2ff058ed0c1ca7bc1e96785e78651"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2019",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              09/14",
        "Amount": "-9.14",
        "Type": "DEBIT_CARD",
        "Balance": "3298.06",
        "Check or Slip #": "",
        "TransactionId": "c615411a8dc549375ea2535dc85a39d7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/16/2019",
        "Description": "TARGET        00014092 LAKEWOOD CA           09/14",
        "Amount": "-37.71",
        "Type": "DEBIT_CARD",
        "Balance": "3307.2",
        "Check or Slip #": "",
        "TransactionId": "cbed7889ad77daf2b495b5031b400c79"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/16/2019",
        "Description": "JIFFY LUBE #602 LAKEWOOD CA                  09/14",
        "Amount": "-164.49",
        "Type": "DEBIT_CARD",
        "Balance": "3344.91",
        "Check or Slip #": "",
        "TransactionId": "ff5e1a01e8f7e2e3a8a93f3a4e24460a"
    },
    {
        "Details": "DSLIP",
        "Posting Date": "09/16/2019",
        "Description": "DEPOSIT  ID NUMBER 231682",
        "Amount": "115.11",
        "Type": "DEPOSIT",
        "Balance": "3509.4",
        "Check or Slip #": "",
        "TransactionId": "1d0a9371223b61ce2b52f7d12d577e6e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/13/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/12",
        "Amount": "-3.3",
        "Type": "DEBIT_CARD",
        "Balance": "3394.29",
        "Check or Slip #": "",
        "TransactionId": "8993c96f5dc6877160f327e713a39454"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/12/2019",
        "Description": "ARCO #42155 LONG BEACH CA                    09/11",
        "Amount": "-38.5",
        "Type": "DEBIT_CARD",
        "Balance": "3397.59",
        "Check or Slip #": "",
        "TransactionId": "137219b6074dec68b0710b02148fce98"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/11/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/10",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "3436.09",
        "Check or Slip #": "",
        "TransactionId": "e9889d3ce960f4f223b903152db33ae9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/11/2019",
        "Description": "CASH APP*GEORGE OSP 415-375-3176 CA          09/10",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "3442.09",
        "Check or Slip #": "",
        "TransactionId": "52310181c8f2421888ad4ea27e07b5a2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/11/2019",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            09/10",
        "Amount": "-767.5",
        "Type": "DEBIT_CARD",
        "Balance": "3472.09",
        "Check or Slip #": "",
        "TransactionId": "28a248b30171d53dbb983c20411a37bb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/10/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         504227  09/10",
        "Amount": "-9.87",
        "Type": "DEBIT_CARD",
        "Balance": "4239.59",
        "Check or Slip #": "",
        "TransactionId": "229d8feccde125383869e4e9a5450dd2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/09/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              09/08",
        "Amount": "-89",
        "Type": "DEBIT_CARD",
        "Balance": "4249.46",
        "Check or Slip #": "",
        "TransactionId": "c83468144b0e78697bd53e5598319d02"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/09/2019",
        "Description": "SOUPLANTATION 6 Q02 LAKEWOOD CA              09/07",
        "Amount": "-13.68",
        "Type": "DEBIT_CARD",
        "Balance": "4338.46",
        "Check or Slip #": "",
        "TransactionId": "c19c1b3e7effd1366495642161818b2c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/06/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         661896  09/05",
        "Amount": "-3.99",
        "Type": "DEBIT_CARD",
        "Balance": "4352.14",
        "Check or Slip #": "",
        "TransactionId": "d9a01e3832b59299ea832b36bf8ad61a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/06/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/05",
        "Amount": "-4.06",
        "Type": "DEBIT_CARD",
        "Balance": "4356.13",
        "Check or Slip #": "",
        "TransactionId": "fb0b5fabef0cace6eea1b64491cf9c31"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/06/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "890.02",
        "Type": "ACH_CREDIT",
        "Balance": "4360.19",
        "Check or Slip #": "",
        "TransactionId": "443219f7638fa6db98571001512d3163"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/05/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/04",
        "Amount": "-3.41",
        "Type": "DEBIT_CARD",
        "Balance": "3470.17",
        "Check or Slip #": "",
        "TransactionId": "6b121205d6604c118fa2e851b82b2bbd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/05/2019",
        "Description": "PAYPAL *NETFLIX.COM 402-935-7733 CA          09/04",
        "Amount": "-8.99",
        "Type": "DEBIT_CARD",
        "Balance": "3473.58",
        "Check or Slip #": "",
        "TransactionId": "2d9f13233a78fab1880cbf49faf687a4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/04/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         730339  09/04",
        "Amount": "-5.79",
        "Type": "DEBIT_CARD",
        "Balance": "3482.57",
        "Check or Slip #": "",
        "TransactionId": "bf850ca174787d17aa3b5ae7c8019c0a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/03/2019",
        "Description": "FUDDRUCKERS 3078 LAKEWOOD CA                 09/02",
        "Amount": "-14.21",
        "Type": "DEBIT_CARD",
        "Balance": "3488.36",
        "Check or Slip #": "",
        "TransactionId": "e1ba61635ed3e393eabd4f1e20977b1a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/03/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         688504  09/02",
        "Amount": "-28.08",
        "Type": "DEBIT_CARD",
        "Balance": "3502.57",
        "Check or Slip #": "",
        "TransactionId": "b63cd0a937356a7e8089bd42a6dec170"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/03/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            09/01",
        "Amount": "-4.51",
        "Type": "DEBIT_CARD",
        "Balance": "3530.65",
        "Check or Slip #": "",
        "TransactionId": "037c1653872ef9ad05810a82ef1e80a0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-104.83",
        "Type": "ACH_DEBIT",
        "Balance": "3535.16",
        "Check or Slip #": "",
        "TransactionId": "ed966f254683222fcf78727a5e41258b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2019",
        "Description": "ARCO #42179 AMPM HUNTINGTON BE CA            08/30",
        "Amount": "-38.72",
        "Type": "DEBIT_CARD",
        "Balance": "3639.99",
        "Check or Slip #": "",
        "TransactionId": "3fc68036e17b6e9509e06ef0e86c7e3e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/29",
        "Amount": "-5.39",
        "Type": "DEBIT_CARD",
        "Balance": "3678.71",
        "Check or Slip #": "",
        "TransactionId": "e4a372d5f51a9f93e831d2c272e73994"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/29/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/28",
        "Amount": "-4.28",
        "Type": "DEBIT_CARD",
        "Balance": "3684.1",
        "Check or Slip #": "",
        "TransactionId": "7c23c067a978cc8092085e94e6422a4e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/29/2019",
        "Description": "BURGER KING #4413 LONG BEACH CA              08/27",
        "Amount": "-3.31",
        "Type": "DEBIT_CARD",
        "Balance": "3688.38",
        "Check or Slip #": "",
        "TransactionId": "6532d4da8aed003dbb43cf10706c34f5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/26/2019",
        "Description": "7-ELEVEN HUNTINGTON BE CA                    08/26",
        "Amount": "-3.28",
        "Type": "DEBIT_CARD",
        "Balance": "3691.69",
        "Check or Slip #": "",
        "TransactionId": "6b2538ae98c0725f64df92005d576dd2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/26/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         875298  08/25",
        "Amount": "-13.67",
        "Type": "DEBIT_CARD",
        "Balance": "3694.97",
        "Check or Slip #": "",
        "TransactionId": "b1a254ce07085b10cba36112aa6ae561"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/26/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/25",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "3708.64",
        "Check or Slip #": "",
        "TransactionId": "3f71302c541d4b0854f4ac6937e0a3aa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/26/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              08/25",
        "Amount": "-90",
        "Type": "DEBIT_CARD",
        "Balance": "3713.64",
        "Check or Slip #": "",
        "TransactionId": "f79af25cf881d1ae11f945bcccebd7d3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/26/2019",
        "Description": "KNOTT'S BERRY FARM MERC BUENA PARK CA        08/23",
        "Amount": "-5.98",
        "Type": "DEBIT_CARD",
        "Balance": "3803.64",
        "Check or Slip #": "",
        "TransactionId": "b86b071e61362efcc059d7e11419cfe5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/26/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/23",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "3809.62",
        "Check or Slip #": "",
        "TransactionId": "525324412b0bfb9d6730abade7f015a0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/26/2019",
        "Description": "MCDONALD'S F1058 HUNTINGTON BE CA            08/22",
        "Amount": "-4.62",
        "Type": "DEBIT_CARD",
        "Balance": "3821.62",
        "Check or Slip #": "",
        "TransactionId": "7d2c8bac5955418f3c3c9b3219b60dfb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/26/2019",
        "Description": "WENDY'S 846 HUNTINGTON BE CA                 08/20",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "3826.24",
        "Check or Slip #": "",
        "TransactionId": "022c2ae50e9baf7056940d87af35caad"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/23/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "906.67",
        "Type": "ACH_CREDIT",
        "Balance": "3830.55",
        "Check or Slip #": "",
        "TransactionId": "21d3de2ae3600c9e7d7caf8d64ac6113"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/22/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/21",
        "Amount": "-6.3",
        "Type": "DEBIT_CARD",
        "Balance": "2923.88",
        "Check or Slip #": "",
        "TransactionId": "24dd7ec29339261987dab55b0318a0d4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/20/2019",
        "Description": "DOG HAUS LONG BEACH LONG BEACH CA            08/18",
        "Amount": "-16.5",
        "Type": "DEBIT_CARD",
        "Balance": "2930.18",
        "Check or Slip #": "",
        "TransactionId": "45ec99a489f6f35e13c9f154e24efcbb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/19/2019",
        "Description": "ARCO #42179 AMPM HUNTINGTON BE CA            08/19",
        "Amount": "-38.65",
        "Type": "DEBIT_CARD",
        "Balance": "2946.68",
        "Check or Slip #": "",
        "TransactionId": "932f9c96b5e330978a5e8581e7606c78"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/19/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         703813  08/18",
        "Amount": "-1.99",
        "Type": "DEBIT_CARD",
        "Balance": "2985.33",
        "Check or Slip #": "",
        "TransactionId": "916bd97c54992ad3146742da74be0671"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/15/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         194589  08/15",
        "Amount": "-10.39",
        "Type": "DEBIT_CARD",
        "Balance": "2987.32",
        "Check or Slip #": "",
        "TransactionId": "363916ac411fbf3591f4d9d35c300b10"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/15/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         549093  08/14",
        "Amount": "-11.47",
        "Type": "DEBIT_CARD",
        "Balance": "2997.71",
        "Check or Slip #": "",
        "TransactionId": "495f1df18156cb8fd978e51d584ae6e9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/15/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/14",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "3009.18",
        "Check or Slip #": "",
        "TransactionId": "1be99b809c472406ad8fe003adb3bfa8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/14/2019",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              08/11",
        "Amount": "-9.14",
        "Type": "DEBIT_CARD",
        "Balance": "3011.18",
        "Check or Slip #": "",
        "TransactionId": "00e4182157cbf0158798bded2a4db8b4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/12/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              08/11",
        "Amount": "-92",
        "Type": "DEBIT_CARD",
        "Balance": "3020.32",
        "Check or Slip #": "",
        "TransactionId": "ace0a802597e0960202193b0774702ef"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/12/2019",
        "Description": "VONS     Store  3076 LONG BEACH CA           08/10",
        "Amount": "-14.96",
        "Type": "DEBIT_CARD",
        "Balance": "3112.32",
        "Check or Slip #": "",
        "TransactionId": "a8a1b6ab3b61198b2a139f305eeb0d3a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/12/2019",
        "Description": "BURGER KING #4413 LONG BEACH CA              08/10",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "3127.28",
        "Check or Slip #": "",
        "TransactionId": "52d605e984e751374e347e572bafe791"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/12/2019",
        "Description": "WENDY'S 846 HUNTINGTON BE CA                 08/07",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "3132.79",
        "Check or Slip #": "",
        "TransactionId": "572da8f316d35060ef5e45c6a83294b2"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/09/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "921.5",
        "Type": "ACH_CREDIT",
        "Balance": "3137.1",
        "Check or Slip #": "",
        "TransactionId": "a9df5750ae2fa82128f28137b2a0ee93"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/08/2019",
        "Description": "ARCO #42179 AMPM HUNTINGTON BE CA            08/08",
        "Amount": "-2.34",
        "Type": "DEBIT_CARD",
        "Balance": "2215.6",
        "Check or Slip #": "",
        "TransactionId": "954dcf2bcd8104567b6900cbe9eb9451"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/08/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         601647  08/08",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "2217.94",
        "Check or Slip #": "",
        "TransactionId": "dd778ece64f3d3030bbff0845062680b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/07/2019",
        "Description": "ARCO #42179 AMPM HUNTINGTON BE CA            08/07",
        "Amount": "-3.63",
        "Type": "DEBIT_CARD",
        "Balance": "2221.94",
        "Check or Slip #": "",
        "TransactionId": "d4623757d9327ef8aa1193d6d2655cef"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/07/2019",
        "Description": "ARCO #42155 LONG BEACH CA                    08/07",
        "Amount": "-38.68",
        "Type": "DEBIT_CARD",
        "Balance": "2225.57",
        "Check or Slip #": "",
        "TransactionId": "ac5932b130eb1c79efa403e19efba666"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/07/2019",
        "Description": "CASH APP*GEORGE OSP 8774174551 CA            08/06",
        "Amount": "-767.5",
        "Type": "DEBIT_CARD",
        "Balance": "2264.25",
        "Check or Slip #": "",
        "TransactionId": "a2d32e48ee4439e4f0142b7fadf97a46"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/06/2019",
        "Description": "CASH APP*JEREMY BOA 8774174551 CA            08/05",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "3031.75",
        "Check or Slip #": "",
        "TransactionId": "b14fbfb0a06653c6ba361ffb7d5fdcc6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/05/2019",
        "Description": "PAYPAL *NETFLIX.COM 402-935-7733 CA          08/04",
        "Amount": "-8.99",
        "Type": "DEBIT_CARD",
        "Balance": "3035.75",
        "Check or Slip #": "",
        "TransactionId": "c31ba0db4c1b71dbc000060bd5dbc507"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/05/2019",
        "Description": "FUDDRUCKERS 3078 LAKEWOOD CA                 08/03",
        "Amount": "-7.67",
        "Type": "DEBIT_CARD",
        "Balance": "3044.74",
        "Check or Slip #": "",
        "TransactionId": "c799359e281c04ee304fc8fe5954fd08"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/05/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         792699  08/03",
        "Amount": "-17.08",
        "Type": "DEBIT_CARD",
        "Balance": "3052.41",
        "Check or Slip #": "",
        "TransactionId": "5678b3b46f1382343dda7bc06eda77bd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/02/2019",
        "Description": "HOBBYLOBBY 7202 EDIN HUNTINGTON BE CA725434  08/02",
        "Amount": "-10.53",
        "Type": "DEBIT_CARD",
        "Balance": "3069.49",
        "Check or Slip #": "",
        "TransactionId": "b31b24a6b9da57a80e272b0b8a45a4ff"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/02/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   08/01",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "3080.02",
        "Check or Slip #": "",
        "TransactionId": "789452198d68624c8d55975137535c38"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/02/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   08/01",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "3081.02",
        "Check or Slip #": "",
        "TransactionId": "af448c8e3293c6e4b47961abf4f9356d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/01/2019",
        "Description": "DAIRY QUEEN #13058 GARDEN GROVE CA           07/31",
        "Amount": "-5.44",
        "Type": "DEBIT_CARD",
        "Balance": "3086.02",
        "Check or Slip #": "",
        "TransactionId": "58a58e1eabda8f5fb1ee7f91da9ce041"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/31/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   07/30",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "3091.46",
        "Check or Slip #": "",
        "TransactionId": "72c224c049024e9ecfd4165c9ac50a56"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/31/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   07/30",
        "Amount": "-4.99",
        "Type": "DEBIT_CARD",
        "Balance": "3092.46",
        "Check or Slip #": "",
        "TransactionId": "dc88585f5c9cc25b3e847d1cc366123a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/30/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-104.83",
        "Type": "ACH_DEBIT",
        "Balance": "3097.45",
        "Check or Slip #": "",
        "TransactionId": "baa5e58edd548b5b7b94b906ee222f96"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/29/2019",
        "Description": "POPEYES #3352 LONG BEACH CA                  07/28",
        "Amount": "-11.02",
        "Type": "DEBIT_CARD",
        "Balance": "3202.28",
        "Check or Slip #": "",
        "TransactionId": "073ac415e6ec4c2cc385d6eb7d3d9834"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/29/2019",
        "Description": "DOLLAR TREE LONG BEACH CA                    07/28",
        "Amount": "-4.15",
        "Type": "DEBIT_CARD",
        "Balance": "3213.3",
        "Check or Slip #": "",
        "TransactionId": "8287cbf442f360e25e1a0fa666ce2c3f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/29/2019",
        "Description": "GOODWILL 422-BELMONT LONG BEACH CA   825524  07/28",
        "Amount": "-5.99",
        "Type": "DEBIT_CARD",
        "Balance": "3217.45",
        "Check or Slip #": "",
        "TransactionId": "71ad5eec029d12ba082676724abc27bc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/29/2019",
        "Description": "ARCO #42155 LONG BEACH CA                    07/28",
        "Amount": "-40.65",
        "Type": "DEBIT_CARD",
        "Balance": "3223.44",
        "Check or Slip #": "",
        "TransactionId": "4f8f909632ebcaaffc9f2cccc4d31f40"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/29/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              07/28",
        "Amount": "-97",
        "Type": "DEBIT_CARD",
        "Balance": "3264.09",
        "Check or Slip #": "",
        "TransactionId": "9500e3ef18656aa9a29ca329e2dce0d6"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/29/2019",
        "Description": "ATM CASH DEPOSIT 07/28 940 LONG BEACH BLVD LONG BEACH CA",
        "Amount": "200",
        "Type": "ATM",
        "Balance": "3361.09",
        "Check or Slip #": "",
        "TransactionId": "e11e99111d5b7f686942382fa0221a92"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2019",
        "Description": "DUNKIN #352440 Q35 LONG BEACH CA             07/25",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "3161.09",
        "Check or Slip #": "",
        "TransactionId": "43f91040a536d2979cbc60cc49203f71"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/26/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "968.84",
        "Type": "ACH_CREDIT",
        "Balance": "3166.6",
        "Check or Slip #": "",
        "TransactionId": "2a4f1ddb5703e115d744e427d4d33c37"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/25/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   07/24",
        "Amount": "-4.57",
        "Type": "DEBIT_CARD",
        "Balance": "2197.76",
        "Check or Slip #": "",
        "TransactionId": "8e70b108d0ea1a2ff28cd84130c17718"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2019",
        "Description": "SQC*CASH APP GEORGE 8774174551 CA            07/22",
        "Amount": "-40",
        "Type": "DEBIT_CARD",
        "Balance": "2202.33",
        "Check or Slip #": "",
        "TransactionId": "85753a02d77bf460fb223a4e9a58505c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/22/2019",
        "Description": "WM SUPERC Wal-Mart Sup LAKEWOOD CA           07/20",
        "Amount": "-11.4",
        "Type": "DEBIT_CARD",
        "Balance": "2242.33",
        "Check or Slip #": "",
        "TransactionId": "44eab793df84bc8ae4f4a559e4d317f3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/22/2019",
        "Description": "WAL-MART #2609 LAKEWOOD CA                   07/20",
        "Amount": "-21.89",
        "Type": "DEBIT_CARD",
        "Balance": "2253.73",
        "Check or Slip #": "",
        "TransactionId": "e5b43ef638128a106cbc0eb2b110c9f2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/22/2019",
        "Description": "FUDDRUCKERS 3078 LAKEWOOD CA                 07/20",
        "Amount": "-9.86",
        "Type": "DEBIT_CARD",
        "Balance": "2275.62",
        "Check or Slip #": "",
        "TransactionId": "1444b880fd957a12db7627112238ba55"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/22/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         335471  07/20",
        "Amount": "-12.04",
        "Type": "DEBIT_CARD",
        "Balance": "2285.48",
        "Check or Slip #": "",
        "TransactionId": "d2f94239b4cce0233501950872bd6129"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/22/2019",
        "Description": "WAL-MART #2609 LAKEWOOD CA                   07/20",
        "Amount": "13.11",
        "Type": "DEBIT_CARD",
        "Balance": "2297.52",
        "Check or Slip #": "",
        "TransactionId": "eba90ee585d0fb9e918b06d4191ce731"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/19/2019",
        "Description": "WENDY'S 846 HUNTINGTON BE CA                 07/17",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "2284.41",
        "Check or Slip #": "",
        "TransactionId": "eb7a4b6a8da1b7bce13bed50fb674cd6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/18/2019",
        "Description": "VONS STORE        20 HUNTINGTON BE CA012589  07/18",
        "Amount": "-3.99",
        "Type": "DEBIT_CARD",
        "Balance": "2288.72",
        "Check or Slip #": "",
        "TransactionId": "81ac425252967efc78a59024762f826b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/17/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   07/16",
        "Amount": "-5.38",
        "Type": "DEBIT_CARD",
        "Balance": "2292.71",
        "Check or Slip #": "",
        "TransactionId": "91b4cee77d47a873b67fcdabb565444b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/16/2019",
        "Description": "ARCO #42155 LONG BEACH CA                    07/16",
        "Amount": "-40.65",
        "Type": "DEBIT_CARD",
        "Balance": "2298.09",
        "Check or Slip #": "",
        "TransactionId": "19a1f5afe1dd0e5ba0ef751440ec5ae3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/16/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         547179  07/16",
        "Amount": "-3.24",
        "Type": "DEBIT_CARD",
        "Balance": "2338.74",
        "Check or Slip #": "",
        "TransactionId": "7ed2671fcbaa1b9b83bf47d1b0647847"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/15/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   07/14",
        "Amount": "-12.1",
        "Type": "DEBIT_CARD",
        "Balance": "2341.98",
        "Check or Slip #": "",
        "TransactionId": "be626df7f1ad647f5fd4344dd6b7290f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/15/2019",
        "Description": "PANDA EXPRESS #864 LONG BEACH CA             07/14",
        "Amount": "-11.14",
        "Type": "DEBIT_CARD",
        "Balance": "2354.08",
        "Check or Slip #": "",
        "TransactionId": "394652f1a367592aacf7a3745f078620"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/15/2019",
        "Description": "Wal-Mart Super Center LAKEWOOD CA            07/13",
        "Amount": "-94.14",
        "Type": "DEBIT_CARD",
        "Balance": "2365.22",
        "Check or Slip #": "",
        "TransactionId": "611e099cce7a95949fb2705cb5fdc7a1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/15/2019",
        "Description": "FUDDRUCKERS 3078 LAKEWOOD CA                 07/13",
        "Amount": "-15.59",
        "Type": "DEBIT_CARD",
        "Balance": "2459.36",
        "Check or Slip #": "",
        "TransactionId": "9543863d8b3ccc61f16d3f7012ebaf90"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/15/2019",
        "Description": "JACK IN THE BOX 0191 HUNTINGTON BE CA        07/11",
        "Amount": "-5.8",
        "Type": "DEBIT_CARD",
        "Balance": "2474.95",
        "Check or Slip #": "",
        "TransactionId": "0c7a786b5cbbff3e6f2a60a924f2b675"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/15/2019",
        "Description": "WENDY'S 846 HUNTINGTON BE CA                 07/10",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "2480.75",
        "Check or Slip #": "",
        "TransactionId": "44825a7fbdc7f6142b9967f8ecc88997"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/12/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "71.28",
        "Type": "ACH_CREDIT",
        "Balance": "2485.06",
        "Check or Slip #": "",
        "TransactionId": "f2bda120b78340730e21c702f7546cde"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/12/2019",
        "Description": "HOUSEABLES INC   PAYROLL                    PPD ID: 9009499289",
        "Amount": "310.95",
        "Type": "ACH_CREDIT",
        "Balance": "2413.78",
        "Check or Slip #": "",
        "TransactionId": "b6e95e93908cee3b1b5bcaac292b573c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/11/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         501399  07/11",
        "Amount": "-5.22",
        "Type": "DEBIT_CARD",
        "Balance": "2102.83",
        "Check or Slip #": "",
        "TransactionId": "722697158ea92c83f266ebf7dd9126b1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/10/2019",
        "Description": "RUBIO'S #033 LONG BEACH CA                   07/09",
        "Amount": "-10.34",
        "Type": "DEBIT_CARD",
        "Balance": "2108.05",
        "Check or Slip #": "",
        "TransactionId": "bdf7d58465af8ff42a6c7616991f9479"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2019",
        "Description": "VONS STORE        2861 LONG BEACH CA 781029  07/07",
        "Amount": "-2.99",
        "Type": "DEBIT_CARD",
        "Balance": "2118.39",
        "Check or Slip #": "",
        "TransactionId": "80abd511e2fed2344e0f361300bf1b31"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2019",
        "Description": "BURGER KING #9227 LONG BEACH CA              07/07",
        "Amount": "-4.4",
        "Type": "DEBIT_CARD",
        "Balance": "2121.38",
        "Check or Slip #": "",
        "TransactionId": "6e005c5b9ac94ddcd416a4cc6333a207"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2019",
        "Description": "ARCO #42155 LONG BEACH CA                    07/07",
        "Amount": "-39.13",
        "Type": "DEBIT_CARD",
        "Balance": "2125.78",
        "Check or Slip #": "",
        "TransactionId": "7c3ecc67c708b41fa5445828c8a4c932"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   07/07",
        "Amount": "-6.72",
        "Type": "DEBIT_CARD",
        "Balance": "2164.91",
        "Check or Slip #": "",
        "TransactionId": "5170bf824153ca249d44b46ee8a6a8e7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2019",
        "Description": "TACO BELL #003135 LONG BEACH CA              07/07",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "2171.63",
        "Check or Slip #": "",
        "TransactionId": "074a7e214354772d3ad0f57f994f0c47"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              07/07",
        "Amount": "-31",
        "Type": "DEBIT_CARD",
        "Balance": "2177.14",
        "Check or Slip #": "",
        "TransactionId": "7c2a97a853ebeffc19fc67d14fa629c8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2019",
        "Description": "SQC*CASH APP GEORGE 8774174551 CA            07/06",
        "Amount": "-767.5",
        "Type": "DEBIT_CARD",
        "Balance": "2208.14",
        "Check or Slip #": "",
        "TransactionId": "b309163b80850025abb186e8fb899fe9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   07/06",
        "Amount": "-5.35",
        "Type": "DEBIT_CARD",
        "Balance": "2975.64",
        "Check or Slip #": "",
        "TransactionId": "ffdfb5104fc65711dc6ce33e1f27cd5f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/08/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   07/05",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "2980.99",
        "Check or Slip #": "",
        "TransactionId": "9b48674f5d9e7b8db2f4650176530c38"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/05/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         658873  07/04",
        "Amount": "-4.58",
        "Type": "DEBIT_CARD",
        "Balance": "2982.99",
        "Check or Slip #": "",
        "TransactionId": "af8f413cb9a60a735a5f7da09a6a881f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/05/2019",
        "Description": "PAYPAL *NETFLIX.COM 402-935-7733 CA          07/04",
        "Amount": "-2.77",
        "Type": "DEBIT_CARD",
        "Balance": "2987.57",
        "Check or Slip #": "",
        "TransactionId": "a0bae6a6b020217e81abc79268fa76cd"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/05/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "306.94",
        "Type": "ACH_CREDIT",
        "Balance": "2990.34",
        "Check or Slip #": "",
        "TransactionId": "4c4fb724fa5dae6e1c7d344640f535b3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/03/2019",
        "Description": "DEL TACO 0086 LONG BEACH CA                  07/02",
        "Amount": "-6.05",
        "Type": "DEBIT_CARD",
        "Balance": "2683.4",
        "Check or Slip #": "",
        "TransactionId": "e344c19af0790d7291c3693b390f5c6e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/03/2019",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              06/30",
        "Amount": "-9.14",
        "Type": "DEBIT_CARD",
        "Balance": "2689.45",
        "Check or Slip #": "",
        "TransactionId": "66fc449c544b06de4a9cde8baeab4b5f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/02/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-105.74",
        "Type": "ACH_DEBIT",
        "Balance": "2698.59",
        "Check or Slip #": "",
        "TransactionId": "1b77691932630af6790c1be9340598b3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/01/2019",
        "Description": "THE MARKET (VONS) 2280 LONG BEACH CA 186867  06/30",
        "Amount": "-9.28",
        "Type": "DEBIT_CARD",
        "Balance": "2804.33",
        "Check or Slip #": "",
        "TransactionId": "9bbfc00a14c0112a79657446084107f8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/01/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              06/30",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "2813.61",
        "Check or Slip #": "",
        "TransactionId": "1ec31954bbdd6fd251c044c82c94bd1e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/01/2019",
        "Description": "VONS     Store  3076 LONG BEACH CA   661181  06/29",
        "Amount": "-0.74",
        "Type": "DEBIT_CARD",
        "Balance": "2850.61",
        "Check or Slip #": "",
        "TransactionId": "e1cd17a28e770b17d717c62003c5d24f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/28/2019",
        "Description": "COSTCO WHSE #0424 SIGNAL HILL CA     578633  06/28",
        "Amount": "-3.82",
        "Type": "DEBIT_CARD",
        "Balance": "2851.35",
        "Check or Slip #": "",
        "TransactionId": "0479f14f1badc88f219347a2322473d7"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/28/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "374.36",
        "Type": "ACH_CREDIT",
        "Balance": "2855.17",
        "Check or Slip #": "",
        "TransactionId": "984126a78e070d9f72d2937258552a4d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/25/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   06/24",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "2480.81",
        "Check or Slip #": "",
        "TransactionId": "7cef34644a9845efd8b0c801151b13d1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/24/2019",
        "Description": "ALDI 79047 LONG BEACH CA                     06/23",
        "Amount": "-31.9",
        "Type": "DEBIT_CARD",
        "Balance": "2481.81",
        "Check or Slip #": "",
        "TransactionId": "42de8bc35a304af76abde9caa779999a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/24/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              06/23",
        "Amount": "-39",
        "Type": "DEBIT_CARD",
        "Balance": "2513.71",
        "Check or Slip #": "",
        "TransactionId": "53063294bf73a2fdf5fd27872e73411c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/24/2019",
        "Description": "TARGET T- 950 E 33rd S Signal Hill CA        06/22",
        "Amount": "-30.16",
        "Type": "DEBIT_CARD",
        "Balance": "2552.71",
        "Check or Slip #": "",
        "TransactionId": "b2868b6ac6ae5f29eb12409f85d81c67"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/24/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         691796  06/22",
        "Amount": "-4.4",
        "Type": "DEBIT_CARD",
        "Balance": "2582.87",
        "Check or Slip #": "",
        "TransactionId": "1ee34853ec61cd5bf26062474da3bde8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/24/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   06/21",
        "Amount": "-4.2",
        "Type": "DEBIT_CARD",
        "Balance": "2587.27",
        "Check or Slip #": "",
        "TransactionId": "2218ad9dac463d3fd73fe74c028f4d55"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/24/2019",
        "Description": "MCDONALD'S F23514 SIGNAL HILL CA             06/21",
        "Amount": "-7.1",
        "Type": "DEBIT_CARD",
        "Balance": "2591.47",
        "Check or Slip #": "",
        "TransactionId": "b84c60b0ce90b76bdf460c040ddd95b5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/21/2019",
        "Description": "ARCO #42179 AMPM HUNTINGTON BE CA            06/21",
        "Amount": "-30.35",
        "Type": "DEBIT_CARD",
        "Balance": "2598.57",
        "Check or Slip #": "",
        "TransactionId": "84f1d61f65fccab1fbab74ff8502fc7c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/21/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   06/20",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "2628.92",
        "Check or Slip #": "",
        "TransactionId": "46665f032f492e2a7847610e7123a3a2"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/21/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "385.86",
        "Type": "ACH_CREDIT",
        "Balance": "2629.92",
        "Check or Slip #": "",
        "TransactionId": "39d03ed598f2b48a41ab51c71448afda"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/20/2019",
        "Description": "IHOP 761 BELL GARDENS CA                     06/18",
        "Amount": "-27.34",
        "Type": "DEBIT_CARD",
        "Balance": "2244.06",
        "Check or Slip #": "",
        "TransactionId": "b6a2b88c9ff56ce857f755f9c221817a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/18/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    06/17",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "2271.4",
        "Check or Slip #": "",
        "TransactionId": "cdeab440ab35c721cec61bc255ba07ec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/17/2019",
        "Description": "WM SUPERC Wal-Mart Sup LONG BEACH CA         06/17",
        "Amount": "-38.24",
        "Type": "DEBIT_CARD",
        "Balance": "2275.78",
        "Check or Slip #": "",
        "TransactionId": "b828361546dcfe80fba236a014bb7939"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/17/2019",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA 502835  06/16",
        "Amount": "-10.79",
        "Type": "DEBIT_CARD",
        "Balance": "2314.02",
        "Check or Slip #": "",
        "TransactionId": "7fd843fc63372e42a574c43eeb974cd1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/17/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   06/16",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "2324.81",
        "Check or Slip #": "",
        "TransactionId": "bf37437028cbc4dea8bd9272ca40535d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/17/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              06/16",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "2329.81",
        "Check or Slip #": "",
        "TransactionId": "65c39307e6ef08463e889a830faa6caf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/17/2019",
        "Description": "CHIPOTLE 0825 LONG BEACH CA                  06/15",
        "Amount": "-10.25",
        "Type": "DEBIT_CARD",
        "Balance": "2366.81",
        "Check or Slip #": "",
        "TransactionId": "78813414d670e45fbaaf2a3a54b89f5b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/17/2019",
        "Description": "MCDONALD'S F1482 CARSON CA                   06/14",
        "Amount": "-5.79",
        "Type": "DEBIT_CARD",
        "Balance": "2377.06",
        "Check or Slip #": "",
        "TransactionId": "0467cdc7775b9809fb050a97383292f4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/14/2019",
        "Description": "COSTCO WHSE #0424 SIGNAL HILL CA     588341  06/14",
        "Amount": "-1.64",
        "Type": "DEBIT_CARD",
        "Balance": "2382.85",
        "Check or Slip #": "",
        "TransactionId": "da2d078109138f78085b19bb3626ca41"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/14/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "367.54",
        "Type": "ACH_CREDIT",
        "Balance": "2384.49",
        "Check or Slip #": "",
        "TransactionId": "803dbd3ea7aa135c7d70fd47a16bc935"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/13/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         875538  06/13",
        "Amount": "-3.79",
        "Type": "DEBIT_CARD",
        "Balance": "2016.95",
        "Check or Slip #": "",
        "TransactionId": "4c7b8c8679b4c9e8cecae9b30dfcc750"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/13/2019",
        "Description": "ARCO #42155 LONG BEACH CA                    06/13",
        "Amount": "-1.35",
        "Type": "DEBIT_CARD",
        "Balance": "2020.74",
        "Check or Slip #": "",
        "TransactionId": "a46cc0c5e1661c2a63f65c9041e0a0d0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/13/2019",
        "Description": "ARCO #42155 LONG BEACH CA                    06/13",
        "Amount": "-29.97",
        "Type": "DEBIT_CARD",
        "Balance": "2022.09",
        "Check or Slip #": "",
        "TransactionId": "97a4ff09081b03fdf940dec593c238fd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/13/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   06/12",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "2052.06",
        "Check or Slip #": "",
        "TransactionId": "de73158672c8f2204161aec2cc622a07"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/12/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   06/11",
        "Amount": "-4.5",
        "Type": "DEBIT_CARD",
        "Balance": "2053.06",
        "Check or Slip #": "",
        "TransactionId": "41d8441d16f37fe897f4a3e2a6128796"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/12/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   06/11",
        "Amount": "-4.6",
        "Type": "DEBIT_CARD",
        "Balance": "2057.56",
        "Check or Slip #": "",
        "TransactionId": "de1c52175f3e9c9650ea5fb5b1b9745c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/10/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         891329  06/09",
        "Amount": "-17.45",
        "Type": "DEBIT_CARD",
        "Balance": "2062.16",
        "Check or Slip #": "",
        "TransactionId": "377c6add16e7224a17313def95ad5870"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/10/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              06/09",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "2079.61",
        "Check or Slip #": "",
        "TransactionId": "6ffd29e2ac5c258380d81cfdceae4d2d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/10/2019",
        "Description": "DAIRY QUEEN #10319 CERRITOS CA               06/09",
        "Amount": "-10.05",
        "Type": "DEBIT_CARD",
        "Balance": "2109.61",
        "Check or Slip #": "",
        "TransactionId": "298c012791f99076172cdd1e72c1eb7c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/10/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   06/08",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "2119.66",
        "Check or Slip #": "",
        "TransactionId": "51d3f50687cadf30c67235d712dc77cc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/10/2019",
        "Description": "BURGER KING #4413 LONG BEACH CA              06/06",
        "Amount": "-4.41",
        "Type": "DEBIT_CARD",
        "Balance": "2121.66",
        "Check or Slip #": "",
        "TransactionId": "4391d01963470df928f5dbee6cbbe3c2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/07/2019",
        "Description": "SQC*CASH APP GEORGE 8774174551 CA            06/06",
        "Amount": "-15",
        "Type": "DEBIT_CARD",
        "Balance": "2126.07",
        "Check or Slip #": "",
        "TransactionId": "fcf3dc15debecd7983cae5c6662a8167"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/07/2019",
        "Description": "SQC*CASH APP GEORGE 8774174551 CA            06/06",
        "Amount": "-767.5",
        "Type": "DEBIT_CARD",
        "Balance": "2141.07",
        "Check or Slip #": "",
        "TransactionId": "2a850143ba4139908e8c227792dc3fbd"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/07/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "294.37",
        "Type": "ACH_CREDIT",
        "Balance": "2908.57",
        "Check or Slip #": "",
        "TransactionId": "d6a7e228f0d3e428543d6dd45c583733"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/06/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         581916  06/06",
        "Amount": "-9.43",
        "Type": "DEBIT_CARD",
        "Balance": "2614.2",
        "Check or Slip #": "",
        "TransactionId": "0c1c4bc90727fd3d2d3a66792b988baa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/06/2019",
        "Description": "DEL TACO 0888 CARSON CA                      06/05",
        "Amount": "-4.26",
        "Type": "DEBIT_CARD",
        "Balance": "2623.63",
        "Check or Slip #": "",
        "TransactionId": "3da230a52718ad8382c71648c70ec1d1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/06/2019",
        "Description": "WENDY'S CYPRESS CA                           06/05",
        "Amount": "-4.31",
        "Type": "DEBIT_CARD",
        "Balance": "2627.89",
        "Check or Slip #": "",
        "TransactionId": "9605c722df8dccc808567050d14c53b1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/05/2019",
        "Description": "ARCO #42741 AMPM CYPRESS CA                  06/05",
        "Amount": "-35.36",
        "Type": "DEBIT_CARD",
        "Balance": "2632.2",
        "Check or Slip #": "",
        "TransactionId": "ca4ded3e42132dfacbf5de452c8449a2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/04/2019",
        "Description": "DOG HAUS LONG BEACH LONG BEACH CA            06/02",
        "Amount": "-12.11",
        "Type": "DEBIT_CARD",
        "Balance": "2667.56",
        "Check or Slip #": "",
        "TransactionId": "e9dcbe6cc8c9645208ae62e0ab983db5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/03/2019",
        "Description": "WINCO FOODS #107 3400 LAKEWOOD CA    746117  06/03",
        "Amount": "-21.18",
        "Type": "DEBIT_CARD",
        "Balance": "2679.67",
        "Check or Slip #": "",
        "TransactionId": "c4de7371d6da884b088c164ee972f326"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/03/2019",
        "Description": "RITE AID STORE - 5518 LONG BEACH CA  526533  06/02",
        "Amount": "-4.99",
        "Type": "DEBIT_CARD",
        "Balance": "2700.85",
        "Check or Slip #": "",
        "TransactionId": "ffc94a0c961966467c4f003564f7442a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/03/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              06/02",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "2705.84",
        "Check or Slip #": "",
        "TransactionId": "6a75524cf12e716f7c3cbd9477559e8e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/31/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   05/29",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "2741.84",
        "Check or Slip #": "",
        "TransactionId": "26fe82eb5307176ee87adce1dcb7cff5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/31/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   05/29",
        "Amount": "-4.4",
        "Type": "DEBIT_CARD",
        "Balance": "2742.84",
        "Check or Slip #": "",
        "TransactionId": "f9ec17c8f65d2882749358ff0f5c0e7c"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/31/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "357.4",
        "Type": "ACH_CREDIT",
        "Balance": "2747.24",
        "Check or Slip #": "",
        "TransactionId": "146b1f84ee7f797ee57635a7e5bda79c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/30/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-106.82",
        "Type": "ACH_DEBIT",
        "Balance": "2389.84",
        "Check or Slip #": "",
        "TransactionId": "fd16a82b325be6e7055621b7e2510c28"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/30/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         675643  05/30",
        "Amount": "-10.74",
        "Type": "DEBIT_CARD",
        "Balance": "2496.66",
        "Check or Slip #": "",
        "TransactionId": "b552dfde7ff45a25b2c0d75151d1621e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/30/2019",
        "Description": "COSTCO WHSE #0424 SIGNAL HILL CA     225858  05/30",
        "Amount": "-1.64",
        "Type": "DEBIT_CARD",
        "Balance": "2507.4",
        "Check or Slip #": "",
        "TransactionId": "3f57eb13e38070548bec056dbb6b040a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2019",
        "Description": "ARCO #42155 LONG BEACH CA                    05/28",
        "Amount": "-26.39",
        "Type": "DEBIT_CARD",
        "Balance": "2509.04",
        "Check or Slip #": "",
        "TransactionId": "12da376836175a48b4792178df1078b8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2019",
        "Description": "WAL-MART #4101 LONG BEACH CA                 05/28",
        "Amount": "-9.5",
        "Type": "DEBIT_CARD",
        "Balance": "2535.43",
        "Check or Slip #": "",
        "TransactionId": "bc03f1199f27e85df659ff98cf4fa6e8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2019",
        "Description": "DOLLARTRE 500 LAKEWOOD LAKEWOOD CA           05/28",
        "Amount": "-5.58",
        "Type": "DEBIT_CARD",
        "Balance": "2544.93",
        "Check or Slip #": "",
        "TransactionId": "0d4b43ddc9851dc787e3d1497040eb3e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2019",
        "Description": "COSTCO WHSE #1050 LAKEWOOD CA        049798  05/28",
        "Amount": "-3.82",
        "Type": "DEBIT_CARD",
        "Balance": "2550.51",
        "Check or Slip #": "",
        "TransactionId": "d089b5b3457a7e12c15afdbcd3049e9b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2019",
        "Description": "Wal-Mart Super Center LONG BEACH CA          05/27",
        "Amount": "-20.34",
        "Type": "DEBIT_CARD",
        "Balance": "2554.33",
        "Check or Slip #": "",
        "TransactionId": "9f2013ff4f2517a9ebede67767fdc96b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2019",
        "Description": "ARBYS 5853 LAKEWOOD CA                       05/27",
        "Amount": "-4.92",
        "Type": "DEBIT_CARD",
        "Balance": "2574.67",
        "Check or Slip #": "",
        "TransactionId": "041ba4ffdc0d9b8d5ae1f5afb279b444"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2019",
        "Description": "TACO BELL 2828 LONG BEACH CA                 05/26",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "2579.59",
        "Check or Slip #": "",
        "TransactionId": "edcaa587f40227b3b94a1fb16bd7a98c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              05/26",
        "Amount": "-22",
        "Type": "DEBIT_CARD",
        "Balance": "2585.1",
        "Check or Slip #": "",
        "TransactionId": "84d9eba51e1594f29f034d764e6e9b06"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2019",
        "Description": "WENDY'S 844 LONG BEACH CA                    05/25",
        "Amount": "-4.96",
        "Type": "DEBIT_CARD",
        "Balance": "2607.1",
        "Check or Slip #": "",
        "TransactionId": "dc1382b2d9cfee9ae8a3b729b5c907ae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2019",
        "Description": "MCDONALD'S F13583 TUSTIN CA                  05/25",
        "Amount": "-4.62",
        "Type": "DEBIT_CARD",
        "Balance": "2612.06",
        "Check or Slip #": "",
        "TransactionId": "6fba511ec4722d994d9c27593680e40a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/28/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   05/24",
        "Amount": "-7.5",
        "Type": "DEBIT_CARD",
        "Balance": "2616.68",
        "Check or Slip #": "",
        "TransactionId": "62f341e4996208616c5ec0dc94dcf150"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/24/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "213.38",
        "Type": "ACH_CREDIT",
        "Balance": "2624.18",
        "Check or Slip #": "",
        "TransactionId": "dc9151e4cf4ed25c4a7e3ec5739f6d11"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/22/2019",
        "Description": "ARCO #42155 LONG BEACH CA                    05/22",
        "Amount": "-31.35",
        "Type": "DEBIT_CARD",
        "Balance": "2410.8",
        "Check or Slip #": "",
        "TransactionId": "27e919db047392e61e6c9a949f4cf253"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/21/2019",
        "Description": "7-ELEVEN HARBOR CITY CA                      05/21",
        "Amount": "-3.88",
        "Type": "DEBIT_CARD",
        "Balance": "2442.15",
        "Check or Slip #": "",
        "TransactionId": "7152956b10abfa55e6c8f0d8104eaadb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/21/2019",
        "Description": "TARGET        00014092 LAKEWOOD CA           05/20",
        "Amount": "-25.73",
        "Type": "DEBIT_CARD",
        "Balance": "2446.03",
        "Check or Slip #": "",
        "TransactionId": "919b66a1836f8ae539a925ec175c251f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/20/2019",
        "Description": "BIG 5 SPORTING GOODS 0 LAKEWOOD CA           05/20",
        "Amount": "-32.84",
        "Type": "DEBIT_CARD",
        "Balance": "2471.76",
        "Check or Slip #": "",
        "TransactionId": "6925810e738f0c1e3333011a951db2ee"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/20/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              05/19",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "2504.6",
        "Check or Slip #": "",
        "TransactionId": "a5f9d34eb6fd55036b661b66564d6bfc"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/17/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "344.22",
        "Type": "ACH_CREDIT",
        "Balance": "2539.6",
        "Check or Slip #": "",
        "TransactionId": "1c0adf2fff8ee9c599f869e96f266ef1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/16/2019",
        "Description": "PANERA BREAD #601118 P LAKEWOOD CA           05/15",
        "Amount": "-5.14",
        "Type": "DEBIT_CARD",
        "Balance": "2195.38",
        "Check or Slip #": "",
        "TransactionId": "0870940d5ef476c1979be4207a697b07"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/15/2019",
        "Description": "WM SUPERC Wal-Mart Sup LONG BEACH CA         05/15",
        "Amount": "-37.89",
        "Type": "DEBIT_CARD",
        "Balance": "2200.52",
        "Check or Slip #": "",
        "TransactionId": "43fa7dd527fe2f32efb43d5d084953ab"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/15/2019",
        "Description": "SMF CAMDEN SACRAMENTO CA                     05/14",
        "Amount": "-10.24",
        "Type": "DEBIT_CARD",
        "Balance": "2238.41",
        "Check or Slip #": "",
        "TransactionId": "3734f3658f2c98d6d1c1e91c8b36307c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/15/2019",
        "Description": "OLIVE GARDEN  000124 CITRUS HEIGHT CA        05/14",
        "Amount": "-63",
        "Type": "DEBIT_CARD",
        "Balance": "2248.65",
        "Check or Slip #": "",
        "TransactionId": "dbd3b3036ab49559909adc1d4cc827f6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/14/2019",
        "Description": "SQC*CASH APP GEORGE 8774174551 CA            05/13",
        "Amount": "-767.5",
        "Type": "DEBIT_CARD",
        "Balance": "2311.65",
        "Check or Slip #": "",
        "TransactionId": "23858c0097596ede183470f2fa32edf2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/13/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              05/12",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "3079.15",
        "Check or Slip #": "",
        "TransactionId": "bc0f7e02c3cada8e4b3801306b637b8c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/13/2019",
        "Description": "PMT*SAC CO AIRPORT PARK SACRAMENTO CA        05/11",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "3115.15",
        "Check or Slip #": "",
        "TransactionId": "614bdf07d7960ec390a4e0e36eebfa06"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/13/2019",
        "Description": "LONG BEACH 0962PC1 LONG BEACH CA             05/11",
        "Amount": "-5.06",
        "Type": "DEBIT_CARD",
        "Balance": "3121.15",
        "Check or Slip #": "",
        "TransactionId": "78149671945afdd0c00002ea5a995672"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/13/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    05/10",
        "Amount": "-4.93",
        "Type": "DEBIT_CARD",
        "Balance": "3126.21",
        "Check or Slip #": "",
        "TransactionId": "cabd1e4bca1e20ad861963741807eac5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/10/2019",
        "Description": "WAL-MART #4101 LONG BEACH CA                 05/10",
        "Amount": "-23.7",
        "Type": "DEBIT_CARD",
        "Balance": "3131.14",
        "Check or Slip #": "",
        "TransactionId": "f3067db252f97f38e6ec560ed3650152"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/10/2019",
        "Description": "DEL TACO 0888 CARSON CA                      05/09",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "3154.84",
        "Check or Slip #": "",
        "TransactionId": "881812a6bf24fa3433a8583a3b181c05"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/10/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "362.18",
        "Type": "ACH_CREDIT",
        "Balance": "3159.22",
        "Check or Slip #": "",
        "TransactionId": "5bbedfab3065cdc69977b480b17d91a7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/09/2019",
        "Description": "7-ELEVEN LONG BEACH CA                       05/09",
        "Amount": "-3.42",
        "Type": "DEBIT_CARD",
        "Balance": "2797.04",
        "Check or Slip #": "",
        "TransactionId": "1f8418f1e22d1866da81f46d528cb282"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/09/2019",
        "Description": "ARCO #470191 LONG BEACH CA                   05/09",
        "Amount": "-35.35",
        "Type": "DEBIT_CARD",
        "Balance": "2800.46",
        "Check or Slip #": "",
        "TransactionId": "1f3788877544a823904754d78e0afade"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/09/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   05/08",
        "Amount": "-5.65",
        "Type": "DEBIT_CARD",
        "Balance": "2835.81",
        "Check or Slip #": "",
        "TransactionId": "ff9c859de9cd4b42148bcfc41031db1c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/09/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   05/08",
        "Amount": "-127",
        "Type": "DEBIT_CARD",
        "Balance": "2841.46",
        "Check or Slip #": "",
        "TransactionId": "4da2bdc7652ba8f5e01f8cdb42779a70"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/06/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         891661  05/05",
        "Amount": "-36.87",
        "Type": "DEBIT_CARD",
        "Balance": "2968.46",
        "Check or Slip #": "",
        "TransactionId": "ce4d1b18bf7d27162cfddf7d1df3fe81"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/06/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   05/05",
        "Amount": "-4.65",
        "Type": "DEBIT_CARD",
        "Balance": "3005.33",
        "Check or Slip #": "",
        "TransactionId": "102b9a76f05c5b17f29c3635c44df37b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/06/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              05/05",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "3009.98",
        "Check or Slip #": "",
        "TransactionId": "b9b626c235972d8eed679cd34c661f50"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/06/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   05/03",
        "Amount": "-7.89",
        "Type": "DEBIT_CARD",
        "Balance": "3046.98",
        "Check or Slip #": "",
        "TransactionId": "5e1105b28a66a977e8865fca5aa1dbd6"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/06/2019",
        "Description": "ATM CASH DEPOSIT 05/05 4501 E PACIFIC COAST HWY LONG BEACH CA",
        "Amount": "588",
        "Type": "ATM",
        "Balance": "3054.87",
        "Check or Slip #": "",
        "TransactionId": "23e890e5be4387701fb14c5fe90418a3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/03/2019",
        "Description": "TACO BELL 146 LONG BEACH CA                  05/02",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "2466.87",
        "Check or Slip #": "",
        "TransactionId": "5e9847cede453ec159c41138b826912b"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/03/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "368.61",
        "Type": "ACH_CREDIT",
        "Balance": "2472.38",
        "Check or Slip #": "",
        "TransactionId": "600ca396efcaa5c9f04ce42adf5f3591"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/02/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         501580  05/02",
        "Amount": "-4.84",
        "Type": "DEBIT_CARD",
        "Balance": "2103.77",
        "Check or Slip #": "",
        "TransactionId": "277abfc29569397d03d926cdf33c960e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/01/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    04/30",
        "Amount": "-5.46",
        "Type": "DEBIT_CARD",
        "Balance": "2108.61",
        "Check or Slip #": "",
        "TransactionId": "df691d4390f3827043ebc273264f9fe4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-106.83",
        "Type": "ACH_DEBIT",
        "Balance": "2114.07",
        "Check or Slip #": "",
        "TransactionId": "6625a0f25dcb8ba442372bd736556628"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2019",
        "Description": "AMZN Mktp US*MZ9MB86 Amzn.com/bill WA        04/30",
        "Amount": "-28.94",
        "Type": "DEBIT_CARD",
        "Balance": "2220.9",
        "Check or Slip #": "",
        "TransactionId": "7db43c87e6415e7f33e188e1d5de12c6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2019",
        "Description": "BURGER KING #2119 LONG BEACH CA              04/28",
        "Amount": "-4.4",
        "Type": "DEBIT_CARD",
        "Balance": "2249.84",
        "Check or Slip #": "",
        "TransactionId": "1eeb3df0d12d7111fa96f8a5f5b51bf2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/29/2019",
        "Description": "ARCO #42718 AMPM LONG BEACH CA               04/28",
        "Amount": "-44.73",
        "Type": "DEBIT_CARD",
        "Balance": "2254.24",
        "Check or Slip #": "",
        "TransactionId": "a2dffe6e09cd82a207d8c573cc4954fe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/29/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              04/28",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "2298.97",
        "Check or Slip #": "",
        "TransactionId": "765ef15a60e767e24d6d272a1c1a254d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/29/2019",
        "Description": "MICHAELS STORES 8667 LAKEWOOD CA     283058  04/27",
        "Amount": "-9.84",
        "Type": "DEBIT_CARD",
        "Balance": "2335.97",
        "Check or Slip #": "",
        "TransactionId": "091402ef4ba7a1d9fae74755a9b151a2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/29/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   04/27",
        "Amount": "-6.5",
        "Type": "DEBIT_CARD",
        "Balance": "2345.81",
        "Check or Slip #": "",
        "TransactionId": "c6cf2ab56fe82b1b388127a5b0497632"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/26/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         705178  04/26",
        "Amount": "-8.38",
        "Type": "DEBIT_CARD",
        "Balance": "2352.31",
        "Check or Slip #": "",
        "TransactionId": "8f0bbb0eb86f823a99d133bd0ad1441f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/26/2019",
        "Description": "JACK IN THE BOX 5369 310-522-0725 CA         04/25",
        "Amount": "-2.19",
        "Type": "DEBIT_CARD",
        "Balance": "2360.69",
        "Check or Slip #": "",
        "TransactionId": "fcf0096fa83abe801da15e2882980117"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/26/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "370.85",
        "Type": "ACH_CREDIT",
        "Balance": "2362.88",
        "Check or Slip #": "",
        "TransactionId": "ff098a35fb75a07f430b8a7eae0757f1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/25/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   04/24",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "1992.03",
        "Check or Slip #": "",
        "TransactionId": "3379fdb0f2699871009deea9b1e28304"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    04/22",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "1997.53",
        "Check or Slip #": "",
        "TransactionId": "cce29f1a86f8cf67733c4930ec65ae7a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/22/2019",
        "Description": "WM SUPERC Wal-Mart Sup LONG BEACH CA         04/22",
        "Amount": "-34.78",
        "Type": "DEBIT_CARD",
        "Balance": "2001.91",
        "Check or Slip #": "",
        "TransactionId": "24a14e066e9b3b7bd6f239d7331b8675"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/22/2019",
        "Description": "WM SUPERC Wal-Mart Sup LONG BEACH CA         04/22",
        "Amount": "-21.92",
        "Type": "DEBIT_CARD",
        "Balance": "2036.69",
        "Check or Slip #": "",
        "TransactionId": "ced1a3f05fd2f95fbf604dae4b3251e1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/22/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              04/21",
        "Amount": "-38",
        "Type": "DEBIT_CARD",
        "Balance": "2058.61",
        "Check or Slip #": "",
        "TransactionId": "20be76f96b25af857e04570da01bffa2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/22/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   04/20",
        "Amount": "-127",
        "Type": "DEBIT_CARD",
        "Balance": "2096.61",
        "Check or Slip #": "",
        "TransactionId": "835a30adc8aeb04478cf805ff518502f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/22/2019",
        "Description": "DEL TACO 0888 CARSON CA                      04/19",
        "Amount": "-5.48",
        "Type": "DEBIT_CARD",
        "Balance": "2223.61",
        "Check or Slip #": "",
        "TransactionId": "c7280fa65b8d65aa0bd22112ddbf09ab"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/22/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   04/19",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "2229.09",
        "Check or Slip #": "",
        "TransactionId": "a7aff79b99ebcd40784f087314d14704"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/19/2019",
        "Description": "7-ELEVEN LONG BEACH CA                       04/19",
        "Amount": "-3.25",
        "Type": "DEBIT_CARD",
        "Balance": "2233.09",
        "Check or Slip #": "",
        "TransactionId": "90e7f0d0ee08f337a8fe9752d73aacc1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/19/2019",
        "Description": "ARCO #42197 LONG BEACH CA                    04/19",
        "Amount": "-30.54",
        "Type": "DEBIT_CARD",
        "Balance": "2236.34",
        "Check or Slip #": "",
        "TransactionId": "f8e8ea42ca09f82d358856bea5dd721c"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/19/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "375.69",
        "Type": "ACH_CREDIT",
        "Balance": "2266.88",
        "Check or Slip #": "",
        "TransactionId": "52b06336d88bbc4e44a275d70325cfe1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/18/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   04/17",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "1891.19",
        "Check or Slip #": "",
        "TransactionId": "749e02010b8a8c1c6cc018d0f2703ede"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/17/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   04/16",
        "Amount": "-4.95",
        "Type": "DEBIT_CARD",
        "Balance": "1897.19",
        "Check or Slip #": "",
        "TransactionId": "32ba10516776d165610eadb80c6765a8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/16/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         890840  04/16",
        "Amount": "-4.04",
        "Type": "DEBIT_CARD",
        "Balance": "1902.14",
        "Check or Slip #": "",
        "TransactionId": "6b5012c68a2beac5245a6d0331c4fe6e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/16/2019",
        "Description": "SQC*CASH APP GEORGE 8774174551 CA            04/15",
        "Amount": "-802",
        "Type": "DEBIT_CARD",
        "Balance": "1906.18",
        "Check or Slip #": "",
        "TransactionId": "6c7f524966a7f84f8d8039e5d8b39d61"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/15/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   04/14",
        "Amount": "-11.91",
        "Type": "DEBIT_CARD",
        "Balance": "2708.18",
        "Check or Slip #": "",
        "TransactionId": "492ee4e1245dc00ce61ecdfb42a759a6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/15/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              04/14",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "2720.09",
        "Check or Slip #": "",
        "TransactionId": "f7a6eda44a7043302ea476dc37d14a82"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/15/2019",
        "Description": "WAL-MART #2609 LAKEWOOD CA                   04/13",
        "Amount": "-13.01",
        "Type": "DEBIT_CARD",
        "Balance": "2757.09",
        "Check or Slip #": "",
        "TransactionId": "b31cf637a545297fe84be579cd402301"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/15/2019",
        "Description": "RALPHS 0004 LAGUNA BEACH CA          752432  04/13",
        "Amount": "-1.66",
        "Type": "DEBIT_CARD",
        "Balance": "2770.1",
        "Check or Slip #": "",
        "TransactionId": "ae88593cb22b871fb78f2966fd6e9c9a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/15/2019",
        "Description": "OC PARKS-PARKING IRVINE CA                   04/13",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "2771.76",
        "Check or Slip #": "",
        "TransactionId": "159b1e9eb89e73c7f80ad00df3dc0494"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/15/2019",
        "Description": "7-ELEVEN LONG BEACH CA                       04/13",
        "Amount": "-3.04",
        "Type": "DEBIT_CARD",
        "Balance": "2774.76",
        "Check or Slip #": "",
        "TransactionId": "874234a0994c2f82f35412af63b1b9a7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/15/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   04/13",
        "Amount": "-3.3",
        "Type": "DEBIT_CARD",
        "Balance": "2777.8",
        "Check or Slip #": "",
        "TransactionId": "5bfd68c31d0fb824f9082dea6af79ef0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/15/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    04/12",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "2781.1",
        "Check or Slip #": "",
        "TransactionId": "b9d1048fb74122f8b0e0300e9c8ac20b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/15/2019",
        "Description": "JACK IN THE BOX 5369 310-522-0725 CA         04/12",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "2785.48",
        "Check or Slip #": "",
        "TransactionId": "2d94b3ccc2d09eecf0f9e7bf9e13796d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/12/2019",
        "Description": "WM SUPERC Wal-Mart Sup LONG BEACH CA         04/12",
        "Amount": "-24.24",
        "Type": "DEBIT_CARD",
        "Balance": "2789.86",
        "Check or Slip #": "",
        "TransactionId": "c5e7ddeee35986dedd7ecab308221ab0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/12/2019",
        "Description": "ARCO #42197 LONG BEACH CA                    04/12",
        "Amount": "-35.35",
        "Type": "DEBIT_CARD",
        "Balance": "2814.1",
        "Check or Slip #": "",
        "TransactionId": "3ffe66177d590dc4103acf4674857508"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/12/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "373.57",
        "Type": "ACH_CREDIT",
        "Balance": "2849.45",
        "Check or Slip #": "",
        "TransactionId": "f18c2b31dbc4e47baf36ad80770dd19d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/11/2019",
        "Description": "7-ELEVEN LONG BEACH CA                       04/11",
        "Amount": "-1.59",
        "Type": "DEBIT_CARD",
        "Balance": "2475.88",
        "Check or Slip #": "",
        "TransactionId": "acfa600076692a972c0a56486694ba0c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/10/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         976279  04/10",
        "Amount": "-20.99",
        "Type": "DEBIT_CARD",
        "Balance": "2477.47",
        "Check or Slip #": "",
        "TransactionId": "53442caa1558086467361051fb5a9b28"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/09/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    04/08",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "2498.46",
        "Check or Slip #": "",
        "TransactionId": "02b7f109e1b22faa7d8a6b9e83e9dcae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/09/2019",
        "Description": "CREAMISTRY BELMONT SHOR LONG BEACH CA        04/08",
        "Amount": "-12.65",
        "Type": "DEBIT_CARD",
        "Balance": "2502.84",
        "Check or Slip #": "",
        "TransactionId": "af994bdb27ef205975e8ef701813cde9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/08/2019",
        "Description": "WM SUPERC Wal-Mart Sup LONG BEACH CA         04/08",
        "Amount": "-27.73",
        "Type": "DEBIT_CARD",
        "Balance": "2515.49",
        "Check or Slip #": "",
        "TransactionId": "cf5b80a9bde69fa24b12207f96b81b62"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/08/2019",
        "Description": "SQC*JON PRITCHARD 8774174551 CA              04/07",
        "Amount": "-9.25",
        "Type": "DEBIT_CARD",
        "Balance": "2543.22",
        "Check or Slip #": "",
        "TransactionId": "6f3b000689032c3302efeb304e35ce5c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/08/2019",
        "Description": "KFC D016016 LONG BEACH CA                    04/07",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "2552.47",
        "Check or Slip #": "",
        "TransactionId": "7ce32f974eb4ab33e059d323682c9334"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/08/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              04/07",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "2557.98",
        "Check or Slip #": "",
        "TransactionId": "d87441f4b5aea813a703c197a839d4b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/08/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    04/06",
        "Amount": "-9.38",
        "Type": "DEBIT_CARD",
        "Balance": "2593.98",
        "Check or Slip #": "",
        "TransactionId": "fb0d94c951054170cb6ed7fafdda1f85"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/08/2019",
        "Description": "CHICK-FIL-A #03388 LONG BEACH CA             04/04",
        "Amount": "-19.51",
        "Type": "DEBIT_CARD",
        "Balance": "2603.36",
        "Check or Slip #": "",
        "TransactionId": "ffef196d0a1474cdac14fbc06eec2554"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/05/2019",
        "Description": "COSTCO WHSE #0424 SIGNAL HILL CA     287757  04/05",
        "Amount": "-3.82",
        "Type": "DEBIT_CARD",
        "Balance": "2622.87",
        "Check or Slip #": "",
        "TransactionId": "2f02c206ffa318888d5806bfb1adbe12"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/05/2019",
        "Description": "DUNKIN #352440 Q35 LONG BEACH CA             04/04",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "2626.69",
        "Check or Slip #": "",
        "TransactionId": "1d8bf23cea8f0b168e2b134cdaad74b1"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/05/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "361.49",
        "Type": "ACH_CREDIT",
        "Balance": "2628.69",
        "Check or Slip #": "",
        "TransactionId": "b9566cf166b675b5cd20f81f25035fe7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/04/2019",
        "Description": "ARCO #42718 AMPM LONG BEACH CA               04/04",
        "Amount": "-30.36",
        "Type": "DEBIT_CARD",
        "Balance": "2267.2",
        "Check or Slip #": "",
        "TransactionId": "cb5c8683254def1172cc94ff0a537a9a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/04/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         04/02",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "2297.56",
        "Check or Slip #": "",
        "TransactionId": "6038d6389ea372dfc69c5df84c52ce8b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/03/2019",
        "Description": "JACK IN THE BOX 5409 SIGNAL HILLS CA         04/01",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "2298.51",
        "Check or Slip #": "",
        "TransactionId": "2ec622f30cab2d816bd546240c8ad7ad"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/02/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   04/01",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "2302.89",
        "Check or Slip #": "",
        "TransactionId": "17b5fc7a4a9a56ee8d273e7f7568b0c2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/02/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   03/31",
        "Amount": "-4.5",
        "Type": "DEBIT_CARD",
        "Balance": "2305.89",
        "Check or Slip #": "",
        "TransactionId": "bed350afecd4cff097e7c303c71dbf7f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-106.83",
        "Type": "ACH_DEBIT",
        "Balance": "2310.39",
        "Check or Slip #": "",
        "TransactionId": "b11a659247bf021d10b72a9911254483"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2019",
        "Description": "ALDI 79047 LONG BEACH CA                     04/01",
        "Amount": "-18.42",
        "Type": "DEBIT_CARD",
        "Balance": "2417.22",
        "Check or Slip #": "",
        "TransactionId": "860ec0b967fe16657c5ab71e6d134a08"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2019",
        "Description": "DOLLAR TR 3075 CALIFOR SIGNAL HILL CA        04/01",
        "Amount": "-3.29",
        "Type": "DEBIT_CARD",
        "Balance": "2435.64",
        "Check or Slip #": "",
        "TransactionId": "6311d2d84b008f587f4d09d125876b81"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2019",
        "Description": "WIENERSCHNITZEL 150 LONG BEACH CA            03/31",
        "Amount": "-3.3",
        "Type": "DEBIT_CARD",
        "Balance": "2438.93",
        "Check or Slip #": "",
        "TransactionId": "0149e1f77e59fa81e2ade8e9cc677f70"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              03/31",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "2442.23",
        "Check or Slip #": "",
        "TransactionId": "dd5dd306cd4262fa1be8376fd612ee79"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   03/30",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "2479.23",
        "Check or Slip #": "",
        "TransactionId": "aeae5771b134a63324bf351242e8a046"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   03/30",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "2480.23",
        "Check or Slip #": "",
        "TransactionId": "8bb4d6b0c5fb606aa4a017693351c682"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2019",
        "Description": "CHEVRON/APRO, LLC CARSON CA          071631  03/29",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "2487.23",
        "Check or Slip #": "",
        "TransactionId": "97c765eeaa183f1f710c2524212bd6b1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2019",
        "Description": "JACK IN THE BOX 5369 310-522-0725 CA         03/30",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "2507.23",
        "Check or Slip #": "",
        "TransactionId": "b7bca53698b323b03dac44d735b9042c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         03/29",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2511.61",
        "Check or Slip #": "",
        "TransactionId": "50546a02c1d9cc9be88ceacb38fc97de"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/01/2019",
        "Description": "MCDONALD'S F6470 LONG BEACH CA               03/28",
        "Amount": "-4.67",
        "Type": "DEBIT_CARD",
        "Balance": "2512.71",
        "Check or Slip #": "",
        "TransactionId": "c6d1c026e3c88768f483b83926d7ea45"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/29/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "370.26",
        "Type": "ACH_CREDIT",
        "Balance": "2517.38",
        "Check or Slip #": "",
        "TransactionId": "be385f090719a8625b3b20f812e01fb4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2019",
        "Description": "JACK IN THE BOX 0216 562-439-8958 CA         03/25",
        "Amount": "-5.61",
        "Type": "DEBIT_CARD",
        "Balance": "2147.12",
        "Check or Slip #": "",
        "TransactionId": "7cbd703d8b39e6055949f3a80ddad3f4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2019",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              03/23",
        "Amount": "-9.14",
        "Type": "DEBIT_CARD",
        "Balance": "2152.73",
        "Check or Slip #": "",
        "TransactionId": "89395e5cdb490c4315fdf3a3ff13cd06"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/25/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              03/24",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "2161.87",
        "Check or Slip #": "",
        "TransactionId": "b1b010860ac92f9ac816680232708b2c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/25/2019",
        "Description": "STARBUCKS STORE 09382 LONG BEACH CA          03/23",
        "Amount": "-4.2",
        "Type": "DEBIT_CARD",
        "Balance": "2197.87",
        "Check or Slip #": "",
        "TransactionId": "5e8a84961f2fa8cedd6c6f22d4094295"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/25/2019",
        "Description": "WM SUPERC Wal-Mart Sup LONG BEACH CA         03/23",
        "Amount": "-33.22",
        "Type": "DEBIT_CARD",
        "Balance": "2202.07",
        "Check or Slip #": "",
        "TransactionId": "d0a638fb55bc76c2071277f928890af3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/25/2019",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              03/22",
        "Amount": "-87.3",
        "Type": "DEBIT_CARD",
        "Balance": "2235.29",
        "Check or Slip #": "",
        "TransactionId": "3ef001c14aa7344c841dec4feaec2bcf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/22/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         03/20",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2322.59",
        "Check or Slip #": "",
        "TransactionId": "65d8db8fe2541e6a894c3b7dc2512e62"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/22/2019",
        "Description": "MCDONALD'S F6470 LONG BEACH CA               03/20",
        "Amount": "-3.85",
        "Type": "DEBIT_CARD",
        "Balance": "2323.69",
        "Check or Slip #": "",
        "TransactionId": "c81210bef914c355a7ed92d030cd1197"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/22/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "357.65",
        "Type": "ACH_CREDIT",
        "Balance": "2327.54",
        "Check or Slip #": "",
        "TransactionId": "8bfd49cd6ddf00ec16387ef8884d1c69"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/21/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         902965  03/21",
        "Amount": "-14.4",
        "Type": "DEBIT_CARD",
        "Balance": "1969.89",
        "Check or Slip #": "",
        "TransactionId": "65e058f808f35b17cb13a0045094e5ec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/19/2019",
        "Description": "PEPBOYS STORE # 803 46 LONG BEACH CA         03/19",
        "Amount": "-227.99",
        "Type": "DEBIT_CARD",
        "Balance": "1984.29",
        "Check or Slip #": "",
        "TransactionId": "cd6f90cdcb8357d27d7f79b7a713f508"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/19/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   03/18",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "2212.28",
        "Check or Slip #": "",
        "TransactionId": "70aaa6082bbd00c03b1a9621e30bbc4c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/19/2019",
        "Description": "PIKE LONG BEACH CA                           03/17",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "2217.28",
        "Check or Slip #": "",
        "TransactionId": "228d766f67e84e56e60a3b05dde65192"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/19/2019",
        "Description": "ABM PARKING LONG BEACH LONG BEACH CA         03/16",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "2223.28",
        "Check or Slip #": "",
        "TransactionId": "5176748f886862c634f538bd541a79e0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/18/2019",
        "Description": "THE MARKET (VONS) 2280 LONG BEACH CA 306119  03/17",
        "Amount": "-3.78",
        "Type": "DEBIT_CARD",
        "Balance": "2225.28",
        "Check or Slip #": "",
        "TransactionId": "d49280d4fc90755394cdd947c9b6137d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/18/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              03/17",
        "Amount": "-38",
        "Type": "DEBIT_CARD",
        "Balance": "2229.06",
        "Check or Slip #": "",
        "TransactionId": "5f5e33b5aa611e62e80f9d21765dfeb4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/18/2019",
        "Description": "MCDONALD'S F15556 LONG BEACH CA              03/15",
        "Amount": "-5.59",
        "Type": "DEBIT_CARD",
        "Balance": "2267.06",
        "Check or Slip #": "",
        "TransactionId": "97e509cc8854154759d4b7c62b5d6f4c"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/15/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "373.24",
        "Type": "ACH_CREDIT",
        "Balance": "2272.65",
        "Check or Slip #": "",
        "TransactionId": "f35bac43f69bec50e2e0b77d2fbf79a3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/14/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         814704  03/14",
        "Amount": "-15.48",
        "Type": "DEBIT_CARD",
        "Balance": "1899.41",
        "Check or Slip #": "",
        "TransactionId": "0f85373b3bf2574daba6e251c0b94393"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/14/2019",
        "Description": "SQC*CASH APP 8774174551 CA                   03/13",
        "Amount": "-1.6",
        "Type": "DEBIT_CARD",
        "Balance": "1914.89",
        "Check or Slip #": "",
        "TransactionId": "8b9738233f0393319f7cb6fce1bf2317"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/14/2019",
        "Description": "TACO BELL #48 LONG BEACH CA                  03/13",
        "Amount": "-6.05",
        "Type": "DEBIT_CARD",
        "Balance": "1916.49",
        "Check or Slip #": "",
        "TransactionId": "c3b0c4ca2fc5a351d421226e8ba749db"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/14/2019",
        "Description": "JACK IN THE BOX 5369 310-522-0725 CA         03/13",
        "Amount": "-5.48",
        "Type": "DEBIT_CARD",
        "Balance": "1922.54",
        "Check or Slip #": "",
        "TransactionId": "10ebfb989a76e492396d281aaaf19eea"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/14/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         03/12",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1928.02",
        "Check or Slip #": "",
        "TransactionId": "acaaa5f4f7afb2c08258b995cd743d0b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/13/2019",
        "Description": "BEST BUY      00011197 SIGNAL HILL CA        03/13",
        "Amount": "-44.86",
        "Type": "DEBIT_CARD",
        "Balance": "1929.12",
        "Check or Slip #": "",
        "TransactionId": "cf0526853c42e674a22d0ba2a3d3af8d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/13/2019",
        "Description": "BURGER KING #4413 LONG BEACH CA              03/11",
        "Amount": "-7.16",
        "Type": "DEBIT_CARD",
        "Balance": "1973.98",
        "Check or Slip #": "",
        "TransactionId": "aadeb66655856cb9c4c06e743bd3228f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/12/2019",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              03/11",
        "Amount": "-675",
        "Type": "DEBIT_CARD",
        "Balance": "1981.14",
        "Check or Slip #": "",
        "TransactionId": "96b35f11c695847ebabdf6a64dfcb96a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/11/2019",
        "Description": "TACO BELL 2828 LONG BEACH CA                 03/10",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "2656.14",
        "Check or Slip #": "",
        "TransactionId": "188889db131c047f61b8e4d28febdaec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/11/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              03/10",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "2661.65",
        "Check or Slip #": "",
        "TransactionId": "9e3138dc8ea8ad325665aa60bbc9ad0e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/11/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    03/08",
        "Amount": "-6.23",
        "Type": "DEBIT_CARD",
        "Balance": "2697.65",
        "Check or Slip #": "",
        "TransactionId": "0b500656504bd6932310bd9e2b50aa47"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/08/2019",
        "Description": "Wal-Mart Super Center LONG BEACH CA          03/08",
        "Amount": "-41.55",
        "Type": "DEBIT_CARD",
        "Balance": "2703.88",
        "Check or Slip #": "",
        "TransactionId": "5985f5388a8beaa6fbaa3152f005c12e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/08/2019",
        "Description": "GOODWILL 422-BELMONT LONG BEACH CA   265394  03/08",
        "Amount": "-9.99",
        "Type": "DEBIT_CARD",
        "Balance": "2745.43",
        "Check or Slip #": "",
        "TransactionId": "6cdddd5b10632db212b1539201264864"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/08/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "352.04",
        "Type": "ACH_CREDIT",
        "Balance": "2755.42",
        "Check or Slip #": "",
        "TransactionId": "ca64cb2acaf5602d1dd93fd01fcb3714"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2019",
        "Description": "SQC*SQUARE CASH 8774174551 CA                03/06",
        "Amount": "-7.31",
        "Type": "DEBIT_CARD",
        "Balance": "2403.38",
        "Check or Slip #": "",
        "TransactionId": "40f6a5ec23f1c68f6a03b1cca3e7be4b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2019",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              03/06",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "2410.69",
        "Check or Slip #": "",
        "TransactionId": "665a9c3df23b8d9f075511a4d6daa842"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2019",
        "Description": "MCDONALD'S F634 WILMINGTON CA                03/05",
        "Amount": "-3.6",
        "Type": "DEBIT_CARD",
        "Balance": "2411.69",
        "Check or Slip #": "",
        "TransactionId": "585fdc64b4f00014c73bc0d6a7dd002a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/06/2019",
        "Description": "BURGER KING #4413 LONG BEACH CA              03/04",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "2415.29",
        "Check or Slip #": "",
        "TransactionId": "56c40781cceecc5683892099464dc002"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/05/2019",
        "Description": "Square Inc       Jerem      T200101430806   CCD ID: 8800429876",
        "Amount": "13.1",
        "Type": "ACH_CREDIT",
        "Balance": "2420.8",
        "Check or Slip #": "",
        "TransactionId": "6e128910849a57922016e559b203fb40"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/04/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-106.83",
        "Type": "ACH_DEBIT",
        "Balance": "2407.7",
        "Check or Slip #": "",
        "TransactionId": "21b75f93998c112e13ae5720117a84b4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/04/2019",
        "Description": "HABIT - LONG BEACH  #98 LONG BEACH CA        03/03",
        "Amount": "-22.5",
        "Type": "DEBIT_CARD",
        "Balance": "2514.53",
        "Check or Slip #": "",
        "TransactionId": "24fcc0c53976e6e6375513d415124a0a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/04/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              03/03",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "2537.03",
        "Check or Slip #": "",
        "TransactionId": "2476a644ee9194aa1c031efc016f58ab"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/04/2019",
        "Description": "MCDONALD'S F11415 LOMITA CA                  03/02",
        "Amount": "-2.74",
        "Type": "DEBIT_CARD",
        "Balance": "2573.03",
        "Check or Slip #": "",
        "TransactionId": "cfe66fad03155dddd6b64c1df88aaa8b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/04/2019",
        "Description": "CIRCLE K STORES HARBOR CITY CA               03/02",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "2575.77",
        "Check or Slip #": "",
        "TransactionId": "060aacbd2e2c5fdc0eabda7b0b6e13ee"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/04/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    03/01",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "2600.77",
        "Check or Slip #": "",
        "TransactionId": "acb26079eb5e6236284bbb719a427a6f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/01/2019",
        "Description": "Wal-Mart Super Center LONG BEACH CA          03/01",
        "Amount": "-16.98",
        "Type": "DEBIT_CARD",
        "Balance": "2605.15",
        "Check or Slip #": "",
        "TransactionId": "82b91778e1d9e3d83025a542b53881cc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/01/2019",
        "Description": "RALLY'S LONG BEACH CA                        02/27",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "2622.13",
        "Check or Slip #": "",
        "TransactionId": "e2212f883af65eb773129676e987f15e"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/01/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "358.29",
        "Type": "ACH_CREDIT",
        "Balance": "2627.63",
        "Check or Slip #": "",
        "TransactionId": "63df5ea922657e32f8e3947500727273"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/27/2019",
        "Description": "GOODWILL 422-BELMONT LONG BEACH CA   413225  02/27",
        "Amount": "-24",
        "Type": "DEBIT_CARD",
        "Balance": "2269.34",
        "Check or Slip #": "",
        "TransactionId": "5e8314df6f4d0ff72d0c602dbd56518f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/26/2019",
        "Description": "SQ *VIBES BEACH CAFE LONG BEACH CA           02/25",
        "Amount": "-53.1",
        "Type": "DEBIT_CARD",
        "Balance": "2293.34",
        "Check or Slip #": "",
        "TransactionId": "2e955d558c5451cdefab212dc9fc53a3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/25/2019",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              02/24",
        "Amount": "-23.5",
        "Type": "DEBIT_CARD",
        "Balance": "2346.44",
        "Check or Slip #": "",
        "TransactionId": "9bf2ae3b7c04894ea30c2d48d4b80a74"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/25/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              02/24",
        "Amount": "-33",
        "Type": "DEBIT_CARD",
        "Balance": "2369.94",
        "Check or Slip #": "",
        "TransactionId": "5143821df9e170541abbdb5961403b8e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/25/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         02/22",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "2402.94",
        "Check or Slip #": "",
        "TransactionId": "51d5535883fd1b208df5074ab1cb135b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/25/2019",
        "Description": "CHEVRON 0093901 LONG BEACH CA                02/22",
        "Amount": "-30.04",
        "Type": "DEBIT_CARD",
        "Balance": "2403.89",
        "Check or Slip #": "",
        "TransactionId": "5f1bc2d27fcfddec9ac24a5c1cf1de4f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/25/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         02/21",
        "Amount": "-0.6",
        "Type": "DEBIT_CARD",
        "Balance": "2433.93",
        "Check or Slip #": "",
        "TransactionId": "72424425024f10dfb26c54b04f4249f3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/25/2019",
        "Description": "MCDONALD'S F25973 562-421-0844 CA            02/21",
        "Amount": "-3.3",
        "Type": "DEBIT_CARD",
        "Balance": "2434.53",
        "Check or Slip #": "",
        "TransactionId": "8221eb36c8cf52cf20474b6d423acca8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/25/2019",
        "Description": "MCDONALD'S F25973 562-421-0844 CA            02/21",
        "Amount": "-6.76",
        "Type": "DEBIT_CARD",
        "Balance": "2437.83",
        "Check or Slip #": "",
        "TransactionId": "7ff04a5ab76c5dcd3016c4970a439987"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/22/2019",
        "Description": "FOOD4LESS 0762 LONG BEACH CA         724049  02/22",
        "Amount": "-22.61",
        "Type": "DEBIT_CARD",
        "Balance": "2444.59",
        "Check or Slip #": "",
        "TransactionId": "836eadbcead5064ce539fe428b6e01eb"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/22/2019",
        "Description": "QAPITAL INC      QAPITAL IN 572515536       WEB ID: 3471161945",
        "Amount": "22.59",
        "Type": "ACH_CREDIT",
        "Balance": "2467.2",
        "Check or Slip #": "",
        "TransactionId": "47e55466dbd4993ab35c215464264067"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/22/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "323.44",
        "Type": "ACH_CREDIT",
        "Balance": "2444.61",
        "Check or Slip #": "",
        "TransactionId": "00e13cf69d6576e740a2a626c1cffdb7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/21/2019",
        "Description": "DOLLARTRE 1840 LONG BE LONG BEACH CA         02/21",
        "Amount": "-5.21",
        "Type": "DEBIT_CARD",
        "Balance": "2121.17",
        "Check or Slip #": "",
        "TransactionId": "5aedb4ac39b0d3d634f1325b6a93c087"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/20/2019",
        "Description": "QAPITAL INC      QAPITAL IN 567361620       WEB ID: 1471161945",
        "Amount": "-2.45",
        "Type": "ACH_DEBIT",
        "Balance": "2126.38",
        "Check or Slip #": "",
        "TransactionId": "cb40b63665bf7e0dc147665747219b50"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/20/2019",
        "Description": "IRS  TREAS 310     TAX REF                  PPD ID: 9111736946",
        "Amount": "524",
        "Type": "ACH_CREDIT",
        "Balance": "2128.83",
        "Check or Slip #": "",
        "TransactionId": "ad386a1a2b5b3188bf5d8128e400c959"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2019",
        "Description": "THE MARKET (VONS) 2280 LONG BEACH CA 219781  02/18",
        "Amount": "-13.98",
        "Type": "DEBIT_CARD",
        "Balance": "1604.83",
        "Check or Slip #": "",
        "TransactionId": "42497f539b9213bcbb8eaea2fbefa078"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2019",
        "Description": "TACO BELL 146 LONG BEACH CA                  02/18",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1618.81",
        "Check or Slip #": "",
        "TransactionId": "36f5d004a1f46e3fa463e06350c27226"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2019",
        "Description": "CHEVRON 0207435 LONG BEACH CA                02/18",
        "Amount": "-15.01",
        "Type": "DEBIT_CARD",
        "Balance": "1624.32",
        "Check or Slip #": "",
        "TransactionId": "b85fdbc6ec2cb5c3072f0f576d71d562"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              02/17",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "1639.33",
        "Check or Slip #": "",
        "TransactionId": "de3268890ad55e1c75949c5f5ea125b1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2019",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              02/16",
        "Amount": "-9.14",
        "Type": "DEBIT_CARD",
        "Balance": "1676.33",
        "Check or Slip #": "",
        "TransactionId": "50a9aab9edd039a79565935b3e8291ec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         02/14",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "1685.47",
        "Check or Slip #": "",
        "TransactionId": "11d960cb8f0fc5a7414aef0ceffd37bb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/19/2019",
        "Description": "BURGER KING #4413 LONG BEACH CA              02/14",
        "Amount": "-4.41",
        "Type": "DEBIT_CARD",
        "Balance": "1686.42",
        "Check or Slip #": "",
        "TransactionId": "4a7aba4d34be8afd98e57e0406ebc0e4"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/19/2019",
        "Description": "FRANCHISE TAX BD CASTTAXRFD                 PPD ID: 9282532045",
        "Amount": "155",
        "Type": "ACH_CREDIT",
        "Balance": "1690.83",
        "Check or Slip #": "",
        "TransactionId": "80945477f2d8cf3535d5601615b5c40c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/15/2019",
        "Description": "QAPITAL INC      QAPITAL IN 558572428       WEB ID: 1471161945",
        "Amount": "-1.69",
        "Type": "ACH_DEBIT",
        "Balance": "1535.83",
        "Check or Slip #": "",
        "TransactionId": "42d594cd5e057f1c8fbb616a02b36a18"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/15/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         02/13",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "1537.52",
        "Check or Slip #": "",
        "TransactionId": "09bbaced0739dea5395ecc7a46219b1e"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/15/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "363.15",
        "Type": "ACH_CREDIT",
        "Balance": "1538.47",
        "Check or Slip #": "",
        "TransactionId": "9bab5a4aa510938c02ff23c081f11318"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/14/2019",
        "Description": "QAPITAL INC      QAPITAL IN 556505272       WEB ID: 1471161945",
        "Amount": "-2",
        "Type": "ACH_DEBIT",
        "Balance": "1175.32",
        "Check or Slip #": "",
        "TransactionId": "40c56808f29c71f5acdf0537af74578a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/14/2019",
        "Description": "VONS     Store  3076 LONG BEACH CA           02/14",
        "Amount": "-33.04",
        "Type": "DEBIT_CARD",
        "Balance": "1177.32",
        "Check or Slip #": "",
        "TransactionId": "c346eaaf9d998892fca2dec9d1ba1512"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/14/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         02/12",
        "Amount": "-0.6",
        "Type": "DEBIT_CARD",
        "Balance": "1210.36",
        "Check or Slip #": "",
        "TransactionId": "fec05a6c1c169134a2f6fa356e7085d3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/13/2019",
        "Description": "SQC*SQUARE CASH 8774174551 CA                02/12",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "1210.96",
        "Check or Slip #": "",
        "TransactionId": "ae7d956c3f05a03cf0e906d2d9f205be"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/13/2019",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              02/12",
        "Amount": "-675",
        "Type": "DEBIT_CARD",
        "Balance": "1215.96",
        "Check or Slip #": "",
        "TransactionId": "4dbbb44d5f5784a3e95ccd68cfb52caa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/13/2019",
        "Description": "JACK IN THE BOX 0213 909-597-8995 CA         02/12",
        "Amount": "-15.31",
        "Type": "DEBIT_CARD",
        "Balance": "1890.96",
        "Check or Slip #": "",
        "TransactionId": "2227995fde5f66ee7ba1082088bf452e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/12/2019",
        "Description": "QAPITAL INC      QAPITAL IN 552198273       WEB ID: 1471161945",
        "Amount": "-5.37",
        "Type": "ACH_DEBIT",
        "Balance": "1906.27",
        "Check or Slip #": "",
        "TransactionId": "3764b52afcae27872fbaa39018331eb4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/12/2019",
        "Description": "SQC*SQUARE CASH 8774174551 CA                02/10",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1911.64",
        "Check or Slip #": "",
        "TransactionId": "9118cbf8c3385547341e357713045d83"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/12/2019",
        "Description": "SQC*Jeremy Board VISA DIRECT CA      253590  02/12",
        "Amount": "11.08",
        "Type": "DEBIT_CARD",
        "Balance": "1912.64",
        "Check or Slip #": "",
        "TransactionId": "38c94c1dafdba5e51a980febdb7d34b9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/11/2019",
        "Description": "SQC*SQUARE CASH 8774174551 CA                02/10",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "1901.56",
        "Check or Slip #": "",
        "TransactionId": "a686fff17d94f7228c585a78fe3f883c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/11/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              02/10",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "1906.56",
        "Check or Slip #": "",
        "TransactionId": "e1c8759eeef522c556c6b40356133715"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/11/2019",
        "Description": "SQC*SQUARE CASH 8774174551 CA                02/09",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "1943.56",
        "Check or Slip #": "",
        "TransactionId": "85be81c24c67f52a0cbbe69c692bfb43"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/08/2019",
        "Description": "QAPITAL INC      QAPITAL IN 546184124       WEB ID: 1471161945",
        "Amount": "-1.75",
        "Type": "ACH_DEBIT",
        "Balance": "1953.56",
        "Check or Slip #": "",
        "TransactionId": "412f8ad9e25059f714d1869a7da17a1d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/08/2019",
        "Description": "CHEVRON/SIGNAL HILL OI LONG BEACH CA 061788  02/08",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "1955.31",
        "Check or Slip #": "",
        "TransactionId": "8fbca630e06f6a6ac2acfb309e8d5329"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/08/2019",
        "Description": "COSTCO WHSE #0424 SIGNAL HILL CA     242637  02/08",
        "Amount": "-6.55",
        "Type": "DEBIT_CARD",
        "Balance": "1985.31",
        "Check or Slip #": "",
        "TransactionId": "71b2a0c0e8a3f2da4b9908a2a5086a93"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/08/2019",
        "Description": "JACK IN THE BOX 5369 310-522-0725 CA         02/07",
        "Amount": "-7.08",
        "Type": "DEBIT_CARD",
        "Balance": "1991.86",
        "Check or Slip #": "",
        "TransactionId": "122221ad7730413bfdec55097b664ff2"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/08/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "362.86",
        "Type": "ACH_CREDIT",
        "Balance": "1998.94",
        "Check or Slip #": "",
        "TransactionId": "4cb610eff87a2df4ee821a607f9b2bbb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/07/2019",
        "Description": "QAPITAL INC      QAPITAL IN 544012554       WEB ID: 1471161945",
        "Amount": "-1.49",
        "Type": "ACH_DEBIT",
        "Balance": "1636.08",
        "Check or Slip #": "",
        "TransactionId": "7abc04542944e4d09748b33056500b71"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/06/2019",
        "Description": "QAPITAL INC      QAPITAL IN 542005806       WEB ID: 1471161945",
        "Amount": "-6.84",
        "Type": "ACH_DEBIT",
        "Balance": "1637.57",
        "Check or Slip #": "",
        "TransactionId": "243fa26e5b958cee81fc29cdd690221e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/06/2019",
        "Description": "EL TORAZO LONG BEACH CA                      02/05",
        "Amount": "-8.25",
        "Type": "DEBIT_CARD",
        "Balance": "1644.41",
        "Check or Slip #": "",
        "TransactionId": "3fa00681a516d9ba3815842b85a1f1be"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/05/2019",
        "Description": "QAPITAL INC      QAPITAL IN 539705124       WEB ID: 1471161945",
        "Amount": "-1",
        "Type": "ACH_DEBIT",
        "Balance": "1652.66",
        "Check or Slip #": "",
        "TransactionId": "29679ca0787bda52fa1b1feba035cb98"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/05/2019",
        "Description": "BURGER KING #4413 LONG BEACH CA              02/03",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1653.66",
        "Check or Slip #": "",
        "TransactionId": "9e2d6b6d0d852ee43b8b94512d3045b5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/04/2019",
        "Description": "WM SUPERC Wal-Mart Sup LONG BEACH CA         02/04",
        "Amount": "-50.46",
        "Type": "DEBIT_CARD",
        "Balance": "1659.17",
        "Check or Slip #": "",
        "TransactionId": "16edea88c043b5fd956fccfcdc0ea294"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/04/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              02/03",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "1709.63",
        "Check or Slip #": "",
        "TransactionId": "4d9b13420a18c0929735ba1cd635c47a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/04/2019",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              02/03",
        "Amount": "-53.35",
        "Type": "DEBIT_CARD",
        "Balance": "1745.63",
        "Check or Slip #": "",
        "TransactionId": "12c1eb69b7081909da52096fc3ee6b78"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/04/2019",
        "Description": "JACK IN THE BOX 0216 562-439-8958 CA         02/03",
        "Amount": "-2.21",
        "Type": "DEBIT_CARD",
        "Balance": "1798.98",
        "Check or Slip #": "",
        "TransactionId": "ff14fa2ac0e42a0c6a3f5e34bd775b5b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/04/2019",
        "Description": "SOUPLANTATION 6 Q02 LAKEWOOD CA              02/02",
        "Amount": "-11.49",
        "Type": "DEBIT_CARD",
        "Balance": "1801.19",
        "Check or Slip #": "",
        "TransactionId": "4a0df88eba7c94de9886e025d9d2ccc5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/04/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    02/01",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "1812.68",
        "Check or Slip #": "",
        "TransactionId": "024c46d14168302103d1c96ccda8eb35"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/01/2019",
        "Description": "WAL-MART #4101 LONG BEACH CA                 02/01",
        "Amount": "-66.44",
        "Type": "DEBIT_CARD",
        "Balance": "1817.06",
        "Check or Slip #": "",
        "TransactionId": "9346731a9e90b41076888a342b408df9"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/01/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "353.82",
        "Type": "ACH_CREDIT",
        "Balance": "1883.5",
        "Check or Slip #": "",
        "TransactionId": "d7d5f33643ce4cdaf96ecbd77c3bb828"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/31/2019",
        "Description": "CHEVRON 0090817 LONG BEACH CA                01/30",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "1529.68",
        "Check or Slip #": "",
        "TransactionId": "d598d391bef6586d936e23ed6c1e4621"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/31/2019",
        "Description": "DEL TACO 0888 CARSON CA                      01/29",
        "Amount": "-7.11",
        "Type": "DEBIT_CARD",
        "Balance": "1559.68",
        "Check or Slip #": "",
        "TransactionId": "39f59c520abe726adde8809093c8d460"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/31/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/29",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1566.79",
        "Check or Slip #": "",
        "TransactionId": "1dd93a85c88fb091fc406d69aee58c7d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/30/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-106.83",
        "Type": "ACH_DEBIT",
        "Balance": "1567.89",
        "Check or Slip #": "",
        "TransactionId": "9b0597f368ad499cd116e53828d1294c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/30/2019",
        "Description": "JACK IN THE BOX 0376 562-439-6798 CA         01/29",
        "Amount": "-6.27",
        "Type": "DEBIT_CARD",
        "Balance": "1674.72",
        "Check or Slip #": "",
        "TransactionId": "ea83196ba6afab75aeb6bec6b87d66b5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2019",
        "Description": "SQC*SQUARE CASH 8774174551 CA                01/28",
        "Amount": "-2.11",
        "Type": "DEBIT_CARD",
        "Balance": "1680.99",
        "Check or Slip #": "",
        "TransactionId": "2e86fc868ea4de2857555a5d713d3d8a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2019",
        "Description": "WAL-MART #4101 LONG BEACH CA                 01/28",
        "Amount": "-53.91",
        "Type": "DEBIT_CARD",
        "Balance": "1683.1",
        "Check or Slip #": "",
        "TransactionId": "58120f59c7a46d8acf0257a3fb65566d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2019",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              01/27",
        "Amount": "-18",
        "Type": "DEBIT_CARD",
        "Balance": "1737.01",
        "Check or Slip #": "",
        "TransactionId": "8a37567cd8eab03f8c1ea7c2f98c4d5f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              01/27",
        "Amount": "-39",
        "Type": "DEBIT_CARD",
        "Balance": "1755.01",
        "Check or Slip #": "",
        "TransactionId": "130697b0d2137cdf30ccb2f35af5ffc8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2019",
        "Description": "KFC D016016 LONG BEACH CA                    01/26",
        "Amount": "-6.6",
        "Type": "DEBIT_CARD",
        "Balance": "1794.01",
        "Check or Slip #": "",
        "TransactionId": "0acedea3e16a1b63588adb1c4495db5d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    01/25",
        "Amount": "-5.48",
        "Type": "DEBIT_CARD",
        "Balance": "1800.61",
        "Check or Slip #": "",
        "TransactionId": "619a23c374995c05625ffe88f6c65960"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/28/2019",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              01/25",
        "Amount": "-65",
        "Type": "DEBIT_CARD",
        "Balance": "1806.09",
        "Check or Slip #": "",
        "TransactionId": "7f891c42af009093e6537cdea36c8512"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/25/2019",
        "Description": "WAL-MART #4101 LONG BEACH CA                 01/25",
        "Amount": "-22.71",
        "Type": "DEBIT_CARD",
        "Balance": "1871.09",
        "Check or Slip #": "",
        "TransactionId": "5bd786dd10fde64b02cbf59ef581088f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/25/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/24",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "1893.8",
        "Check or Slip #": "",
        "TransactionId": "ea13646060143f65d3768fe06a2ef725"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/25/2019",
        "Description": "RUBY THAI KITCHEN CERRITOS CA                01/24",
        "Amount": "-9.19",
        "Type": "DEBIT_CARD",
        "Balance": "1894.75",
        "Check or Slip #": "",
        "TransactionId": "cd5cafdd615d95a07a11b507cb7644aa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/25/2019",
        "Description": "GREEN CRUSH CERRITOS CA                      01/24",
        "Amount": "-4.5",
        "Type": "DEBIT_CARD",
        "Balance": "1903.94",
        "Check or Slip #": "",
        "TransactionId": "315b40dc78a1151175f618d5e46419ed"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/25/2019",
        "Description": "JACK IN THE BOX 5369 310-522-0725 CA         01/24",
        "Amount": "-3.27",
        "Type": "DEBIT_CARD",
        "Balance": "1908.44",
        "Check or Slip #": "",
        "TransactionId": "73ca6e2b0c6efead4bc143ad022aaa5a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/25/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "382.17",
        "Type": "ACH_CREDIT",
        "Balance": "1911.71",
        "Check or Slip #": "",
        "TransactionId": "aff91bdcce4d8549d43d10ad752ba6cf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/24/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/22",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1529.54",
        "Check or Slip #": "",
        "TransactionId": "7b39ef1d2b93b0a3fba5d2221f4fe91a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/23/2019",
        "Description": "MCDONALD'S F476 LAKEWOOD CA                  01/21",
        "Amount": "-2.93",
        "Type": "DEBIT_CARD",
        "Balance": "1530.64",
        "Check or Slip #": "",
        "TransactionId": "449c61f5311299268833c5cf71e5e568"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2019",
        "Description": "JIFFY LUBE #565 LONG BEACH CA                01/22",
        "Amount": "-35.51",
        "Type": "DEBIT_CARD",
        "Balance": "1533.57",
        "Check or Slip #": "",
        "TransactionId": "b0c9891d0c12ae831cb8f5b201985b70"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2019",
        "Description": "WM SUPERC Wal-Mart Sup LAKEWOOD CA           01/21",
        "Amount": "-53.45",
        "Type": "DEBIT_CARD",
        "Balance": "1569.08",
        "Check or Slip #": "",
        "TransactionId": "cd6bc83e70c3be40d08878c0c8adce91"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2019",
        "Description": "DENNY'S #8065 LONG BEACH CA                  01/21",
        "Amount": "-25.08",
        "Type": "DEBIT_CARD",
        "Balance": "1622.53",
        "Check or Slip #": "",
        "TransactionId": "0e84085d6c53db3674216b9a3c369c3a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2019",
        "Description": "WENDY'S 844 LONG BEACH CA                    01/20",
        "Amount": "-6.16",
        "Type": "DEBIT_CARD",
        "Balance": "1647.61",
        "Check or Slip #": "",
        "TransactionId": "857dcd34170735b1681ccc08730af3da"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2019",
        "Description": "CHEVRON/H&S ENERGY, LL LAKEWOOD CA   054893  01/20",
        "Amount": "-27.01",
        "Type": "DEBIT_CARD",
        "Balance": "1653.77",
        "Check or Slip #": "",
        "TransactionId": "d2e5312b6df80112248428ee26cdb20c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2019",
        "Description": "SQC*SQUARE CASH 8774174551 CA                01/20",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "1680.78",
        "Check or Slip #": "",
        "TransactionId": "5a121b5ba53a99d045bc03cee1e47a19"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              01/20",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "1690.78",
        "Check or Slip #": "",
        "TransactionId": "0fc04a0a56103cb05b6637a0264a87e5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2019",
        "Description": "TACO BELL 700146 562-438-7635 CA             01/20",
        "Amount": "-4.69",
        "Type": "DEBIT_CARD",
        "Balance": "1726.78",
        "Check or Slip #": "",
        "TransactionId": "42d8ead5f4653dfb856402badb5851d7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2019",
        "Description": "SQC*SQUARE CASH 8774174551 CA                01/18",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "1731.47",
        "Check or Slip #": "",
        "TransactionId": "ee5350ca4027a279e91c3aa9b51586f6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2019",
        "Description": "DEL TACO 0888 CARSON CA                      01/18",
        "Amount": "-4.26",
        "Type": "DEBIT_CARD",
        "Balance": "1736.47",
        "Check or Slip #": "",
        "TransactionId": "1471516f5290960132ca46fff514367f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/18",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "1740.73",
        "Check or Slip #": "",
        "TransactionId": "804ab12746c647057bf9ddaeda356945"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2019",
        "Description": "BURGER KING #4413 LONG BEACH CA              01/17",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1741.68",
        "Check or Slip #": "",
        "TransactionId": "bed92eb1af24f12d02cf2117dec1d68b"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/22/2019",
        "Description": "Square Inc       Jerem      T20091972667    CCD ID: 8800429876",
        "Amount": "14.8",
        "Type": "ACH_CREDIT",
        "Balance": "1747.19",
        "Check or Slip #": "",
        "TransactionId": "067521f7db8f1243d63656d0268d240c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/18/2019",
        "Description": "JACK IN THE BOX 5369 310-522-0725 CA         01/17",
        "Amount": "-3.27",
        "Type": "DEBIT_CARD",
        "Balance": "1732.39",
        "Check or Slip #": "",
        "TransactionId": "88755f3598a3b620077168997a615ff8"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/18/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "360.09",
        "Type": "ACH_CREDIT",
        "Balance": "1735.66",
        "Check or Slip #": "",
        "TransactionId": "b918c0f7f887f35798ae8bae7a7db68a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/16/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/14",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1375.57",
        "Check or Slip #": "",
        "TransactionId": "96612eff2791437f76401dbaf52bddc1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/15/2019",
        "Description": "SQC*SQUARE CASH 8774174551 CA                01/14",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "1376.67",
        "Check or Slip #": "",
        "TransactionId": "a5b3427d9cc5299668a418f955409713"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/15/2019",
        "Description": "TACO BELL #003135 LONG BEACH CA              01/14",
        "Amount": "-6.05",
        "Type": "DEBIT_CARD",
        "Balance": "1378.67",
        "Check or Slip #": "",
        "TransactionId": "d17480ebe41a89524b6b714b8604cce1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/15/2019",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              01/14",
        "Amount": "-675",
        "Type": "DEBIT_CARD",
        "Balance": "1384.72",
        "Check or Slip #": "",
        "TransactionId": "3d0431eb605ced8dff311285d7ca309d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2019",
        "Description": "ALDI 79047 LONG BEACH CA                     01/14",
        "Amount": "-19.17",
        "Type": "DEBIT_CARD",
        "Balance": "2059.72",
        "Check or Slip #": "",
        "TransactionId": "af000ccf403dbfc7b29f7ed2b27e191c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2019",
        "Description": "WINGSTOP 277 LONG BEACH CA                   01/14",
        "Amount": "-10.9",
        "Type": "DEBIT_CARD",
        "Balance": "2078.89",
        "Check or Slip #": "",
        "TransactionId": "792991f11bc59a7b93cc2ba35f346353"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              01/13",
        "Amount": "-27",
        "Type": "DEBIT_CARD",
        "Balance": "2089.79",
        "Check or Slip #": "",
        "TransactionId": "b356031453c15982c88f8e1fbbee8a6d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2019",
        "Description": "ATM WITHDRAWAL                       008729  01/125200 E 2N",
        "Amount": "-20",
        "Type": "ATM",
        "Balance": "2116.79",
        "Check or Slip #": "",
        "TransactionId": "c0c92e34909500265bf8752f4fce0c56"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2019",
        "Description": "RUBIO'S #033 LONG BEACH CA                   01/12",
        "Amount": "-11.44",
        "Type": "DEBIT_CARD",
        "Balance": "2136.79",
        "Check or Slip #": "",
        "TransactionId": "47025979a643f5e4ea905ee9082a201d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2019",
        "Description": "SQC*SQUARE CASH 8774174551 CA                01/11",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "2148.23",
        "Check or Slip #": "",
        "TransactionId": "8587add18e07e710503aa022efeaeefb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/11",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2153.73",
        "Check or Slip #": "",
        "TransactionId": "96c1875c68212b69eefad4158809e10f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/14/2019",
        "Description": "JACK IN THE BOX 5369 CARSON CA               01/10",
        "Amount": "-8.42",
        "Type": "DEBIT_CARD",
        "Balance": "2154.83",
        "Check or Slip #": "",
        "TransactionId": "ecfc4b78eb8cabacf704f8d47668393d"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/11/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "264.12",
        "Type": "ACH_CREDIT",
        "Balance": "2163.25",
        "Check or Slip #": "",
        "TransactionId": "d818d09f5e757c1ade633a8e94703ac6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/10/2019",
        "Description": "7-ELEVEN LAKEWOOD CA                         01/10",
        "Amount": "-2.18",
        "Type": "DEBIT_CARD",
        "Balance": "1899.13",
        "Check or Slip #": "",
        "TransactionId": "b15c69017842238ad42a388c99acfb28"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/10/2019",
        "Description": "CHEVRON/LONG BEACH W HAWAIIAN GARD CA036005  01/10",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "1901.31",
        "Check or Slip #": "",
        "TransactionId": "6a436509fb664c385168331b47da7774"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/09/2019",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/07",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1931.31",
        "Check or Slip #": "",
        "TransactionId": "7c2d5425c98e3e91188afff0d9438b24"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/07/2019",
        "Description": "SMART AND FINAL LONG BEACH CA                01/07",
        "Amount": "-38.76",
        "Type": "DEBIT_CARD",
        "Balance": "1932.41",
        "Check or Slip #": "",
        "TransactionId": "fd82333fb7de2132448125d558894b62"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/07/2019",
        "Description": "SQC*JAMES RALL 8774174551 CA                 01/06",
        "Amount": "-7.5",
        "Type": "DEBIT_CARD",
        "Balance": "1971.17",
        "Check or Slip #": "",
        "TransactionId": "e48364840d763b128ceebeea6b9e3da2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/07/2019",
        "Description": "WM SUPERC Wal-Mart Sup LONG BEACH CA         01/06",
        "Amount": "-22.02",
        "Type": "DEBIT_CARD",
        "Balance": "1978.67",
        "Check or Slip #": "",
        "TransactionId": "43d98e545b03f6d68be905ea363a065f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/07/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    01/06",
        "Amount": "-6.23",
        "Type": "DEBIT_CARD",
        "Balance": "2000.69",
        "Check or Slip #": "",
        "TransactionId": "ef0c31a37198f8029047a4a9814a9775"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/07/2019",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              01/06",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "2006.92",
        "Check or Slip #": "",
        "TransactionId": "99bc635db28ffdedf17e796c21cb469b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/07/2019",
        "Description": "Wal-Mart Super Center LONG BEACH CA          01/05",
        "Amount": "-50.38",
        "Type": "DEBIT_CARD",
        "Balance": "2036.92",
        "Check or Slip #": "",
        "TransactionId": "ff3d48008d6e893fe2a925f1a9065475"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/07/2019",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    01/05",
        "Amount": "-6.23",
        "Type": "DEBIT_CARD",
        "Balance": "2087.3",
        "Check or Slip #": "",
        "TransactionId": "791dd3b974390ae13b9fa31a98767406"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/07/2019",
        "Description": "5901 EL POLLO LOCO CARSON CA                 01/05",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "2093.53",
        "Check or Slip #": "",
        "TransactionId": "a93cf845a715d151b3f719c3c3dea895"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/07/2019",
        "Description": "SQC*SQUARE CASH 8774174551 CA                01/04",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "2100.53",
        "Check or Slip #": "",
        "TransactionId": "945030f9fb384d9d80876efa12dc632f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/04/2019",
        "Description": "SQC*TIMOTHY 8774174551 CA                    01/03",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "2104.53",
        "Check or Slip #": "",
        "TransactionId": "3974079b9eb75db785268202ceba4fce"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/04/2019",
        "Description": "RALLY'S LONG BEACH CA                        01/02",
        "Amount": "-5.72",
        "Type": "DEBIT_CARD",
        "Balance": "2109.53",
        "Check or Slip #": "",
        "TransactionId": "f9ad3ecc0aad8d7494b2c582d3b4d09e"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/04/2019",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "295.1",
        "Type": "ACH_CREDIT",
        "Balance": "2115.25",
        "Check or Slip #": "",
        "TransactionId": "2b08e1624d35fd7f1380931be7f221cb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/03/2019",
        "Description": "CHEVRON/JB STATION, IN LONG BEACH CA 041135  01/03",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "1820.15",
        "Check or Slip #": "",
        "TransactionId": "9cd10fef6290265593603c9f316783b5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/03/2019",
        "Description": "AMC MARINA PACIFICA#023 LONG BEACH CA        01/01",
        "Amount": "-14.17",
        "Type": "DEBIT_CARD",
        "Balance": "1850.15",
        "Check or Slip #": "",
        "TransactionId": "59fe01c6a9aa627687ec0ac52aa216df"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2019",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-107.74",
        "Type": "ACH_DEBIT",
        "Balance": "1864.32",
        "Check or Slip #": "",
        "TransactionId": "1b0d497665ad41b0b9ed9527f457df8c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2019",
        "Description": "TARGET T- 950 E 33rd S SIGNAL HILL CA        01/02",
        "Amount": "-10.97",
        "Type": "DEBIT_CARD",
        "Balance": "1972.06",
        "Check or Slip #": "",
        "TransactionId": "09b77878eb1f1657150a7efb6accd2cf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2019",
        "Description": "ATM WITHDRAWAL                       006150  01/015200 E 2N",
        "Amount": "-20",
        "Type": "ATM",
        "Balance": "1983.03",
        "Check or Slip #": "",
        "TransactionId": "c1ce2cf2bb3ff9ce091bc6337d5aae2b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2019",
        "Description": "RUBIO'S #033 LONG BEACH CA                   01/01",
        "Amount": "-22.13",
        "Type": "DEBIT_CARD",
        "Balance": "2003.03",
        "Check or Slip #": "",
        "TransactionId": "3692f94f544f378524cb813e3fb81c0e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2019",
        "Description": "IN N OUT BURGER 265 SIGNAL HILL CA           01/01",
        "Amount": "-8.49",
        "Type": "DEBIT_CARD",
        "Balance": "2025.16",
        "Check or Slip #": "",
        "TransactionId": "15ed8946c8f2c07fa9d327095d7cc134"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2019",
        "Description": "SQC*Jeremy Board VISA DIRECT CA      200806  01/02",
        "Amount": "15.17",
        "Type": "DEBIT_CARD",
        "Balance": "2033.65",
        "Check or Slip #": "",
        "TransactionId": "065f1808f8029bffd21dc778403fb6e7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/31/2018",
        "Description": "COSTCO WHSE #1050 LAKEWOOD CA        231214  12/31",
        "Amount": "-3.92",
        "Type": "DEBIT_CARD",
        "Balance": "2018.48",
        "Check or Slip #": "",
        "TransactionId": "b57f97f0c03e504002f297643beb85ce"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/31/2018",
        "Description": "HOBBYLOBBY 4001 HARDWI LAKEWOOD CA   803550  12/31",
        "Amount": "-14.11",
        "Type": "DEBIT_CARD",
        "Balance": "2022.4",
        "Check or Slip #": "",
        "TransactionId": "96a7e95c9fdae4caf6182a33e3f72204"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/31/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              12/30",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "2036.51",
        "Check or Slip #": "",
        "TransactionId": "d3c701f08768d7a0b4bdada0faef51d6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/31/2018",
        "Description": "JACK IN THE BOX 0376 562-439-6798 CA         12/30",
        "Amount": "-7.67",
        "Type": "DEBIT_CARD",
        "Balance": "2073.51",
        "Check or Slip #": "",
        "TransactionId": "62d2406d7f8f63d8d1607f4cf4564582"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/28/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "364.17",
        "Type": "ACH_CREDIT",
        "Balance": "2081.18",
        "Check or Slip #": "",
        "TransactionId": "9d6a70202a913c3cc8a440fd8279db43"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/27/2018",
        "Description": "TARGET T- 950 E 33rd S Signal Hill CA        12/27",
        "Amount": "-41.86",
        "Type": "DEBIT_CARD",
        "Balance": "1717.01",
        "Check or Slip #": "",
        "TransactionId": "8ae9aec26e1b0b5481b5531e2c44636d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/27/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                12/26",
        "Amount": "-3.5",
        "Type": "DEBIT_CARD",
        "Balance": "1758.87",
        "Check or Slip #": "",
        "TransactionId": "0bb4da9eece2d22aaaf6035bec3be3bb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/27/2018",
        "Description": "BURGER KING #2119 LONG BEACH CA              12/25",
        "Amount": "-9.36",
        "Type": "DEBIT_CARD",
        "Balance": "1762.37",
        "Check or Slip #": "",
        "TransactionId": "7426bfe7915acc890b41afb0d052bf7f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              12/25",
        "Amount": "-10.5",
        "Type": "DEBIT_CARD",
        "Balance": "1771.73",
        "Check or Slip #": "",
        "TransactionId": "02bcb0c7233befd98ac22b95dfdb3a0e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2018",
        "Description": "JACK IN THE BOX 5369 CARSON CA               12/24",
        "Amount": "-7.87",
        "Type": "DEBIT_CARD",
        "Balance": "1782.23",
        "Check or Slip #": "",
        "TransactionId": "2837f81a3e987b8b822948f4a22e60b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         12/24",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1790.1",
        "Check or Slip #": "",
        "TransactionId": "30bb1bf86df2e55529291069acc87860"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/24/2018",
        "Description": "CHEVRON 0094839 LONG BEACH CA                12/23",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "1791.2",
        "Check or Slip #": "",
        "TransactionId": "83d0fa4a1636d62b78b860b47ab9bef8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/24/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                12/22",
        "Amount": "-22",
        "Type": "DEBIT_CARD",
        "Balance": "1816.2",
        "Check or Slip #": "",
        "TransactionId": "fd607f1ff20c81b0cbc95554bd83bdaa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/24/2018",
        "Description": "DOG HAUS LONG BEACH LONG BEACH CA            12/22",
        "Amount": "-12.11",
        "Type": "DEBIT_CARD",
        "Balance": "1838.2",
        "Check or Slip #": "",
        "TransactionId": "7066b2d38c0a3ee5ab660c7daf8d971c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/24/2018",
        "Description": "DEL TACO 0888 CARSON CA                      12/21",
        "Amount": "-6.34",
        "Type": "DEBIT_CARD",
        "Balance": "1850.31",
        "Check or Slip #": "",
        "TransactionId": "8d2be3fa0ba5bbcf46b78411cdd380a0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/24/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         12/21",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1856.65",
        "Check or Slip #": "",
        "TransactionId": "da0cfe2d280136f2d0180289d86287d0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/21/2018",
        "Description": "7-ELEVEN LONG BEACH CA                       12/21",
        "Amount": "-2.53",
        "Type": "DEBIT_CARD",
        "Balance": "1857.75",
        "Check or Slip #": "",
        "TransactionId": "14558d1a710d665bbb84e2b6c0e1c073"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/21/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              12/20",
        "Amount": "-65",
        "Type": "DEBIT_CARD",
        "Balance": "1860.28",
        "Check or Slip #": "",
        "TransactionId": "5055dd60ff446639f6771ec7c16e1aee"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/21/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         12/19",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "1925.28",
        "Check or Slip #": "",
        "TransactionId": "4bce693c63742fcbd8584789abf77ff9"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/21/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "366.72",
        "Type": "ACH_CREDIT",
        "Balance": "1926.23",
        "Check or Slip #": "",
        "TransactionId": "149248049b568d5342fc2a5848b5eb21"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/20/2018",
        "Description": "USPS PO 05412100 1920 LONG BEACH CA  352944  12/20",
        "Amount": "-0.55",
        "Type": "DEBIT_CARD",
        "Balance": "1559.51",
        "Check or Slip #": "",
        "TransactionId": "eeeabe4c9feb869b6d6106235bc38ff5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/18/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                12/17",
        "Amount": "-4.5",
        "Type": "DEBIT_CARD",
        "Balance": "1560.06",
        "Check or Slip #": "",
        "TransactionId": "bc3fdedaa6e63cf6812602961b10b154"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/18/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             12/16",
        "Amount": "-4.73",
        "Type": "DEBIT_CARD",
        "Balance": "1564.56",
        "Check or Slip #": "",
        "TransactionId": "5da99a5f0dcd0a2b02a8eeec11fa9e33"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/17/2018",
        "Description": "Wal-Mart Super Center LAKEWOOD CA            12/17",
        "Amount": "-12.57",
        "Type": "DEBIT_CARD",
        "Balance": "1569.29",
        "Check or Slip #": "",
        "TransactionId": "7f71920e82b76b2e9b62f059312b095e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/17/2018",
        "Description": "SQC*JON PRITCHARD 8774174551 CA              12/16",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "1581.86",
        "Check or Slip #": "",
        "TransactionId": "2bbe37bb19480d0f225ba3d9b1685a09"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/17/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                12/15",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "1585.86",
        "Check or Slip #": "",
        "TransactionId": "55455a1d71d41cd337855086dfdb19e4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/17/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                12/15",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "1587.86",
        "Check or Slip #": "",
        "TransactionId": "a3d5d457a10a4b3e30ff1832ebaa7d8f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/17/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                12/15",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1591.86",
        "Check or Slip #": "",
        "TransactionId": "f35048b4aabba1bc001860baf618facd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/17/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                12/15",
        "Amount": "-13",
        "Type": "DEBIT_CARD",
        "Balance": "1592.86",
        "Check or Slip #": "",
        "TransactionId": "f124dbf839e13bf5989f711c84157140"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/17/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                12/15",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "1605.86",
        "Check or Slip #": "",
        "TransactionId": "434a17cb64ab238569b20f2be5a079e5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/17/2018",
        "Description": "JACK IN THE BOX 5369 CARSON CA               12/15",
        "Amount": "-8.62",
        "Type": "DEBIT_CARD",
        "Balance": "1612.86",
        "Check or Slip #": "",
        "TransactionId": "3dc025c92df87395e52da5ddac4b4b08"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/17/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              12/14",
        "Amount": "-9",
        "Type": "DEBIT_CARD",
        "Balance": "1621.48",
        "Check or Slip #": "",
        "TransactionId": "c76767a5b2c76450832105afdb5bb9b0"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/14/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "300.33",
        "Type": "ACH_CREDIT",
        "Balance": "1630.48",
        "Check or Slip #": "",
        "TransactionId": "d0fbd8311b125fc633917088c9c839d7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/13/2018",
        "Description": "COLDSTONE #438 LONG BEACH CA                 12/12",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "1330.15",
        "Check or Slip #": "",
        "TransactionId": "a9ba7564030c8c1c8572bd89979aec98"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/13/2018",
        "Description": "Offer: Rubio's Coastal Grill",
        "Amount": "0.99",
        "Type": "MISC_CREDIT",
        "Balance": "1335.65",
        "Check or Slip #": "",
        "TransactionId": "c66e5225f6e8adc18df7092774c461e5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/11/2018",
        "Description": "CHEVRON 0094839 LONG BEACH CA                12/10",
        "Amount": "-21",
        "Type": "DEBIT_CARD",
        "Balance": "1334.66",
        "Check or Slip #": "",
        "TransactionId": "1804a51865a094c0f8e42838ed73d68a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2018",
        "Description": "ALDI 79047 LONG BEACH CA                     12/10",
        "Amount": "-39.15",
        "Type": "DEBIT_CARD",
        "Balance": "1355.66",
        "Check or Slip #": "",
        "TransactionId": "b6bb6fe685968676d07c498af3d748c2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2018",
        "Description": "ALDI 79047 LONG BEACH CA                     12/10",
        "Amount": "-4.78",
        "Type": "DEBIT_CARD",
        "Balance": "1394.81",
        "Check or Slip #": "",
        "TransactionId": "5da92d9401fd5572bcecfd488135e06b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2018",
        "Description": "RAMEN HUB LONG BEACH CA                      12/09",
        "Amount": "-11.47",
        "Type": "DEBIT_CARD",
        "Balance": "1399.59",
        "Check or Slip #": "",
        "TransactionId": "c0d046e97e4cde9981f071870fcbe749"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              12/09",
        "Amount": "-41",
        "Type": "DEBIT_CARD",
        "Balance": "1411.06",
        "Check or Slip #": "",
        "TransactionId": "a1900974fe34263f61892bb1b32587c5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                12/08",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "1452.06",
        "Check or Slip #": "",
        "TransactionId": "53094254198207def232c8ad5207b7ab"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2018",
        "Description": "RUBIO'S #033 LONG BEACH CA                   12/08",
        "Amount": "-9.91",
        "Type": "DEBIT_CARD",
        "Balance": "1457.06",
        "Check or Slip #": "",
        "TransactionId": "30b06ffb6b3527308e3ba679c931ee96"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             12/07",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1466.97",
        "Check or Slip #": "",
        "TransactionId": "e8359e4b1ab5d5f60cbc6a74d038396f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                12/07",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1472.48",
        "Check or Slip #": "",
        "TransactionId": "6e0723187c81fa228d416962a1ede064"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/10/2018",
        "Description": "MCDONALD'S M2368 OF C 310-410-1707 CA        12/06",
        "Amount": "-3.29",
        "Type": "DEBIT_CARD",
        "Balance": "1473.48",
        "Check or Slip #": "",
        "TransactionId": "83ab32a33e935a606d0caed4b09363d9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/07/2018",
        "Description": "LAX AIRPORT LOT P 3 LOS ANGELES CA           12/07",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "1476.77",
        "Check or Slip #": "",
        "TransactionId": "c7968fb10021a47cad551273cf99eff5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/07/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                12/06",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "1479.77",
        "Check or Slip #": "",
        "TransactionId": "80bb9e94c4c48802457a923fa03181d9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/07/2018",
        "Description": "LAX AIRPORT LOT P 1 LOS ANGELES CA           12/06",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "1499.77",
        "Check or Slip #": "",
        "TransactionId": "63e5f35ff5f759c0186de28ecf8b4d29"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/07/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "410.7",
        "Type": "ACH_CREDIT",
        "Balance": "1504.77",
        "Check or Slip #": "",
        "TransactionId": "0915a5be358c3cb882da80e284f74906"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/06/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                12/05",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1094.07",
        "Check or Slip #": "",
        "TransactionId": "08c6990844e3fe203d698c5265de638a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/06/2018",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    12/05",
        "Amount": "-5.68",
        "Type": "DEBIT_CARD",
        "Balance": "1095.07",
        "Check or Slip #": "",
        "TransactionId": "ec1576b43f88e866838215c256f7dce0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/05/2018",
        "Description": "BATH AND BODY WORKS 39 LAKEWOOD CA   649188  12/05",
        "Amount": "-15.33",
        "Type": "DEBIT_CARD",
        "Balance": "1100.75",
        "Check or Slip #": "",
        "TransactionId": "34f9f16584fb0406ea7e39540636a156"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/05/2018",
        "Description": "Kindle Unltd*M02YL6BY 866-321-8851 WA        12/04",
        "Amount": "-9.99",
        "Type": "DEBIT_CARD",
        "Balance": "1116.08",
        "Check or Slip #": "",
        "TransactionId": "1b03e43db2b0aa01daabbe566e245f26"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/05/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               12/03",
        "Amount": "-10.45",
        "Type": "DEBIT_CARD",
        "Balance": "1126.07",
        "Check or Slip #": "",
        "TransactionId": "940b0f8ba1305fd5c6683f1e14bfa70d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/05/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              12/02",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "1136.52",
        "Check or Slip #": "",
        "TransactionId": "88e76609adbac361a107078c53f3a977"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/03/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              12/02",
        "Amount": "-29",
        "Type": "DEBIT_CARD",
        "Balance": "1145.06",
        "Check or Slip #": "",
        "TransactionId": "c8dcaf72428454ce104f2bfc8fbfaf35"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/03/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               12/01",
        "Amount": "-7.92",
        "Type": "DEBIT_CARD",
        "Balance": "1174.06",
        "Check or Slip #": "",
        "TransactionId": "ee9d9987a4c7a34850df14aa04c7a7b5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/03/2018",
        "Description": "DOG HAUS LONG BEACH LONG BEACH CA            12/01",
        "Amount": "-12.11",
        "Type": "DEBIT_CARD",
        "Balance": "1181.98",
        "Check or Slip #": "",
        "TransactionId": "87b8a444c6f12dc2f8cfec05e00f162c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/03/2018",
        "Description": "SQC*TIMOTHY 8774174551 CA                    12/01",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "1194.09",
        "Check or Slip #": "",
        "TransactionId": "2b5f4034534a2b88763a8eefeebe4aa9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/03/2018",
        "Description": "SHELL Service Station TUSTIN CA      025531  12/01",
        "Amount": "-25.04",
        "Type": "DEBIT_CARD",
        "Balance": "1199.09",
        "Check or Slip #": "",
        "TransactionId": "d3e16cfd8785306d3a845a871a4e5fce"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/30/2018",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-102.72",
        "Type": "ACH_DEBIT",
        "Balance": "1224.13",
        "Check or Slip #": "",
        "TransactionId": "7e62cf0aa1e78eb4a458b549162543b8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/30/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/29",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1326.85",
        "Check or Slip #": "",
        "TransactionId": "5288299002aa106ab1c263fc662af18c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/30/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/29",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "1327.85",
        "Check or Slip #": "",
        "TransactionId": "c56468cd697df9e362576a6260e0a355"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/30/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "288.94",
        "Type": "ACH_CREDIT",
        "Balance": "1332.85",
        "Check or Slip #": "",
        "TransactionId": "5611bc7cb4e3b30caade5ccf95f658e7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/28",
        "Amount": "-1.25",
        "Type": "DEBIT_CARD",
        "Balance": "1043.91",
        "Check or Slip #": "",
        "TransactionId": "bff63022fde4597f74c970463d68b091"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/28",
        "Amount": "-2.5",
        "Type": "DEBIT_CARD",
        "Balance": "1045.16",
        "Check or Slip #": "",
        "TransactionId": "fd673bce9ec3fae63025edf33e4503e6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              11/26",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "1047.66",
        "Check or Slip #": "",
        "TransactionId": "e7b0b7f03c9128a06628232bd05fc152"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/28/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/27",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "1056.2",
        "Check or Slip #": "",
        "TransactionId": "945f6a64d9d6f1d634610468691e5896"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/28/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/27",
        "Amount": "-15",
        "Type": "DEBIT_CARD",
        "Balance": "1062.2",
        "Check or Slip #": "",
        "TransactionId": "f927d9281a2ad20bea5a578e98cee82f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/26/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/25",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "1077.2",
        "Check or Slip #": "",
        "TransactionId": "546b69c33b5bd5a270d69e346f49500e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/26/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              11/25",
        "Amount": "-28",
        "Type": "DEBIT_CARD",
        "Balance": "1089.2",
        "Check or Slip #": "",
        "TransactionId": "490162a306fb3bbad6668b7373d93636"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/26/2018",
        "Description": "TST* JENI S SPLENDID I LOS ANGELES CA        11/25",
        "Amount": "-6.5",
        "Type": "DEBIT_CARD",
        "Balance": "1117.2",
        "Check or Slip #": "",
        "TransactionId": "45eab71ae36819b037a75ba8b11ca78c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/26/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              11/24",
        "Amount": "-12.5",
        "Type": "DEBIT_CARD",
        "Balance": "1123.7",
        "Check or Slip #": "",
        "TransactionId": "4a764aec37a69becac0d8818bb0733f0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/26/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             11/24",
        "Amount": "-3.96",
        "Type": "DEBIT_CARD",
        "Balance": "1136.2",
        "Check or Slip #": "",
        "TransactionId": "f9c87681f4b233179737ca763e55badc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/26/2018",
        "Description": "JACK IN THE BOX 5369 CARSON CA               11/23",
        "Amount": "-5.99",
        "Type": "DEBIT_CARD",
        "Balance": "1140.16",
        "Check or Slip #": "",
        "TransactionId": "ae278bff151704719bd09142950ac5bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/23/2018",
        "Description": "ATM WITHDRAWAL                       006310  11/233901 ATLA",
        "Amount": "-250",
        "Type": "ATM",
        "Balance": "1146.15",
        "Check or Slip #": "",
        "TransactionId": "bebdfb64099b6539c77f28da1c34a033"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/23/2018",
        "Description": "7-ELEVEN LONG BEACH CA                       11/22",
        "Amount": "-3.54",
        "Type": "DEBIT_CARD",
        "Balance": "1396.15",
        "Check or Slip #": "",
        "TransactionId": "b86ae210143629fd1c7ff5d7a2ef97eb"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/23/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "280.64",
        "Type": "ACH_CREDIT",
        "Balance": "1399.69",
        "Check or Slip #": "",
        "TransactionId": "d73303b85296c5e4463f824a242ade69"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/21/2018",
        "Description": "TACOS SAN PEDRO HAWAIIAN GARD CA             11/21",
        "Amount": "-10.28",
        "Type": "DEBIT_CARD",
        "Balance": "1119.05",
        "Check or Slip #": "",
        "TransactionId": "00ba4469f726384cab1036b9f9f4ab57"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2018",
        "Description": "CHEVRON 0094839 LONG BEACH CA                11/19",
        "Amount": "-25.02",
        "Type": "DEBIT_CARD",
        "Balance": "1129.33",
        "Check or Slip #": "",
        "TransactionId": "1e9b21852e7f316a053517f49bb1aa17"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              11/17",
        "Amount": "-9.27",
        "Type": "DEBIT_CARD",
        "Balance": "1154.35",
        "Check or Slip #": "",
        "TransactionId": "a76f8e2e5c2fd9075c78f4a88188d83f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              11/17",
        "Amount": "-6.75",
        "Type": "DEBIT_CARD",
        "Balance": "1163.62",
        "Check or Slip #": "",
        "TransactionId": "46abf5c452656c873bee81bfb33cab01"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/18",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1170.37",
        "Check or Slip #": "",
        "TransactionId": "6495fca540567ca27a7ebf523d143463"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/18",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "1171.37",
        "Check or Slip #": "",
        "TransactionId": "b1bd28bc3764068f1fd4a33a8d1b18e3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              11/18",
        "Amount": "-38",
        "Type": "DEBIT_CARD",
        "Balance": "1181.37",
        "Check or Slip #": "",
        "TransactionId": "dbd02fe8fb00f027a74dc78555b6f135"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2018",
        "Description": "LIME TEMP HOLD 8778877815 CA                 11/17",
        "Amount": "-3.85",
        "Type": "DEBIT_CARD",
        "Balance": "1219.37",
        "Check or Slip #": "",
        "TransactionId": "bc547f5677026eb42bc4b90ff1b09e2a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/17",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1223.22",
        "Check or Slip #": "",
        "TransactionId": "408d219d1562365a4d4048509f0aa364"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/17",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "1224.22",
        "Check or Slip #": "",
        "TransactionId": "5ea0942c4a6138b8dd45a98b37f4165e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/17",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1229.22",
        "Check or Slip #": "",
        "TransactionId": "c80ecab45b1699f17e7f2eabf76e8ac6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2018",
        "Description": "MCDONALD'S F5227 BELLFLOWER CA               11/17",
        "Amount": "-3.7",
        "Type": "DEBIT_CARD",
        "Balance": "1230.22",
        "Check or Slip #": "",
        "TransactionId": "30a2097dd0c1c05e7405624683be27fc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/17",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1233.92",
        "Check or Slip #": "",
        "TransactionId": "ad537c187dd15d35a7f2e253a3a8656c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/19/2018",
        "Description": "SQC*Jeremy Board VISA DIRECT CA      269846  11/18",
        "Amount": "5.53",
        "Type": "DEBIT_CARD",
        "Balance": "1234.92",
        "Check or Slip #": "",
        "TransactionId": "2bc195c77191fbdd8f147ec71efcb801"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/19/2018",
        "Description": "PAYPAL           TRANSFER                   PPD ID: PAYPALSD11",
        "Amount": "54.99",
        "Type": "ACH_CREDIT",
        "Balance": "1229.39",
        "Check or Slip #": "",
        "TransactionId": "9e8fa206fbcb6c9b819913ec02918dd1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/16/2018",
        "Description": "JAMBA JUICE 1597 QSR LONG BEACH CA           11/15",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1174.4",
        "Check or Slip #": "",
        "TransactionId": "c9128f5e25721b79619ecd53803472d8"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/16/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "375.74",
        "Type": "ACH_CREDIT",
        "Balance": "1175.4",
        "Check or Slip #": "",
        "TransactionId": "af2dd0d7ac00be4a12564120daa5dce6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/14/2018",
        "Description": "PACIFIC BAPTIST CHURCH LONG BEACH CA         11/09",
        "Amount": "-18.5",
        "Type": "DEBIT_CARD",
        "Balance": "799.66",
        "Check or Slip #": "",
        "TransactionId": "4da702bd4844754e7f7afa72563972d9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2018",
        "Description": "TARGET T- 950 E 33rd S Signal Hill CA        11/12",
        "Amount": "-56.31",
        "Type": "DEBIT_CARD",
        "Balance": "818.16",
        "Check or Slip #": "",
        "TransactionId": "460ac51d3c1608c2acc1ba6c394c6657"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2018",
        "Description": "TACO BELL 4636 LONG BEACH CA                 11/12",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "874.47",
        "Check or Slip #": "",
        "TransactionId": "05599a2bb86c455f2b979c5b2020fa9f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2018",
        "Description": "SQ *LONG BEACH - FROSTB Long Beach CA        11/12",
        "Amount": "-4.2",
        "Type": "DEBIT_CARD",
        "Balance": "879.98",
        "Check or Slip #": "",
        "TransactionId": "d6325003da7b348affe6116a0e768a92"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              11/11",
        "Amount": "-39",
        "Type": "DEBIT_CARD",
        "Balance": "884.18",
        "Check or Slip #": "",
        "TransactionId": "8965cef37304a41b92f964b7cacdf3db"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2018",
        "Description": "BURGER KING #2119 LONG BEACH CA              11/10",
        "Amount": "-10.12",
        "Type": "DEBIT_CARD",
        "Balance": "923.18",
        "Check or Slip #": "",
        "TransactionId": "3bf6d669158b9fb869b3371a0a3f156f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2018",
        "Description": "BEST BUY      00011197 SIGNAL HILL CA        11/10",
        "Amount": "-153.29",
        "Type": "DEBIT_CARD",
        "Balance": "933.3",
        "Check or Slip #": "",
        "TransactionId": "460c9345a7ac47adfa8bce2ca044440e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2018",
        "Description": "COSTCO WHSE #0424 SIGNAL HILL CA     527295  11/10",
        "Amount": "-1.64",
        "Type": "DEBIT_CARD",
        "Balance": "1086.59",
        "Check or Slip #": "",
        "TransactionId": "606db961096a11c507e0e60b99dd6a23"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2018",
        "Description": "SQC*JON PRITCHARD 8774174551 CA              11/10",
        "Amount": "-2.5",
        "Type": "DEBIT_CARD",
        "Balance": "1088.23",
        "Check or Slip #": "",
        "TransactionId": "82aeb800c9c93799c24740f3656226b8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/09",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1090.73",
        "Check or Slip #": "",
        "TransactionId": "e9d7192e29cdd1079507d0de2b0bc11f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/09",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1091.73",
        "Check or Slip #": "",
        "TransactionId": "d9bbb7263e1c28e981e4ad44fe300d3d"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/09/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "382.5",
        "Type": "ACH_CREDIT",
        "Balance": "1092.73",
        "Check or Slip #": "",
        "TransactionId": "9ef456cbaec6179b92148d10ad9fa5d2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/08/2018",
        "Description": "RIVERT LTD       IAT PAYPAL 1004212220480   WEB ID: 770510487C",
        "Amount": "-54.99",
        "Type": "ACH_DEBIT",
        "Balance": "710.23",
        "Check or Slip #": "",
        "TransactionId": "180e7b1dbf89b603806a2dfef307601c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/08/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/07",
        "Amount": "-1.05",
        "Type": "DEBIT_CARD",
        "Balance": "765.22",
        "Check or Slip #": "",
        "TransactionId": "151f13dca86c8a8a55dfebc0d4da1dcb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/08/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/07",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "766.27",
        "Check or Slip #": "",
        "TransactionId": "7f669c9940692921b705584e55b6fb6b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/08/2018",
        "Description": "ARBY'S 1314 LONG BEACH CA                    11/07",
        "Amount": "-2.41",
        "Type": "DEBIT_CARD",
        "Balance": "768.27",
        "Check or Slip #": "",
        "TransactionId": "58a47b9629b385d452958ac3575f4187"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2018",
        "Description": "CHEVRON 0380629 LONG BEACH CA                11/05",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "770.68",
        "Check or Slip #": "",
        "TransactionId": "6df5b825ed662c611d4b4c1c4a1dab93"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2018",
        "Description": "SQC*TIMOTHY 8774174551 CA                    11/05",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "800.68",
        "Check or Slip #": "",
        "TransactionId": "b0d3221a187fce3f2033f6f54a51b3e4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2018",
        "Description": "WM SUPERC Wal-Mart Sup LAKEWOOD CA           11/05",
        "Amount": "-51.72",
        "Type": "DEBIT_CARD",
        "Balance": "805.68",
        "Check or Slip #": "",
        "TransactionId": "70963806c661ef499b0132717d3936a7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2018",
        "Description": "SQC*JAMES RALL 8774174551 CA                 11/04",
        "Amount": "-15",
        "Type": "DEBIT_CARD",
        "Balance": "857.4",
        "Check or Slip #": "",
        "TransactionId": "cfaa92f8c0972049c6f27ad453cc82c8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              11/04",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "872.4",
        "Check or Slip #": "",
        "TransactionId": "5789e64ad8fb2cd60c5aaea1803eebb1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/03",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "908.4",
        "Check or Slip #": "",
        "TransactionId": "66012af8a8920751a73497284e75129f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/03",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "909.4",
        "Check or Slip #": "",
        "TransactionId": "efe5778f8d375821a6950f5af273b955"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2018",
        "Description": "TACO BELL #28513 LONG BEACH CA               11/03",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "912.4",
        "Check or Slip #": "",
        "TransactionId": "c575f86d7cb257c4c054bfc857b6ad9c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/02",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "917.91",
        "Check or Slip #": "",
        "TransactionId": "384020bc7428c75a292c0b4bd7ade950"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/02",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "927.91",
        "Check or Slip #": "",
        "TransactionId": "263314861f875af3d73e45d368391f9b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/05/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               11/01",
        "Amount": "-9.36",
        "Type": "DEBIT_CARD",
        "Balance": "929.01",
        "Check or Slip #": "",
        "TransactionId": "e87a97b77cc382c5c793dc990a236e1d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/02/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                11/01",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "938.37",
        "Check or Slip #": "",
        "TransactionId": "3b83678a8433358c9231da9c5a1d55ed"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/02/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "354.08",
        "Type": "ACH_CREDIT",
        "Balance": "939.47",
        "Check or Slip #": "",
        "TransactionId": "b048a9d9325efef079c573f5acaa25df"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/01/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         11/01",
        "Amount": "-8.99",
        "Type": "DEBIT_CARD",
        "Balance": "585.39",
        "Check or Slip #": "",
        "TransactionId": "f6891bd940ecfbce1c2ad2958eaaa125"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/01/2018",
        "Description": "SQC*Jeremy Board VISA DIRECT CA      270403  11/01",
        "Amount": "9.93",
        "Type": "DEBIT_CARD",
        "Balance": "594.38",
        "Check or Slip #": "",
        "TransactionId": "07fe3c9f93aaeb8a926cae69bd823e39"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/31/2018",
        "Description": "SQC*BENJAMIN 8774174551 CA                   10/30",
        "Amount": "-8.6",
        "Type": "DEBIT_CARD",
        "Balance": "584.45",
        "Check or Slip #": "",
        "TransactionId": "4244d86464f006b369ef32a882158aa1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2018",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-102.72",
        "Type": "ACH_DEBIT",
        "Balance": "593.05",
        "Check or Slip #": "",
        "TransactionId": "6bc8f6eb3386c115c474473e3ae9f6b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2018",
        "Description": "VONS     Store  3519 LONG BEACH CA           10/29",
        "Amount": "-31.65",
        "Type": "DEBIT_CARD",
        "Balance": "695.77",
        "Check or Slip #": "",
        "TransactionId": "e9d3a2f718c55e28bdbfd1f1c98710a7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              10/28",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "727.42",
        "Check or Slip #": "",
        "TransactionId": "3ad2804e499a364e152b364051b48418"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2018",
        "Description": "TST* JENI S SPLENDID I LOS ANGELES CA        10/28",
        "Amount": "-7.75",
        "Type": "DEBIT_CARD",
        "Balance": "764.42",
        "Check or Slip #": "",
        "TransactionId": "c05895fca53ce4ef6a7dae1e8dd0d82d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              10/27",
        "Amount": "-18",
        "Type": "DEBIT_CARD",
        "Balance": "772.17",
        "Check or Slip #": "",
        "TransactionId": "01120ab8ac7abaed22fd7cdd596ba7f9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2018",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               10/27",
        "Amount": "-5.28",
        "Type": "DEBIT_CARD",
        "Balance": "790.17",
        "Check or Slip #": "",
        "TransactionId": "ef333b82d1c9e98e1bf8997c8f39811c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/29/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         10/26",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "795.45",
        "Check or Slip #": "",
        "TransactionId": "2ee9c8e6b7f86e62a3ba81860cd45775"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/26/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         10/24",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "796.55",
        "Check or Slip #": "",
        "TransactionId": "17cdcb6d834ff339cb062d54d9364f9b"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/26/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "362.78",
        "Type": "ACH_CREDIT",
        "Balance": "797.65",
        "Check or Slip #": "",
        "TransactionId": "d453d00e3327ea0107f925cddeefa4a8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2018",
        "Description": "DEL TACO 0888 CARSON CA                      10/24",
        "Amount": "-5.55",
        "Type": "DEBIT_CARD",
        "Balance": "434.87",
        "Check or Slip #": "",
        "TransactionId": "f6f9a60b22115bd4b2d675aea2fcf735"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/24/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                10/23",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "440.42",
        "Check or Slip #": "",
        "TransactionId": "7994a37313dd860cf098182181d3c94b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/23/2018",
        "Description": "ARBY'S 1314 LONG BEACH CA                    10/22",
        "Amount": "-7.16",
        "Type": "DEBIT_CARD",
        "Balance": "475.42",
        "Check or Slip #": "",
        "TransactionId": "57ce6228c04a7468fee3ee889c6fecc8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2018",
        "Description": "VONS     Store  3519 LONG BEACH CA           10/22",
        "Amount": "-23.11",
        "Type": "DEBIT_CARD",
        "Balance": "482.58",
        "Check or Slip #": "",
        "TransactionId": "b8e46cb527f1d948d76f4168abda7451"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              10/21",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "505.69",
        "Check or Slip #": "",
        "TransactionId": "70ceafe042567c4ffdbb68542c92a968"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2018",
        "Description": "ATM WITHDRAWAL                       004672  10/213840 MART",
        "Amount": "-100",
        "Type": "ATM",
        "Balance": "525.69",
        "Check or Slip #": "",
        "TransactionId": "d161f2fcf72649c07014251a1469918d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2018",
        "Description": "RITE AID STORE - 6371 LONG BEACH CA  574033  10/20",
        "Amount": "-1.99",
        "Type": "DEBIT_CARD",
        "Balance": "625.69",
        "Check or Slip #": "",
        "TransactionId": "89cb8133fb5f9f002e6fa020c73e0349"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                10/20",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "627.68",
        "Check or Slip #": "",
        "TransactionId": "fa19c28079b6997a8f3ec3b7bf3604ad"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2018",
        "Description": "JACK IN THE BOX 0376 LONG BEACH CA           10/20",
        "Amount": "-8.26",
        "Type": "DEBIT_CARD",
        "Balance": "631.68",
        "Check or Slip #": "",
        "TransactionId": "539ba988b8ca32a2d426ec5b56002d87"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2018",
        "Description": "CHEVRON 0094839 LONG BEACH CA                10/20",
        "Amount": "-30.05",
        "Type": "DEBIT_CARD",
        "Balance": "639.94",
        "Check or Slip #": "",
        "TransactionId": "489dafa874e957ed1b9fcc68d5deb03e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2018",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               10/20",
        "Amount": "-4.63",
        "Type": "DEBIT_CARD",
        "Balance": "669.99",
        "Check or Slip #": "",
        "TransactionId": "819422ac8c155e4da17fbdb0daaa9276"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                10/19",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "674.62",
        "Check or Slip #": "",
        "TransactionId": "c274d3a62a8631630f401cf7b239052e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                10/19",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "675.62",
        "Check or Slip #": "",
        "TransactionId": "400376f587e3f3aee7ce0d891d9fb561"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                10/19",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "676.62",
        "Check or Slip #": "",
        "TransactionId": "6d35f7e7a6d73255fb99837b405186fb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/22/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         10/19",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "681.62",
        "Check or Slip #": "",
        "TransactionId": "7ea03d80fe74d7d5f887510330b2a10b"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/19/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "219.86",
        "Type": "ACH_CREDIT",
        "Balance": "682.57",
        "Check or Slip #": "",
        "TransactionId": "a3a19b15d90598e1fad19440903a01ba"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/17/2018",
        "Description": "TACO BELL #003135 LONG BEACH CA              10/16",
        "Amount": "-6.38",
        "Type": "DEBIT_CARD",
        "Balance": "462.71",
        "Check or Slip #": "",
        "TransactionId": "cccf67feb912c19e324cce64b173ab30"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/17/2018",
        "Description": "JACK IN THE BOX 5369 CARSON CA               10/15",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "469.09",
        "Check or Slip #": "",
        "TransactionId": "6780efaa24ff29dd63ef9b1406aaaf90"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/16/2018",
        "Description": "ALDI 79047 LONG BEACH CA             640458  10/16",
        "Amount": "-28.1",
        "Type": "DEBIT_CARD",
        "Balance": "476.09",
        "Check or Slip #": "",
        "TransactionId": "53201e994742db087df33461320e7337"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2018",
        "Description": "SQ *LONG BEACH - FROSTB Long Beach CA        10/15",
        "Amount": "-4.9",
        "Type": "DEBIT_CARD",
        "Balance": "504.19",
        "Check or Slip #": "",
        "TransactionId": "02dac64b074ab1af3ccd8669f2db4ef2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2018",
        "Description": "CHEVRON/CSI-210096/192 LONG BEACH CA 090051  10/14",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "509.09",
        "Check or Slip #": "",
        "TransactionId": "ec1a7a35aa8215cefe32d4e3d112718c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              10/14",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "534.09",
        "Check or Slip #": "",
        "TransactionId": "cd1e8a59a8b19411384fc2a64657885f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/15/2018",
        "Description": "PACIFIC BAPTIST CHURCH LONG BEACH CA         10/12",
        "Amount": "-1151",
        "Type": "DEBIT_CARD",
        "Balance": "564.09",
        "Check or Slip #": "",
        "TransactionId": "1f7ff27a31dac43d01ad320107b3ec0b"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/15/2018",
        "Description": "QuickPay with Zelle payment from ETHAN H ROJO RIVAS 7574275970",
        "Amount": "5",
        "Type": "QUICKPAY_CREDIT",
        "Balance": "1715.09",
        "Check or Slip #": "",
        "TransactionId": "44ac21745b0a9471535702a1ce7c2908"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/15/2018",
        "Description": "QuickPay with Zelle payment from ETHAN H ROJO RIVAS 7574279100",
        "Amount": "130",
        "Type": "QUICKPAY_CREDIT",
        "Balance": "1710.09",
        "Check or Slip #": "",
        "TransactionId": "132ce38f86fafcb2cb794ef5589020b5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/12/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         10/11",
        "Amount": "-1.9",
        "Type": "DEBIT_CARD",
        "Balance": "1580.09",
        "Check or Slip #": "",
        "TransactionId": "108afd631b509b7b590aa17fb7fa99a0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/12/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         10/10",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "1581.99",
        "Check or Slip #": "",
        "TransactionId": "ca920701bd7c3ad5d81787ef9f6f2991"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/12/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "297.23",
        "Type": "ACH_CREDIT",
        "Balance": "1582.94",
        "Check or Slip #": "",
        "TransactionId": "f95d816e5da5302ae6761d4e0b75bd48"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/11/2018",
        "Description": "PAYPAL           TRANSFER   4Z3J2ALRY6FVU   WEB ID: PAYPALSD22",
        "Amount": "-1.1",
        "Type": "ACH_DEBIT",
        "Balance": "1285.71",
        "Check or Slip #": "",
        "TransactionId": "de26cec120e150d69ace77eb5df04ffd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/10/2018",
        "Description": "YOGURTLAND CA304 LONG BEACH CA               10/09",
        "Amount": "-10.04",
        "Type": "DEBIT_CARD",
        "Balance": "1286.81",
        "Check or Slip #": "",
        "TransactionId": "743c0e6129cc65dec588dbc5dfbc530a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/10/2018",
        "Description": "TACO BELL #003135 LONG BEACH CA              10/09",
        "Amount": "-14.09",
        "Type": "DEBIT_CARD",
        "Balance": "1296.85",
        "Check or Slip #": "",
        "TransactionId": "b8e35830e297645b69451e3edb4dbc04"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/09/2018",
        "Description": "ALDI 79047 LONG BEACH CA             775508  10/09",
        "Amount": "-14.4",
        "Type": "DEBIT_CARD",
        "Balance": "1310.94",
        "Check or Slip #": "",
        "TransactionId": "8cc31671721b64e5acc8ac2109ef04a8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/09/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              10/07",
        "Amount": "-40",
        "Type": "DEBIT_CARD",
        "Balance": "1325.34",
        "Check or Slip #": "",
        "TransactionId": "21c30d1fa2db69313069422fbf8c003d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/09/2018",
        "Description": "ABM PARKING LONG BEACH LONG BEACH CA         10/06",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "1365.34",
        "Check or Slip #": "",
        "TransactionId": "071fe6a6dff3af9e70608d4a8010e895"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/09/2018",
        "Description": "DUNKIN #352586 Q35 WESTMINSTER CA            10/06",
        "Amount": "-1.13",
        "Type": "DEBIT_CARD",
        "Balance": "1367.34",
        "Check or Slip #": "",
        "TransactionId": "2ab8b86fdff74f95f42a768c01f7fc71"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/09/2018",
        "Description": "7-ELEVEN LONG BEACH CA                       10/06",
        "Amount": "-3.04",
        "Type": "DEBIT_CARD",
        "Balance": "1368.47",
        "Check or Slip #": "",
        "TransactionId": "c5996cf2f864ca71314dc3570c383ee1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/09/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               10/05",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1371.51",
        "Check or Slip #": "",
        "TransactionId": "afb471c9ad05054af72783968ab56cb1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/09/2018",
        "Description": "CHEVRON 0094839 LONG BEACH CA                10/05",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "1377.02",
        "Check or Slip #": "",
        "TransactionId": "350585e3f5481723fc410e5a09c7add3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/09/2018",
        "Description": "JACK IN THE BOX 5369 CARSON CA               10/05",
        "Amount": "-7.87",
        "Type": "DEBIT_CARD",
        "Balance": "1412.02",
        "Check or Slip #": "",
        "TransactionId": "7e93f9ffdb5c94cbea83369167dab9ec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/05/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         10/05",
        "Amount": "-9.58",
        "Type": "DEBIT_CARD",
        "Balance": "1419.89",
        "Check or Slip #": "",
        "TransactionId": "220e8d75f145ce9229345ad368148a12"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/05/2018",
        "Description": "PAYPAL           TRANSFER                   PPD ID: PAYPALSD11",
        "Amount": "25",
        "Type": "ACH_CREDIT",
        "Balance": "1429.47",
        "Check or Slip #": "",
        "TransactionId": "f47bb338c8839f2169781156e6e8a0b9"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "10/05/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "392.3",
        "Type": "ACH_CREDIT",
        "Balance": "1404.47",
        "Check or Slip #": "",
        "TransactionId": "a6eed41acfb8b24d78cd6dbcdac8f6c5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/04/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         10/02",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1012.17",
        "Check or Slip #": "",
        "TransactionId": "6a7d5abb04cd75b2db4709bae581f92e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/03/2018",
        "Description": "TACO BELL #003135 LONG BEACH CA              10/02",
        "Amount": "-6.38",
        "Type": "DEBIT_CARD",
        "Balance": "1013.27",
        "Check or Slip #": "",
        "TransactionId": "21b14d03a32251128299de0ae6421f5d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/03/2018",
        "Description": "JACK IN THE BOX 0376 LONG BEACH CA           10/01",
        "Amount": "-10.01",
        "Type": "DEBIT_CARD",
        "Balance": "1019.65",
        "Check or Slip #": "",
        "TransactionId": "5b73ccfd4186f16d3bd1b30ec74c03c3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/02/2018",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-102.72",
        "Type": "ACH_DEBIT",
        "Balance": "1029.66",
        "Check or Slip #": "",
        "TransactionId": "4cfc06d36e20a8e53bc5591fd352a591"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/02/2018",
        "Description": "ALDI 79047 LONG BEACH CA             684669  10/02",
        "Amount": "-12.11",
        "Type": "DEBIT_CARD",
        "Balance": "1132.38",
        "Check or Slip #": "",
        "TransactionId": "9f6c1abf2167c60edc8dabc8b43a5d64"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/02/2018",
        "Description": "7-ELEVEN LONG BEACH CA                       10/01",
        "Amount": "-2.87",
        "Type": "DEBIT_CARD",
        "Balance": "1144.49",
        "Check or Slip #": "",
        "TransactionId": "2413cb8b8f5fa367c281b9e1b148780f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/02/2018",
        "Description": "SQC*TIMOTHY 8774174551 CA                    10/01",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "1147.36",
        "Check or Slip #": "",
        "TransactionId": "d2c56eb1507ce5cee8acc06900045885"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/02/2018",
        "Description": "MCDONALD'S F18637 PARAMOUNT CA               09/30",
        "Amount": "-5.25",
        "Type": "DEBIT_CARD",
        "Balance": "1152.36",
        "Check or Slip #": "",
        "TransactionId": "2ee9ec3a770e0d5b576c926d36f6ec14"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/02/2018",
        "Description": "LITTLE CAESARS 5941 LONG BEACH CA            09/30",
        "Amount": "-16.53",
        "Type": "DEBIT_CARD",
        "Balance": "1157.61",
        "Check or Slip #": "",
        "TransactionId": "0e1b88bcdf85f3c20578fbd13eb48966"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2018",
        "Description": "WITHDRAWAL 10/01",
        "Amount": "-500",
        "Type": "MISC_DEBIT",
        "Balance": "1174.14",
        "Check or Slip #": "",
        "TransactionId": "6092c3a3f6287fcfb2d669b459c52a6e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2018",
        "Description": "ATM WITHDRAWAL                       008109  10/013901 ATLA",
        "Amount": "-1000",
        "Type": "ATM",
        "Balance": "1674.14",
        "Check or Slip #": "",
        "TransactionId": "2e23183d79b947a02eade3af5071157b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2018",
        "Description": "CHIPOTLE 1511 SEAL BEACH CA                  09/30",
        "Amount": "-7.54",
        "Type": "DEBIT_CARD",
        "Balance": "2674.14",
        "Check or Slip #": "",
        "TransactionId": "303c9a99b356c867c21bfed08a15038b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              09/30",
        "Amount": "-34",
        "Type": "DEBIT_CARD",
        "Balance": "2681.68",
        "Check or Slip #": "",
        "TransactionId": "0c3b8b59f6978c00e466134d1066efc7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2018",
        "Description": "HONG KONG EXPRESS LONG BEACH CA              09/29",
        "Amount": "-8.19",
        "Type": "DEBIT_CARD",
        "Balance": "2715.68",
        "Check or Slip #": "",
        "TransactionId": "7d7ad6d846baad9c78bda1dfbffbc283"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2018",
        "Description": "CHEVRON/JB STATION, IN LONG BEACH CA 019387  09/29",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "2723.87",
        "Check or Slip #": "",
        "TransactionId": "18cc1d8680a13993acf113492e3cbc69"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2018",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               09/29",
        "Amount": "-2.21",
        "Type": "DEBIT_CARD",
        "Balance": "2758.87",
        "Check or Slip #": "",
        "TransactionId": "fe53ca2a55468fcb13ec4e3438857c20"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2018",
        "Description": "CHICK-FIL-A #02806 TORRANCE CA               09/28",
        "Amount": "-8.2",
        "Type": "DEBIT_CARD",
        "Balance": "2761.08",
        "Check or Slip #": "",
        "TransactionId": "ae678459080b9052bf9e13f82d9c0683"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/01/2018",
        "Description": "JACK IN THE BOX 5369 CARSON CA               09/27",
        "Amount": "-4.7",
        "Type": "DEBIT_CARD",
        "Balance": "2769.28",
        "Check or Slip #": "",
        "TransactionId": "dae7c316b86f731b196ef1c6fb1d099e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         09/27",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2773.98",
        "Check or Slip #": "",
        "TransactionId": "800e1814e5180cf799b95fa0d86db01e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         09/26",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2775.08",
        "Check or Slip #": "",
        "TransactionId": "e7dadab5a0299b7fc6ac0687eb3d8b98"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/28/2018",
        "Description": "RALLY'S LONG BEACH CA                        09/26",
        "Amount": "-4.56",
        "Type": "DEBIT_CARD",
        "Balance": "2776.18",
        "Check or Slip #": "",
        "TransactionId": "eabbe0371c1241b7302faba23fb3460a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/28/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "331.53",
        "Type": "ACH_CREDIT",
        "Balance": "2780.74",
        "Check or Slip #": "",
        "TransactionId": "4dc781dd32e755814a851535edf0d411"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/27/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         09/25",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2449.21",
        "Check or Slip #": "",
        "TransactionId": "44c196ffe9dead3494495c9f777497f7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/25/2018",
        "Description": "TACO BELL #003135 LONG BEACH CA              09/24",
        "Amount": "-6.38",
        "Type": "DEBIT_CARD",
        "Balance": "2450.31",
        "Check or Slip #": "",
        "TransactionId": "42fdca0b99d2916d1ea8effffc1bca75"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/25/2018",
        "Description": "BURGER KING #2119 LONG BEACH CA              09/23",
        "Amount": "-9.25",
        "Type": "DEBIT_CARD",
        "Balance": "2456.69",
        "Check or Slip #": "",
        "TransactionId": "a57152ebae86e86227192ff244ef377e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/25/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              09/22",
        "Amount": "-17.08",
        "Type": "DEBIT_CARD",
        "Balance": "2465.94",
        "Check or Slip #": "",
        "TransactionId": "268671e8247e1488999ec57596c0b21c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/24/2018",
        "Description": "ALDI 79047 LONG BEACH CA             949253  09/24",
        "Amount": "-31.47",
        "Type": "DEBIT_CARD",
        "Balance": "2483.02",
        "Check or Slip #": "",
        "TransactionId": "807fc66310cef5032945828c6fb8aa09"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/24/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              09/23",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "2514.49",
        "Check or Slip #": "",
        "TransactionId": "6efaa3df9d43c3868183b85e345e0882"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/24/2018",
        "Description": "CHEVRON/CSI-210096/192 LONG BEACH CA 018533  09/22",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "2551.49",
        "Check or Slip #": "",
        "TransactionId": "1a181d7c160db51702379410f15db76a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/24/2018",
        "Description": "ROSS STORE 432 LONG BEACH CA                 09/22",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "2586.49",
        "Check or Slip #": "",
        "TransactionId": "903538126e452fcfded55371578405c5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/24/2018",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               09/22",
        "Amount": "-2.21",
        "Type": "DEBIT_CARD",
        "Balance": "2591.99",
        "Check or Slip #": "",
        "TransactionId": "2a8a9f33290d359eb9e4e3277498f9bb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/21/2018",
        "Description": "ATM WITHDRAWAL                       002793  09/213520 W CE",
        "Amount": "-115",
        "Type": "ATM",
        "Balance": "2594.2",
        "Check or Slip #": "",
        "TransactionId": "42a28bd481c07e494e822b43917b657c"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/21/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "362.78",
        "Type": "ACH_CREDIT",
        "Balance": "2709.2",
        "Check or Slip #": "",
        "TransactionId": "08d11b7fa1218b9cf69a4bc77f263d01"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/18/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               09/16",
        "Amount": "-10.67",
        "Type": "DEBIT_CARD",
        "Balance": "2346.42",
        "Check or Slip #": "",
        "TransactionId": "38fbbedd9d3fcb565f1bb15481f5bb15"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/18/2018",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               09/16",
        "Amount": "-5.83",
        "Type": "DEBIT_CARD",
        "Balance": "2357.09",
        "Check or Slip #": "",
        "TransactionId": "e430985bf839829f8fc769361f1ce770"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2018",
        "Description": "VONS     Store  3519 LONG BEACH CA           09/17",
        "Amount": "-8.49",
        "Type": "DEBIT_CARD",
        "Balance": "2362.92",
        "Check or Slip #": "",
        "TransactionId": "b497b4c20c4fe408dab17e1870c088b8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2018",
        "Description": "ALDI 79047 LONG BEACH CA             706076  09/17",
        "Amount": "-34.31",
        "Type": "DEBIT_CARD",
        "Balance": "2371.41",
        "Check or Slip #": "",
        "TransactionId": "01e234d2ef605a1d16a83e850299cdfe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              09/16",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "2405.72",
        "Check or Slip #": "",
        "TransactionId": "064dde9d7a9bd2ce40c4aa445e50fdd0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2018",
        "Description": "BURGER KING #2119 LONG BEACH CA              09/15",
        "Amount": "-11.88",
        "Type": "DEBIT_CARD",
        "Balance": "2435.72",
        "Check or Slip #": "",
        "TransactionId": "e2d4e21ff7d86a0fbea06723298327fa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2018",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               09/15",
        "Amount": "-2.21",
        "Type": "DEBIT_CARD",
        "Balance": "2447.6",
        "Check or Slip #": "",
        "TransactionId": "b85ac10b39ce90a506eb07f333b37fb3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2018",
        "Description": "CHEVRON 0202022 TUSTIN CA                    09/15",
        "Amount": "-32.02",
        "Type": "DEBIT_CARD",
        "Balance": "2449.81",
        "Check or Slip #": "",
        "TransactionId": "2d167a37c72ec7d29de1e63ed3b2f3af"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2018",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    09/14",
        "Amount": "-14.22",
        "Type": "DEBIT_CARD",
        "Balance": "2481.83",
        "Check or Slip #": "",
        "TransactionId": "853a5a87d80ad6ad06117d11a1d8922b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         09/14",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2496.05",
        "Check or Slip #": "",
        "TransactionId": "21ed124c7e70e529bf7a1ab8e23fc35c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/17/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         09/13",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2497.15",
        "Check or Slip #": "",
        "TransactionId": "044640903c954a18526555f15e41b964"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/14/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         09/13",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "2498.25",
        "Check or Slip #": "",
        "TransactionId": "f9d52b3a23c6dc6e978408dce3e33a48"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/14/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "301.31",
        "Type": "ACH_CREDIT",
        "Balance": "2499.2",
        "Check or Slip #": "",
        "TransactionId": "fe4d4ee67d3e41b57c7d8b1a9cca8599"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/13/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         09/11",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2197.89",
        "Check or Slip #": "",
        "TransactionId": "472da32a4d66988494f9c9865f4b95e7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/12/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         09/10",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2198.99",
        "Check or Slip #": "",
        "TransactionId": "3d7fce9bdc9669465bb52ea56ccbceec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/11/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         09/11",
        "Amount": "-26.3",
        "Type": "DEBIT_CARD",
        "Balance": "2200.09",
        "Check or Slip #": "",
        "TransactionId": "ed86a4d601cf0b09e6a7c407d28f958e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/11/2018",
        "Description": "CHIPOTLE 2320 SIGNAL HILL CA                 09/10",
        "Amount": "-25.4",
        "Type": "DEBIT_CARD",
        "Balance": "2226.39",
        "Check or Slip #": "",
        "TransactionId": "01288a1d5b5a02bb1b6e32af97f5e245"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/10/2018",
        "Description": "ROCKFIRE GRILL LONG BEACH CA                 09/10",
        "Amount": "-11",
        "Type": "DEBIT_CARD",
        "Balance": "2251.79",
        "Check or Slip #": "",
        "TransactionId": "98c7a0afc0a460f8ec9905f18c5bbd98"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/10/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              09/09",
        "Amount": "-39",
        "Type": "DEBIT_CARD",
        "Balance": "2262.79",
        "Check or Slip #": "",
        "TransactionId": "fd040376adeace74ae94be5cec2e05c9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/10/2018",
        "Description": "SQC*JAMES RALL 8774174551 CA                 09/09",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "2301.79",
        "Check or Slip #": "",
        "TransactionId": "9e6bbda2dde2a626bda1ed799742735f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/10/2018",
        "Description": "THE PIKEPARKINGSTRUCTUR LONG BEACH CA        09/08",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "2321.79",
        "Check or Slip #": "",
        "TransactionId": "3ceaca639ca7efd5a8814eefe7e5ee1f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/10/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             09/08",
        "Amount": "-6.06",
        "Type": "DEBIT_CARD",
        "Balance": "2324.79",
        "Check or Slip #": "",
        "TransactionId": "8c82e49f25b7da3f1d81cbfbd48b5956"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/10/2018",
        "Description": "SQC*JON PRITCHARD 8774174551 CA              09/07",
        "Amount": "-1.7",
        "Type": "DEBIT_CARD",
        "Balance": "2330.85",
        "Check or Slip #": "",
        "TransactionId": "7252ca415e498ac943c5c45b8f38fa09"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2018",
        "Description": "CHEVRON/JB STATION, IN LONG BEACH CA 090712  09/07",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "2332.55",
        "Check or Slip #": "",
        "TransactionId": "35480d9b96f7bbc3208308e7a66351ad"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2018",
        "Description": "RALLY'S LONG BEACH CA                        09/06",
        "Amount": "-6.05",
        "Type": "DEBIT_CARD",
        "Balance": "2357.55",
        "Check or Slip #": "",
        "TransactionId": "279afeab3917bfe8c1c4417b47e911b3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         09/06",
        "Amount": "-1.2",
        "Type": "DEBIT_CARD",
        "Balance": "2363.6",
        "Check or Slip #": "",
        "TransactionId": "d44007843d0698cbe8e61377cd59986c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/07/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              09/04",
        "Amount": "-21.72",
        "Type": "DEBIT_CARD",
        "Balance": "2364.8",
        "Check or Slip #": "",
        "TransactionId": "6934fb2eba60565229e268736f0f2ad6"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "09/07/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "386.72",
        "Type": "ACH_CREDIT",
        "Balance": "2386.52",
        "Check or Slip #": "",
        "TransactionId": "badc4892559ad4ea3e9a4225c464934b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/06/2018",
        "Description": "TARGET T- 950 E 33rd S Signal Hill CA        09/06",
        "Amount": "-23.57",
        "Type": "DEBIT_CARD",
        "Balance": "1999.8",
        "Check or Slip #": "",
        "TransactionId": "85191f4a72dd300f9bfbde0f8283a7cf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/06/2018",
        "Description": "ARBY'S 1314 LONG BEACH CA                    09/05",
        "Amount": "-4.07",
        "Type": "DEBIT_CARD",
        "Balance": "2023.37",
        "Check or Slip #": "",
        "TransactionId": "f48c0e2b9a662f36a277559cdbbf19c9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/05/2018",
        "Description": "SQC*TIMOTHY 8774174551 CA                    09/04",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "2027.44",
        "Check or Slip #": "",
        "TransactionId": "31e2b38ea3f061bc43358e9911badabf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/05/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             09/03",
        "Amount": "-2.21",
        "Type": "DEBIT_CARD",
        "Balance": "2032.44",
        "Check or Slip #": "",
        "TransactionId": "cf9f1c1e06271b1cc95dcb30dd263c63"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/04/2018",
        "Description": "WENDY'S 4156 TARZANA CA                      09/03",
        "Amount": "-7.73",
        "Type": "DEBIT_CARD",
        "Balance": "2034.65",
        "Check or Slip #": "",
        "TransactionId": "5a3f39c13f6f6ff71b52d95b6470d069"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/04/2018",
        "Description": "CHEVRON 0094839 LONG BEACH CA                09/03",
        "Amount": "-16",
        "Type": "DEBIT_CARD",
        "Balance": "2042.38",
        "Check or Slip #": "",
        "TransactionId": "2855096b8b3d9a1cc52eb6d347cba347"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/04/2018",
        "Description": "BIG CATCH LONG BEACH CA                      09/02",
        "Amount": "-90.18",
        "Type": "DEBIT_CARD",
        "Balance": "2058.38",
        "Check or Slip #": "",
        "TransactionId": "0f8348c32f4b7c5224c228d84983c9f1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/04/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              09/02",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "2148.56",
        "Check or Slip #": "",
        "TransactionId": "91163a368669f6ecf8cb4da4147b2f90"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/04/2018",
        "Description": "DOG HAUS LONG BEACH LONG BEACH CA            09/01",
        "Amount": "-11.55",
        "Type": "DEBIT_CARD",
        "Balance": "2183.56",
        "Check or Slip #": "",
        "TransactionId": "86da3b31ce55ff24575147028290eae0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/04/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              08/30",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "2195.11",
        "Check or Slip #": "",
        "TransactionId": "9d31a0285fa50f6659a83692def6869f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "09/04/2018",
        "Description": "SQC*Jeremy Board VISA DIRECT CA      280940  09/03",
        "Amount": "69.87",
        "Type": "DEBIT_CARD",
        "Balance": "2203.65",
        "Check or Slip #": "",
        "TransactionId": "1ca3869043435b48a0533c2aecfc586c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2018",
        "Description": "ALDI 79047 LONG BEACH CA             861402  08/31",
        "Amount": "-27.08",
        "Type": "DEBIT_CARD",
        "Balance": "2133.78",
        "Check or Slip #": "",
        "TransactionId": "347e48ad03b708f23664a641ad2d7445"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                08/30",
        "Amount": "-63",
        "Type": "DEBIT_CARD",
        "Balance": "2160.86",
        "Check or Slip #": "",
        "TransactionId": "9b55e00ac32ba1df573ed9504f08d83c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/31/2018",
        "Description": "IN N OUT BURGER 265 SIGNAL HILL CA           08/29",
        "Amount": "-3.49",
        "Type": "DEBIT_CARD",
        "Balance": "2223.86",
        "Check or Slip #": "",
        "TransactionId": "d31f30d7efa0df9a1870d978db7c493a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/31/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "356.53",
        "Type": "ACH_CREDIT",
        "Balance": "2227.35",
        "Check or Slip #": "",
        "TransactionId": "64a674c0631ffeceaf0e7898de3561c3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2018",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-102.72",
        "Type": "ACH_DEBIT",
        "Balance": "1870.82",
        "Check or Slip #": "",
        "TransactionId": "07e2c9c3e2d763ad283ab8b0afdf1ad0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2018",
        "Description": "CHEVRON/G&M OIL CO., L LONG BEACH CA 097786  08/30",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "1973.54",
        "Check or Slip #": "",
        "TransactionId": "a5c8e9272f2d7fefe2bd444c0094ed50"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         08/28",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "2003.54",
        "Check or Slip #": "",
        "TransactionId": "87cf2df4d35f25b3b1dc4ef5b5e46dc6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/30/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         08/28",
        "Amount": "-1.2",
        "Type": "DEBIT_CARD",
        "Balance": "2004.49",
        "Check or Slip #": "",
        "TransactionId": "a33f3aa13e391a70119a13a4044dc726"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/29/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         08/28",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2005.69",
        "Check or Slip #": "",
        "TransactionId": "3741b1cb1a15b2cf9c3d7ba77de8144b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/28/2018",
        "Description": "WENDY'S 844 LONG BEACH CA                    08/27",
        "Amount": "-4.41",
        "Type": "DEBIT_CARD",
        "Balance": "2006.79",
        "Check or Slip #": "",
        "TransactionId": "1bc2b99f936665433add138c2a3504ce"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/27/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                08/26",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "2011.2",
        "Check or Slip #": "",
        "TransactionId": "c67d0c377bacec39f11ab3b069c4b249"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/27/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              08/26",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "2013.2",
        "Check or Slip #": "",
        "TransactionId": "3d68d992c88ae2bea9fb8667181bdcb0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/27/2018",
        "Description": "PKG PS 1-6, 9, KEC SANTA MONICA CA           08/26",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "2049.2",
        "Check or Slip #": "",
        "TransactionId": "71a2e95e62901c12f150f69d89dcf7ce"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/27/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              08/25",
        "Amount": "-4",
        "Type": "DEBIT_CARD",
        "Balance": "2053.2",
        "Check or Slip #": "",
        "TransactionId": "047748686af8c9ca72de4a3f0e326eca"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/27/2018",
        "Description": "CHIPOTLE 1392 SANTA MONICA CA                08/25",
        "Amount": "-10.47",
        "Type": "DEBIT_CARD",
        "Balance": "2057.2",
        "Check or Slip #": "",
        "TransactionId": "84af0ecb7acdd7afb7e8b572ed83a851"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/27/2018",
        "Description": "KNOTT'S BERRY FARM PARK BUENA PARK CA        08/25",
        "Amount": "-19",
        "Type": "DEBIT_CARD",
        "Balance": "2067.67",
        "Check or Slip #": "",
        "TransactionId": "e73946921e2475148416674164d8b08a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/27/2018",
        "Description": "MCDONALD'S F19526 LAKEWOOD CA                08/25",
        "Amount": "-2.18",
        "Type": "DEBIT_CARD",
        "Balance": "2086.67",
        "Check or Slip #": "",
        "TransactionId": "6eb01c0aceaf43294f3649f634b2eabf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/27/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              08/25",
        "Amount": "-48.99",
        "Type": "DEBIT_CARD",
        "Balance": "2088.85",
        "Check or Slip #": "",
        "TransactionId": "3495d35385c7139d8ba4b51f1618ea6f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/27/2018",
        "Description": "IN N OUT BURGER 265 SIGNAL HILL CA           08/23",
        "Amount": "-15.55",
        "Type": "DEBIT_CARD",
        "Balance": "2137.84",
        "Check or Slip #": "",
        "TransactionId": "6fbe5692664fe0835ccecf0135cb6795"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/24/2018",
        "Description": "CHEVRON/G&M OIL CO., L LONG BEACH CA 065697  08/24",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "2153.39",
        "Check or Slip #": "",
        "TransactionId": "d64594fec8b0c9452e85281c025b7267"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/24/2018",
        "Description": "BURGER KING #2119 LONG BEACH CA              08/22",
        "Amount": "-6.71",
        "Type": "DEBIT_CARD",
        "Balance": "2178.39",
        "Check or Slip #": "",
        "TransactionId": "28580973d11c0c3ddba27bf0d823f14e"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/24/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "352.12",
        "Type": "ACH_CREDIT",
        "Balance": "2185.1",
        "Check or Slip #": "",
        "TransactionId": "98b3a4b930147f91806c8910da64a32d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/23/2018",
        "Description": "DEL TACO 0888 CARSON CA                      08/21",
        "Amount": "-5.55",
        "Type": "DEBIT_CARD",
        "Balance": "1832.98",
        "Check or Slip #": "",
        "TransactionId": "0b71b12567d020ced6f32ba4b6f345dd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/22/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              08/19",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "1838.53",
        "Check or Slip #": "",
        "TransactionId": "6ad7892fc3a60901632fd35931bcea40"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/20/2018",
        "Description": "ALDI 79047 LONG BEACH CA             063367  08/20",
        "Amount": "-35.05",
        "Type": "DEBIT_CARD",
        "Balance": "1847.07",
        "Check or Slip #": "",
        "TransactionId": "81fabc8f4e1be620bddb5b2951c8ae6a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/20/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              08/19",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "1882.12",
        "Check or Slip #": "",
        "TransactionId": "8d6888f60edd6ede688a608492d26872"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/20/2018",
        "Description": "ALDI 79047 LONG BEACH CA             777929  08/18",
        "Amount": "-2.16",
        "Type": "DEBIT_CARD",
        "Balance": "1917.12",
        "Check or Slip #": "",
        "TransactionId": "eb7f86c7cf9c7a5c37b108d4c77cf8a0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/20/2018",
        "Description": "VONS     Store  3519 LONG BEACH CA           08/18",
        "Amount": "-10.14",
        "Type": "DEBIT_CARD",
        "Balance": "1919.28",
        "Check or Slip #": "",
        "TransactionId": "03c9b5aab1d5c6dc3cfd390d07069b59"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/20/2018",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    08/17",
        "Amount": "-8.75",
        "Type": "DEBIT_CARD",
        "Balance": "1929.42",
        "Check or Slip #": "",
        "TransactionId": "08daafa0d6a5c188cf51da0870d00db1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/20/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                08/17",
        "Amount": "-11",
        "Type": "DEBIT_CARD",
        "Balance": "1938.17",
        "Check or Slip #": "",
        "TransactionId": "54809a70fc5a433f9b059ff5643f5417"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/17/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         08/15",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1949.17",
        "Check or Slip #": "",
        "TransactionId": "356ec576559007d2b0de9deab7d3bc09"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/17/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "346.67",
        "Type": "ACH_CREDIT",
        "Balance": "1950.27",
        "Check or Slip #": "",
        "TransactionId": "cb832880c37296e97c412b91df174ea5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/15/2018",
        "Description": "CARL'S JR #1100037 LONG BEACH CA             08/14",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1603.6",
        "Check or Slip #": "",
        "TransactionId": "e768a7f668628225ae749a670058f62d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/15/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              08/12",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "1609.11",
        "Check or Slip #": "",
        "TransactionId": "138be5df8828cba7c18af2b12ce4e2eb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/14/2018",
        "Description": "ALDI 79047 LONG BEACH CA             066032  08/14",
        "Amount": "-26.07",
        "Type": "DEBIT_CARD",
        "Balance": "1617.65",
        "Check or Slip #": "",
        "TransactionId": "48271a56d54ca3252c20477ecceddd79"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/13/2018",
        "Description": "ROSS STORES #1377 SIGNAL HILL CA             08/12",
        "Amount": "-24.07",
        "Type": "DEBIT_CARD",
        "Balance": "1643.72",
        "Check or Slip #": "",
        "TransactionId": "c18e82efda242ea473dac3ed1a047159"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/13/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              08/12",
        "Amount": "-38",
        "Type": "DEBIT_CARD",
        "Balance": "1667.79",
        "Check or Slip #": "",
        "TransactionId": "2bde163f3eed1e98e400e5dd5a386a86"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/13/2018",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    08/11",
        "Amount": "-5.68",
        "Type": "DEBIT_CARD",
        "Balance": "1705.79",
        "Check or Slip #": "",
        "TransactionId": "60295551f94d2b915d4a80ec028fbc74"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/13/2018",
        "Description": "CHEVRON/JB STATION, IN LONG BEACH CA 013008  08/11",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "1711.47",
        "Check or Slip #": "",
        "TransactionId": "a5a3d9e5a26be101fd9c14a1933d4de1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/13/2018",
        "Description": "STARBUCKS STORE 05721 LONG BEACH CA          08/10",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "1736.47",
        "Check or Slip #": "",
        "TransactionId": "e53a2ea1516e0317bdadcedc91d80432"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/13/2018",
        "Description": "AMZN Mktp US Amzn.com/bill WA                08/11",
        "Amount": "-30.06",
        "Type": "DEBIT_CARD",
        "Balance": "1739.47",
        "Check or Slip #": "",
        "TransactionId": "6e621ecd8d304161a450b996c450a0ea"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/10/2018",
        "Description": "CHIPOTLE 2320 SIGNAL HILL CA                 08/09",
        "Amount": "-13.03",
        "Type": "DEBIT_CARD",
        "Balance": "1769.53",
        "Check or Slip #": "",
        "TransactionId": "0b94b06b7e78f53906f18935ce1042f7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/10/2018",
        "Description": "CHIPOTLE 2320 SIGNAL HILL CA                 08/09",
        "Amount": "-9.91",
        "Type": "DEBIT_CARD",
        "Balance": "1782.56",
        "Check or Slip #": "",
        "TransactionId": "2f530404d442737d75b2e7b985be7496"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/10/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "379.97",
        "Type": "ACH_CREDIT",
        "Balance": "1792.47",
        "Check or Slip #": "",
        "TransactionId": "05a8e1f26474a94cc2882f0ba935c7cc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/07/2018",
        "Description": "WIENERSCHNITZEL 150 LONG BEACH CA            08/06",
        "Amount": "-4.34",
        "Type": "DEBIT_CARD",
        "Balance": "1412.5",
        "Check or Slip #": "",
        "TransactionId": "1a8a8e28555b6c1f4e20bd755163f32f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/06/2018",
        "Description": "ALDI 79047 LONG BEACH CA             206862  08/06",
        "Amount": "-30.88",
        "Type": "DEBIT_CARD",
        "Balance": "1416.84",
        "Check or Slip #": "",
        "TransactionId": "d54239b549e05b18d29517c9ee4e9693"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/06/2018",
        "Description": "ARBY'S 1314 LONG BEACH CA                    08/05",
        "Amount": "-5.16",
        "Type": "DEBIT_CARD",
        "Balance": "1447.72",
        "Check or Slip #": "",
        "TransactionId": "8d0acd3a04ba13f89f3def7b547d17f0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/06/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              08/05",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "1452.88",
        "Check or Slip #": "",
        "TransactionId": "71746da709e2e0a8926a036d15d3c21c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/06/2018",
        "Description": "PANDA EXPRESS 783 LONG BEACH CA              08/04",
        "Amount": "-10.14",
        "Type": "DEBIT_CARD",
        "Balance": "1489.88",
        "Check or Slip #": "",
        "TransactionId": "8298f3bd334d4ff390dfe78afe39c8da"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/06/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                08/04",
        "Amount": "-43",
        "Type": "DEBIT_CARD",
        "Balance": "1500.02",
        "Check or Slip #": "",
        "TransactionId": "f9d4d19dcfe73342ecd49ac90202d7a4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/06/2018",
        "Description": "ATM WITHDRAWAL                       008222  08/043901 ATLA",
        "Amount": "-160",
        "Type": "ATM",
        "Balance": "1543.02",
        "Check or Slip #": "",
        "TransactionId": "399043a5995b43e5eb6d8a0b824c9bb9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/06/2018",
        "Description": "SQC*KEVENITUS 8774174551 CA                  08/04",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "1703.02",
        "Check or Slip #": "",
        "TransactionId": "860c7211c4c25a9f08adbd7019414cb1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/06/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                08/03",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1705.02",
        "Check or Slip #": "",
        "TransactionId": "c3b2e25e41ced77c98292b970d7987d3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/03/2018",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    08/02",
        "Amount": "-5.68",
        "Type": "DEBIT_CARD",
        "Balance": "1706.02",
        "Check or Slip #": "",
        "TransactionId": "694d4e37d33df28704589f1af3571f8a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/03/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             08/01",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1711.7",
        "Check or Slip #": "",
        "TransactionId": "19d2ac25149f87f9f779b4bf51f5af74"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "08/03/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "371.05",
        "Type": "ACH_CREDIT",
        "Balance": "1712.8",
        "Check or Slip #": "",
        "TransactionId": "f1c3f8c3467be5ec453b44de1aab2bd9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/02/2018",
        "Description": "Wal-Mart Super Center LONG BEACH CA          08/02",
        "Amount": "-20.95",
        "Type": "DEBIT_CARD",
        "Balance": "1341.75",
        "Check or Slip #": "",
        "TransactionId": "f65a23590cdfa0d901421f533eefe5e1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/02/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               07/31",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1362.7",
        "Check or Slip #": "",
        "TransactionId": "bd2df60742631c502267ee3dfa7b39ca"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/01/2018",
        "Description": "CHEVRON 0094839 LONG BEACH CA                07/31",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "1368.21",
        "Check or Slip #": "",
        "TransactionId": "716fd988483e0fae085b5b9951b4e6e4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/01/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             07/30",
        "Amount": "-2.21",
        "Type": "DEBIT_CARD",
        "Balance": "1393.21",
        "Check or Slip #": "",
        "TransactionId": "8ff68c1347f4eba403fb2615dd5bf8c3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/01/2018",
        "Description": "PACIFIC BAPTIST CHURCH LONG BEACH CA         07/30",
        "Amount": "-591",
        "Type": "DEBIT_CARD",
        "Balance": "1395.42",
        "Check or Slip #": "",
        "TransactionId": "4fb704c2c1a0b41deb11ec224593bbfa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "08/01/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              07/29",
        "Amount": "-21.72",
        "Type": "DEBIT_CARD",
        "Balance": "1986.42",
        "Check or Slip #": "",
        "TransactionId": "202cf7232342fbba4a44ba4cc07784b3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/31/2018",
        "Description": "PROG SELECT INS  INS PREM                   PPD ID: 9409348062",
        "Amount": "-102.72",
        "Type": "ACH_DEBIT",
        "Balance": "2008.14",
        "Check or Slip #": "",
        "TransactionId": "3c67816466de37ba97bd1cc6beca6f45"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/31/2018",
        "Description": "DAIRY QUEEN #10319 CERRITOS CA               07/30",
        "Amount": "-4.92",
        "Type": "DEBIT_CARD",
        "Balance": "2110.86",
        "Check or Slip #": "",
        "TransactionId": "5df2687a984dc43d7ba0871b4522a6a2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/30/2018",
        "Description": "BLACK ANGUS LAKEWOOD CA                      07/29",
        "Amount": "-55.39",
        "Type": "DEBIT_CARD",
        "Balance": "2115.78",
        "Check or Slip #": "",
        "TransactionId": "5f5e59fe2c62b93d653be91ac22c28ae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/30/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              07/29",
        "Amount": "-50",
        "Type": "DEBIT_CARD",
        "Balance": "2171.17",
        "Check or Slip #": "",
        "TransactionId": "37f6a907719d2d462e873d632e69b85e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/30/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             07/28",
        "Amount": "-7.05",
        "Type": "DEBIT_CARD",
        "Balance": "2221.17",
        "Check or Slip #": "",
        "TransactionId": "ad99e4bd54df17a2d4a197f5895ffcdb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/30/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                07/27",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "2228.22",
        "Check or Slip #": "",
        "TransactionId": "b8dfe4fe764408478b8d4d479760dd7d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/30/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              07/27",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "2229.22",
        "Check or Slip #": "",
        "TransactionId": "69583f1453045b01999cc3dc429564e8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/30/2018",
        "Description": "SQC*Square Cash VISA DIRECT CA       188557  07/29",
        "Amount": "34.77",
        "Type": "DEBIT_CARD",
        "Balance": "2249.22",
        "Check or Slip #": "",
        "TransactionId": "0a8995323e99f3e82538257f5538f89c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/27/2018",
        "Description": "COSTCO WHSE #0424 SIGNAL HILL CA     269720  07/27",
        "Amount": "-4.75",
        "Type": "DEBIT_CARD",
        "Balance": "2214.45",
        "Check or Slip #": "",
        "TransactionId": "f704076fb0a5ad2fdec947976d93d0e6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/27/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                07/26",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "2219.2",
        "Check or Slip #": "",
        "TransactionId": "ad937060720c5f935cb7af0a65ee8270"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/27/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "487.91",
        "Type": "ACH_CREDIT",
        "Balance": "2220.2",
        "Check or Slip #": "",
        "TransactionId": "24914b4e73d0f8266d9aed8ec5dae17a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                07/25",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1732.29",
        "Check or Slip #": "",
        "TransactionId": "fc9395caaaa8c7d10bf1d9ac9ea7d97b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2018",
        "Description": "RALLY'S LONG BEACH CA                        07/25",
        "Amount": "-5.57",
        "Type": "DEBIT_CARD",
        "Balance": "1733.29",
        "Check or Slip #": "",
        "TransactionId": "6631e7956af657020c5bc88268c3b0d5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/26/2018",
        "Description": "BURGER KING #21054 LAKEWOOD CA               07/24",
        "Amount": "-5.48",
        "Type": "DEBIT_CARD",
        "Balance": "1738.86",
        "Check or Slip #": "",
        "TransactionId": "17f0f330c875e41c9a4083f7c28032f6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/25/2018",
        "Description": "CINNABON #96 LAKEWOOD CA                     07/24",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "1744.34",
        "Check or Slip #": "",
        "TransactionId": "1265c530eebc3f79a43b08f83e335c15"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/25/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             07/23",
        "Amount": "-3.75",
        "Type": "DEBIT_CARD",
        "Balance": "1756.34",
        "Check or Slip #": "",
        "TransactionId": "a2d5e92becfd760b7f5cae129955bda2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/24/2018",
        "Description": "ATM WITHDRAWAL                       004947  07/242811 FIRE",
        "Amount": "-440",
        "Type": "ATM",
        "Balance": "1760.09",
        "Check or Slip #": "",
        "TransactionId": "f30b3221fe14b284909ff8730d9bd7e0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2018",
        "Description": "CHEVRON/JB STATION, IN LONG BEACH CA 084196  07/23",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "2200.09",
        "Check or Slip #": "",
        "TransactionId": "b5d957ae6dc40cd181da76d8703600b4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2018",
        "Description": "WAL-MART #4101 LONG BEACH CA                 07/22",
        "Amount": "-14.74",
        "Type": "DEBIT_CARD",
        "Balance": "2225.09",
        "Check or Slip #": "",
        "TransactionId": "d32e547d27cc78040e363f7e41906bbe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2018",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    07/22",
        "Amount": "-9.52",
        "Type": "DEBIT_CARD",
        "Balance": "2239.83",
        "Check or Slip #": "",
        "TransactionId": "4bc1b2b435f477e35278c1d4a6c193a6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              07/22",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "2249.35",
        "Check or Slip #": "",
        "TransactionId": "4904497d6da9ed28e57a5cfb8595123f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             07/21",
        "Amount": "-6.49",
        "Type": "DEBIT_CARD",
        "Balance": "2286.35",
        "Check or Slip #": "",
        "TransactionId": "a00a30286df596ea46696ffc2ce5b4d3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                07/21",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "2292.84",
        "Check or Slip #": "",
        "TransactionId": "2cf7fa452c846896d738ca05bbab2eef"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                07/21",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "2293.84",
        "Check or Slip #": "",
        "TransactionId": "831bb122a7388913639c01d25afaefc8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2018",
        "Description": "TACO BELL 2828 LONG BEACH CA                 07/21",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "2295.84",
        "Check or Slip #": "",
        "TransactionId": "d1854a7b48e8232a3937355592ac102e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2018",
        "Description": "ARBY'S 1314 LONG BEACH CA                    07/20",
        "Amount": "-8.7",
        "Type": "DEBIT_CARD",
        "Balance": "2301.35",
        "Check or Slip #": "",
        "TransactionId": "d44a624bb6c811bc17a53a5b29d816da"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/23/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                07/20",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "2310.05",
        "Check or Slip #": "",
        "TransactionId": "c04fc92886c0b8ba9162bdcfacf02962"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/20/2018",
        "Description": "ALDI 79047 LONG BEACH CA             669597  07/20",
        "Amount": "-6.46",
        "Type": "DEBIT_CARD",
        "Balance": "2311.05",
        "Check or Slip #": "",
        "TransactionId": "df82c97a0f03b26611bd2315e1e06aab"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/20/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "365.23",
        "Type": "ACH_CREDIT",
        "Balance": "2317.51",
        "Check or Slip #": "",
        "TransactionId": "3f273853d5776a3234618720cccaacab"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/19/2018",
        "Description": "DAIRY QUEEN #10319 CERRITOS CA               07/18",
        "Amount": "-10.38",
        "Type": "DEBIT_CARD",
        "Balance": "1952.28",
        "Check or Slip #": "",
        "TransactionId": "4a4f30e2cf2b32530ac3ed9fb6d6ad9f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/18/2018",
        "Description": "BURGER KING #2119 LONG BEACH CA              07/16",
        "Amount": "-6.93",
        "Type": "DEBIT_CARD",
        "Balance": "1962.66",
        "Check or Slip #": "",
        "TransactionId": "37233b4c3537fefcab5bb97fc8c63cc1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/18/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              07/15",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "1969.59",
        "Check or Slip #": "",
        "TransactionId": "c5580f4626911a927f7ce4418bdfaaee"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/17/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             07/15",
        "Amount": "-6.04",
        "Type": "DEBIT_CARD",
        "Balance": "1978.13",
        "Check or Slip #": "",
        "TransactionId": "458745a583cbf8ca29695cb17f4727bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/16/2018",
        "Description": "Wal-Mart Super Center LAKEWOOD CA            07/16",
        "Amount": "-34.8",
        "Type": "DEBIT_CARD",
        "Balance": "1984.17",
        "Check or Slip #": "",
        "TransactionId": "1706dc07ca8317871501c6b4fe9e25a9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/16/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              07/15",
        "Amount": "-31",
        "Type": "DEBIT_CARD",
        "Balance": "2018.97",
        "Check or Slip #": "",
        "TransactionId": "1a7211e5a99ead8511b9385dc88f86be"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/16/2018",
        "Description": "PANDA EXPRESS #2109 LAKEWOOD CA              07/14",
        "Amount": "-11",
        "Type": "DEBIT_CARD",
        "Balance": "2049.97",
        "Check or Slip #": "",
        "TransactionId": "bb73981138bc3b7752dfadc23f1c4af4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/13/2018",
        "Description": "COSTCO WHSE #0424 SIGNAL HILL CA     447408  07/13",
        "Amount": "-3.82",
        "Type": "DEBIT_CARD",
        "Balance": "2060.97",
        "Check or Slip #": "",
        "TransactionId": "ccd6ebab87e3cd3d9740b4cb74f02a6b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/13/2018",
        "Description": "CHEVRON/JB STATION, IN LONG BEACH CA 034062  07/13",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "2064.79",
        "Check or Slip #": "",
        "TransactionId": "2d6eaf392647c1823458c1a5b03d3cb3"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/13/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "305.57",
        "Type": "ACH_CREDIT",
        "Balance": "2089.79",
        "Check or Slip #": "",
        "TransactionId": "94f68da246542d281e3a609ca115f3ec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/11/2018",
        "Description": "Wal-Mart Super Center LAKEWOOD CA            07/11",
        "Amount": "-52.31",
        "Type": "DEBIT_CARD",
        "Balance": "1784.22",
        "Check or Slip #": "",
        "TransactionId": "24b402391b4f1f74cfdaeadc106e73f5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/11/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               07/09",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1836.53",
        "Check or Slip #": "",
        "TransactionId": "66acd61a7bc90ad8fd587c8371b412ff"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/11/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              07/08",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "1842.04",
        "Check or Slip #": "",
        "TransactionId": "e23df6f7ea900a5b8c53ecd8edb85ffe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/10/2018",
        "Description": "COSTCO WHSE #0424 SIGNAL HILL CA     473322  07/10",
        "Amount": "-4.75",
        "Type": "DEBIT_CARD",
        "Balance": "1850.58",
        "Check or Slip #": "",
        "TransactionId": "3879bcede72139c4ca8c7a30c6fb79c4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/09/2018",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    07/08",
        "Amount": "-2.61",
        "Type": "DEBIT_CARD",
        "Balance": "1855.33",
        "Check or Slip #": "",
        "TransactionId": "ea07eb22dee157ea499849e2ba414c59"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/09/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              07/08",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "1857.94",
        "Check or Slip #": "",
        "TransactionId": "a4dbeaab6295d4c336e31070e7fa56c6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/09/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             07/05",
        "Amount": "-3.96",
        "Type": "DEBIT_CARD",
        "Balance": "1893.94",
        "Check or Slip #": "",
        "TransactionId": "aea773a5a2ad0bb909388106d6e2408d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/06/2018",
        "Description": "CHEVRON/G&M OIL CO., L LONG BEACH CA 003452  07/06",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "1897.9",
        "Check or Slip #": "",
        "TransactionId": "6ef6b9928500a358a633af2e7d9b47d6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/06/2018",
        "Description": "TARGET T- 950 E 33rd S Signal Hill CA        07/06",
        "Amount": "-58.31",
        "Type": "DEBIT_CARD",
        "Balance": "1917.9",
        "Check or Slip #": "",
        "TransactionId": "0018a10260bf4afeae53ee7957b4de35"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "07/06/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "353.25",
        "Type": "ACH_CREDIT",
        "Balance": "1976.21",
        "Check or Slip #": "",
        "TransactionId": "d17ab277c445ad0b13ab3d1854baf21d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/05/2018",
        "Description": "COFFEE BEAN STORE SANTA MONICA CA            07/04",
        "Amount": "-5.55",
        "Type": "DEBIT_CARD",
        "Balance": "1622.96",
        "Check or Slip #": "",
        "TransactionId": "0ad9761495440b313dfffb546f2a67c4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/05/2018",
        "Description": "FUDDRUCKERS 3078 LAKEWOOD CA                 07/04",
        "Amount": "-18.48",
        "Type": "DEBIT_CARD",
        "Balance": "1628.51",
        "Check or Slip #": "",
        "TransactionId": "2619a88ad7f42e12ffaf20808ce94105"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/05/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              07/01",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "1646.99",
        "Check or Slip #": "",
        "TransactionId": "990ef107e4a71e6cb83cfc4bb19ed392"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/03/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                07/02",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1655.53",
        "Check or Slip #": "",
        "TransactionId": "e7d65bff225ff9933dc445627a4cfb2d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/03/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                07/02",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "1656.53",
        "Check or Slip #": "",
        "TransactionId": "5f1d1b73b793296606dcd5766a0e1f6c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/02/2018",
        "Description": "CHEVRON/G&M OIL CO., L LONG BEACH CA 032206  07/01",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "1662.53",
        "Check or Slip #": "",
        "TransactionId": "ca6307285015721493685ad1bd0669d9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/02/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         07/01",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "1682.53",
        "Check or Slip #": "",
        "TransactionId": "f6680f8e907bc1b87550019835dbf3af"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/02/2018",
        "Description": "WAL-MART #4101 LONG BEACH CA                 07/01",
        "Amount": "-33.18",
        "Type": "DEBIT_CARD",
        "Balance": "1688.03",
        "Check or Slip #": "",
        "TransactionId": "8ca9e2d925ab6ab3b81c67c48ab08bda"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/02/2018",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    07/01",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "1721.21",
        "Check or Slip #": "",
        "TransactionId": "7f98db9a79d7dd865f3ee4ed0ed68634"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "07/02/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              07/01",
        "Amount": "-34",
        "Type": "DEBIT_CARD",
        "Balance": "1725.59",
        "Check or Slip #": "",
        "TransactionId": "16ef65c30210abca37df367f8faa2bc2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/29/2018",
        "Description": "PROGRESSIVE *INSURANC 800-776-4737 OH        06/28",
        "Amount": "-124.28",
        "Type": "DEBIT_CARD",
        "Balance": "1759.59",
        "Check or Slip #": "",
        "TransactionId": "d776bdc5cbc83fdeac3812ed75a087d8"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/29/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "334.95",
        "Type": "ACH_CREDIT",
        "Balance": "1883.87",
        "Check or Slip #": "",
        "TransactionId": "f847c4d313acbffc065631bbe3af4439"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/28/2018",
        "Description": "ALDI 79047 LONG BEACH CA             325315  06/28",
        "Amount": "-19.59",
        "Type": "DEBIT_CARD",
        "Balance": "1548.92",
        "Check or Slip #": "",
        "TransactionId": "4b575bf25ee81c7ad530c6789cc1e9d2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/28/2018",
        "Description": "CHEVRON/JB STATION, IN LONG BEACH CA 011517  06/28",
        "Amount": "-15",
        "Type": "DEBIT_CARD",
        "Balance": "1568.51",
        "Check or Slip #": "",
        "TransactionId": "88a9bbd590585557c5cf72da09997521"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/28/2018",
        "Description": "CARL'S JR #1100037 LONG BEACH CA             06/27",
        "Amount": "-6.89",
        "Type": "DEBIT_CARD",
        "Balance": "1583.51",
        "Check or Slip #": "",
        "TransactionId": "e53cbee955861852b2dda5faf2a12068"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/27/2018",
        "Description": "WITHDRAWAL 06/27",
        "Amount": "-3600",
        "Type": "MISC_DEBIT",
        "Balance": "1590.4",
        "Check or Slip #": "",
        "TransactionId": "f95b1c437f9af8c4a97a364593462e0b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/27/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              06/26",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "5190.4",
        "Check or Slip #": "",
        "TransactionId": "c6010db4f7ded46e89048f019a76fd36"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/27/2018",
        "Description": "PACIFIC BAPTIST CHURCH LONG BEACH CA         06/25",
        "Amount": "-396",
        "Type": "DEBIT_CARD",
        "Balance": "5210.4",
        "Check or Slip #": "",
        "TransactionId": "9d662512b98c9b0a219c657544e77579"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/26/2018",
        "Description": "ALBARITOS MEXICAN FRES LONG BEACH CA         06/26",
        "Amount": "-9.03",
        "Type": "DEBIT_CARD",
        "Balance": "5606.4",
        "Check or Slip #": "",
        "TransactionId": "929f1f208ecaf27a19ab41cd7ae9c5d5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/25/2018",
        "Description": "CHIPOTLE 1805 SANTEE CA                      06/24",
        "Amount": "-9.75",
        "Type": "DEBIT_CARD",
        "Balance": "5615.43",
        "Check or Slip #": "",
        "TransactionId": "91495aa99036619f8d74eccd4799655c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/25/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              06/24",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "5625.18",
        "Check or Slip #": "",
        "TransactionId": "42656b565e72992309cf623e590a749d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/25/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              06/24",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "5661.18",
        "Check or Slip #": "",
        "TransactionId": "f413df39935ed67493c85f1ba48dee69"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/22/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              06/21",
        "Amount": "-20",
        "Type": "DEBIT_CARD",
        "Balance": "5691.18",
        "Check or Slip #": "",
        "TransactionId": "ddc65942f988b4b901d5d95c9d6cb6fc"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/22/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "352.23",
        "Type": "ACH_CREDIT",
        "Balance": "5711.18",
        "Check or Slip #": "",
        "TransactionId": "84d5f1382e7ab625213940362540f8bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/20/2018",
        "Description": "TARGET T- 950 E 33rd S Signal Hill CA        06/20",
        "Amount": "-33.88",
        "Type": "DEBIT_CARD",
        "Balance": "5358.95",
        "Check or Slip #": "",
        "TransactionId": "c8e78e337de54997982d322d71a40314"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/20/2018",
        "Description": "BASKIN #361369 Q35 LONG BEACH CA             06/19",
        "Amount": "-0.99",
        "Type": "DEBIT_CARD",
        "Balance": "5392.83",
        "Check or Slip #": "",
        "TransactionId": "8af320e2b8da19cea43302c08b5295c3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/20/2018",
        "Description": "CHURCH'S CHICKEN # LONG BEACH CA             06/19",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "5393.82",
        "Check or Slip #": "",
        "TransactionId": "b34f5fd41e173481d79809581e768371"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/20/2018",
        "Description": "5903 EL POLLO LOCO LONG BEACH CA             06/18",
        "Amount": "-4.39",
        "Type": "DEBIT_CARD",
        "Balance": "5399.32",
        "Check or Slip #": "",
        "TransactionId": "20bb4c252fcd076d33d693e2c0e5644f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/18/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              06/17",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "5403.71",
        "Check or Slip #": "",
        "TransactionId": "f76c33a26e88ec7ac8b102af558b5b18"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/18/2018",
        "Description": "TARGET T- 950 E 33rd S SIGNAL HILL CA        06/16",
        "Amount": "-11.75",
        "Type": "DEBIT_CARD",
        "Balance": "5439.71",
        "Check or Slip #": "",
        "TransactionId": "f5d148439c723dc139b6bce2907fea9d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/18/2018",
        "Description": "ARBYS #1314 LONG BEACH CA                    06/16",
        "Amount": "-8.8",
        "Type": "DEBIT_CARD",
        "Balance": "5451.46",
        "Check or Slip #": "",
        "TransactionId": "eb9325b9e961834bd8029f6868b7cec8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/18/2018",
        "Description": "CHICK-FIL-A #03388 LONG BEACH CA             06/15",
        "Amount": "-16.1",
        "Type": "DEBIT_CARD",
        "Balance": "5460.26",
        "Check or Slip #": "",
        "TransactionId": "e0b883e19513c5708f4d122ff62f5783"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/15/2018",
        "Description": "CA DMV LONG BEACH FO 5 LONG BEACH CA 399594  06/15",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "5476.36",
        "Check or Slip #": "",
        "TransactionId": "4a41ec8d24b07cafacd6b0d009815fae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/15/2018",
        "Description": "SQC*KEVENITUS 8774174551 CA                  06/14",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "5483.36",
        "Check or Slip #": "",
        "TransactionId": "eb0fac9f991aee997355c7815f82fbd5"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/15/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "352.54",
        "Type": "ACH_CREDIT",
        "Balance": "5486.36",
        "Check or Slip #": "",
        "TransactionId": "f48e32364b3bd2cd2f8bce1777fe4927"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/14/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                06/13",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "5133.82",
        "Check or Slip #": "",
        "TransactionId": "6adbdc08062554d8d007e4cbcc3df47e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/14/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               06/12",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "5138.82",
        "Check or Slip #": "",
        "TransactionId": "695775a305b225aee09b29f39829bf47"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/13/2018",
        "Description": "SQC*TIMOTHY 8774174551 CA                    06/12",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "5144.33",
        "Check or Slip #": "",
        "TransactionId": "6ca27717dbbc0cca8f97acc25e383a1e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/13/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              06/10",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "5149.33",
        "Check or Slip #": "",
        "TransactionId": "343e8163f16e2a163f40cff493fb3753"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/12/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                06/11",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5157.87",
        "Check or Slip #": "",
        "TransactionId": "069b6fb20c5c22cc04bec6a70bc05543"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/12/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                06/11",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5158.87",
        "Check or Slip #": "",
        "TransactionId": "7d86be8af179601347afae25f9779bd0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/11/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         06/11",
        "Amount": "-34.05",
        "Type": "DEBIT_CARD",
        "Balance": "5159.87",
        "Check or Slip #": "",
        "TransactionId": "cbbfd86517936fe428611661c6666849"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/11/2018",
        "Description": "WALGREENS STORE 2627 P LONG BEACH CA 423609  06/11",
        "Amount": "-10.46",
        "Type": "DEBIT_CARD",
        "Balance": "5193.92",
        "Check or Slip #": "",
        "TransactionId": "6c3c23d2954e5bf6874b23d4e52ab75c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/11/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              06/10",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "5204.38",
        "Check or Slip #": "",
        "TransactionId": "5d3f54b08040d7618459a0a79b837faf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/11/2018",
        "Description": "TACO BELL 2828 LONG BEACH CA                 06/09",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "5234.38",
        "Check or Slip #": "",
        "TransactionId": "799379bdf7533dda22ec87e42fea461f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/11/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                06/08",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5239.89",
        "Check or Slip #": "",
        "TransactionId": "7edf6be8554366806b5d86744e6c767f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/11/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                06/08",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5240.89",
        "Check or Slip #": "",
        "TransactionId": "e8bd0348d39bc6b4cad4f98162babb48"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/11/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                06/08",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5241.89",
        "Check or Slip #": "",
        "TransactionId": "357de14083455deec8ddf3f3c080362a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/08/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                06/07",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5242.89",
        "Check or Slip #": "",
        "TransactionId": "5f4276e666b88cbf87e3a73005f83f86"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/08/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "297.74",
        "Type": "ACH_CREDIT",
        "Balance": "5243.89",
        "Check or Slip #": "",
        "TransactionId": "e36fa835ac20f14f1b86443969d16883"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/07/2018",
        "Description": "DEL TACO 0888 CARSON CA                      06/05",
        "Amount": "-6.34",
        "Type": "DEBIT_CARD",
        "Balance": "4946.15",
        "Check or Slip #": "",
        "TransactionId": "a150342958a4ebb29ac284b3d4661292"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/06/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                06/05",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "4952.49",
        "Check or Slip #": "",
        "TransactionId": "77ce4a6671b82f43d4470b0025d85d7e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/06/2018",
        "Description": "DENNY'S #7212 18007336 LONG BEACH CA         06/04",
        "Amount": "-13.91",
        "Type": "DEBIT_CARD",
        "Balance": "4959.49",
        "Check or Slip #": "",
        "TransactionId": "84631b695d2fdb2fb421b27d2ad44c33"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/05/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         06/05",
        "Amount": "-28.09",
        "Type": "DEBIT_CARD",
        "Balance": "4973.4",
        "Check or Slip #": "",
        "TransactionId": "cb830eb77e42313bdc54272c3f121953"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/05/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              06/02",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "5001.49",
        "Check or Slip #": "",
        "TransactionId": "83c38cff8d0fee0ef87b89affbd012e8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/04/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              06/03",
        "Amount": "-4.5",
        "Type": "DEBIT_CARD",
        "Balance": "5010.03",
        "Check or Slip #": "",
        "TransactionId": "a67251cf3188bd252667c2c7c9ea4a75"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/04/2018",
        "Description": "SQC*ALVARO RODRIGUE 8774174551 CA            06/03",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "5014.53",
        "Check or Slip #": "",
        "TransactionId": "e840841f2384614677440bd98c673ad7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/04/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              06/03",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "5017.53",
        "Check or Slip #": "",
        "TransactionId": "df20488874dc0be06c0e2102875fcf9c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/04/2018",
        "Description": "WM SUPERC Wal-Mart Sup LAKEWOOD CA           06/02",
        "Amount": "-11.4",
        "Type": "DEBIT_CARD",
        "Balance": "5047.53",
        "Check or Slip #": "",
        "TransactionId": "6f01afc8b333e4caef89735c6a6d04bd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/04/2018",
        "Description": "WM SUPERC Wal-Mart Sup LAKEWOOD CA           06/02",
        "Amount": "-19.36",
        "Type": "DEBIT_CARD",
        "Balance": "5058.93",
        "Check or Slip #": "",
        "TransactionId": "eb1cb99ed68538dc2b3f2f99b0b28853"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/04/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                06/01",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "5078.29",
        "Check or Slip #": "",
        "TransactionId": "6cf230417d02efc8f025ff2c42997688"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/04/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               05/31",
        "Amount": "-10.46",
        "Type": "DEBIT_CARD",
        "Balance": "5079.29",
        "Check or Slip #": "",
        "TransactionId": "dce538a6fb0e567cfe653570efc3d97c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "06/01/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/31",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "5089.75",
        "Check or Slip #": "",
        "TransactionId": "251bd292153f35471f897c206d625fb0"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "06/01/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "297.69",
        "Type": "ACH_CREDIT",
        "Balance": "5094.75",
        "Check or Slip #": "",
        "TransactionId": "357b3251ead54d7926ac52c4b8e4734f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/29/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/28",
        "Amount": "-85",
        "Type": "DEBIT_CARD",
        "Balance": "4797.06",
        "Check or Slip #": "",
        "TransactionId": "d730c03c15b47856d9b80c889944a729"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/29/2018",
        "Description": "RITE AID STORE - 6371 LONG BEACH CA  611414  05/28",
        "Amount": "-5.38",
        "Type": "DEBIT_CARD",
        "Balance": "4882.06",
        "Check or Slip #": "",
        "TransactionId": "9338cef725e04aeee56eed6def55e722"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/29/2018",
        "Description": "SQC*GERVINE MARANAN 8774174551 CA            05/28",
        "Amount": "-14.5",
        "Type": "DEBIT_CARD",
        "Balance": "4887.44",
        "Check or Slip #": "",
        "TransactionId": "03b48edaa2395cf39d04a0b948f636fe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/29/2018",
        "Description": "SQC*GEORGE OSPINA 8774174551 CA              05/27",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "4901.94",
        "Check or Slip #": "",
        "TransactionId": "f46fec87aba6e3f7b20bb950a3682dcb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/29/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              05/27",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "4908.94",
        "Check or Slip #": "",
        "TransactionId": "efaff33374a473b87e643ae65e9ac67a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/29/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/25",
        "Amount": "-30",
        "Type": "DEBIT_CARD",
        "Balance": "4945.94",
        "Check or Slip #": "",
        "TransactionId": "cbe7fa436b4d4a3e61d28a013e601591"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/29/2018",
        "Description": "SQC*KEVENITUS 8774174551 CA                  05/25",
        "Amount": "-35.5",
        "Type": "DEBIT_CARD",
        "Balance": "4975.94",
        "Check or Slip #": "",
        "TransactionId": "3a1f16a265cbe263d4031f9841696f6d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/29/2018",
        "Description": "SQC*KEVENITUS 8774174551 CA                  05/25",
        "Amount": "-57.5",
        "Type": "DEBIT_CARD",
        "Balance": "5011.44",
        "Check or Slip #": "",
        "TransactionId": "909cfead8c6df10aff92be9e505cd207"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/29/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/25",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "5068.94",
        "Check or Slip #": "",
        "TransactionId": "7bd0be73855d10a0d33ee7afd8f7f19a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/29/2018",
        "Description": "BURGER KING #2119 LONG BEACH CA              05/24",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "5073.94",
        "Check or Slip #": "",
        "TransactionId": "c6fe7b6c7e95369686c70930f18639cd"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/25/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "365.2",
        "Type": "ACH_CREDIT",
        "Balance": "5079.45",
        "Check or Slip #": "",
        "TransactionId": "55ec31bb342cd0183ee7df6ea8bdd9c4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/24/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         05/24",
        "Amount": "-28.98",
        "Type": "DEBIT_CARD",
        "Balance": "4714.25",
        "Check or Slip #": "",
        "TransactionId": "91ef81371e3ed30a0c18f2235c582c9d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/24/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/23",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "4743.23",
        "Check or Slip #": "",
        "TransactionId": "64636dec7f62e162f04d933529657919"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/24/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/23",
        "Amount": "-2",
        "Type": "DEBIT_CARD",
        "Balance": "4744.23",
        "Check or Slip #": "",
        "TransactionId": "ca63840f8e4d12e1e1c6726fda4dc0cf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/24/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/23",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "4746.23",
        "Check or Slip #": "",
        "TransactionId": "06d35c4b21674115be535218e8b673a5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/23/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             05/21",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "4747.23",
        "Check or Slip #": "",
        "TransactionId": "fe16e8b7089081060dfa0efef7df97bb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/21/2018",
        "Description": "WENDY'S 844 LONG BEACH CA                    05/20",
        "Amount": "-4.96",
        "Type": "DEBIT_CARD",
        "Balance": "4752.73",
        "Check or Slip #": "",
        "TransactionId": "ffc8681e4dd7fac01e2896caa782dbdd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/21/2018",
        "Description": "WENDY'S 844 LONG BEACH CA                    05/20",
        "Amount": "-4.96",
        "Type": "DEBIT_CARD",
        "Balance": "4757.69",
        "Check or Slip #": "",
        "TransactionId": "95f010978e5ae7942c2711c2642291fe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/21/2018",
        "Description": "RITE AID STORE - 6219 LONG BEACH CA  998767  05/20",
        "Amount": "-2.69",
        "Type": "DEBIT_CARD",
        "Balance": "4762.65",
        "Check or Slip #": "",
        "TransactionId": "93e0169ff9212d999bfbf1fda22b19a9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/21/2018",
        "Description": "RUBIO'S #033 LONG BEACH CA                   05/20",
        "Amount": "-8.59",
        "Type": "DEBIT_CARD",
        "Balance": "4765.34",
        "Check or Slip #": "",
        "TransactionId": "71a50d0fd1314f6f030f6ce8874f4575"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/21/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              05/20",
        "Amount": "-33",
        "Type": "DEBIT_CARD",
        "Balance": "4773.93",
        "Check or Slip #": "",
        "TransactionId": "60a1b5bbfa386aed6e432a6efa82c840"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/21/2018",
        "Description": "PANDA EXPRESS 783 LONG BEACH CA              05/19",
        "Amount": "-10.25",
        "Type": "DEBIT_CARD",
        "Balance": "4806.93",
        "Check or Slip #": "",
        "TransactionId": "59fb9cbb66597bb6c1af09e1922bfaac"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/21/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/18",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "4817.18",
        "Check or Slip #": "",
        "TransactionId": "fe6f17d200a5e0a9aa71082755e733b1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/18/2018",
        "Description": "7-ELEVEN LONG BEACH CA                       05/18",
        "Amount": "-1.69",
        "Type": "DEBIT_CARD",
        "Balance": "4818.18",
        "Check or Slip #": "",
        "TransactionId": "55ab9af7df4c8d5ffd19fe9b9b2509fe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/18/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/17",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "4819.87",
        "Check or Slip #": "",
        "TransactionId": "5b16a53742076aad30dd122cfbd89beb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/18/2018",
        "Description": "BURGER KING #2119 LONG BEACH CA              05/16",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "4820.87",
        "Check or Slip #": "",
        "TransactionId": "6d7e3afe645ad2900971d22b25275dd1"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/18/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "323.97",
        "Type": "ACH_CREDIT",
        "Balance": "4826.38",
        "Check or Slip #": "",
        "TransactionId": "26d401d6a36576bc98bcaa81998cebce"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/17/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             05/15",
        "Amount": "-5.27",
        "Type": "DEBIT_CARD",
        "Balance": "4502.41",
        "Check or Slip #": "",
        "TransactionId": "b9bcc4b3d4134f89c05a16f89f9e4856"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/16/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         05/16",
        "Amount": "-33.03",
        "Type": "DEBIT_CARD",
        "Balance": "4507.68",
        "Check or Slip #": "",
        "TransactionId": "a89c2834dc9ecdc6934828e1d0128052"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/15/2018",
        "Description": "TACO BELL 2828 LONG BEACH CA                 05/14",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "4540.71",
        "Check or Slip #": "",
        "TransactionId": "08eae2ff20b5df1c256bced2c2029b33"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/14/2018",
        "Description": "RUBIO'S #033 LONG BEACH CA                   05/13",
        "Amount": "-11.11",
        "Type": "DEBIT_CARD",
        "Balance": "4546.22",
        "Check or Slip #": "",
        "TransactionId": "e0bf2c6e1210c13899dac7360157a3f5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/14/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              05/13",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "4557.33",
        "Check or Slip #": "",
        "TransactionId": "b04c0db00466b346ef20a8153a316016"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/14/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               05/12",
        "Amount": "-10.23",
        "Type": "DEBIT_CARD",
        "Balance": "4592.33",
        "Check or Slip #": "",
        "TransactionId": "d35fb6d4453549dda90ad255f6b91b16"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/14/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             05/10",
        "Amount": "-3.96",
        "Type": "DEBIT_CARD",
        "Balance": "4602.56",
        "Check or Slip #": "",
        "TransactionId": "cffe9275973282069d5ddb8b1331dd07"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/11/2018",
        "Description": "7-ELEVEN LONG BEACH CA                       05/11",
        "Amount": "-5.1",
        "Type": "DEBIT_CARD",
        "Balance": "4606.52",
        "Check or Slip #": "",
        "TransactionId": "b22caf2cb31e17632ba119f324e781ba"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/11/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             05/09",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "4611.62",
        "Check or Slip #": "",
        "TransactionId": "158ec20b622ae181e5c596503dc22f89"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/11/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             05/09",
        "Amount": "-3.85",
        "Type": "DEBIT_CARD",
        "Balance": "4612.72",
        "Check or Slip #": "",
        "TransactionId": "dd2f89233b0da5b34bb86caaa77a8df3"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/11/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "343.66",
        "Type": "ACH_CREDIT",
        "Balance": "4616.57",
        "Check or Slip #": "",
        "TransactionId": "d4b7979f76ff06a31ac9bc969143d468"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/10/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/09",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "4272.91",
        "Check or Slip #": "",
        "TransactionId": "1322d797c31dc7240f7d79e3145ce9e4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/09/2018",
        "Description": "RALLY'S LONG BEACH CA                        05/08",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "4297.91",
        "Check or Slip #": "",
        "TransactionId": "736c0c13140bb135138f666218ac22cc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/08/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/07",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "4303.41",
        "Check or Slip #": "",
        "TransactionId": "4b1e53302a8b6ad39cdfe4a6b165714b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/08/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/07",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "4304.41",
        "Check or Slip #": "",
        "TransactionId": "2bdd99051ee5f22d7052cae3894d5dfa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/08/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             05/06",
        "Amount": "-3.19",
        "Type": "DEBIT_CARD",
        "Balance": "4305.41",
        "Check or Slip #": "",
        "TransactionId": "d319ec3972a6872e382323dd44382704"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/07/2018",
        "Description": "BEST BUY      00011197 SIGNAL HILL CA        05/06",
        "Amount": "-30.65",
        "Type": "DEBIT_CARD",
        "Balance": "4308.6",
        "Check or Slip #": "",
        "TransactionId": "53b0615cd19527a7a18c7035847d50dc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/07/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              05/06",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "4339.25",
        "Check or Slip #": "",
        "TransactionId": "176f9fc1ec49d335ff7f4a2c3e75f69f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/07/2018",
        "Description": "CARSON BUFFET CARSON CA                      05/05",
        "Amount": "-18.16",
        "Type": "DEBIT_CARD",
        "Balance": "4374.25",
        "Check or Slip #": "",
        "TransactionId": "6e1d0e76bba3c7f08098bd2be40b5bfa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/07/2018",
        "Description": "RALLY'S LONG BEACH CA                        05/04",
        "Amount": "-8.25",
        "Type": "DEBIT_CARD",
        "Balance": "4392.41",
        "Check or Slip #": "",
        "TransactionId": "9c0487e35da6b755390fc66e9c7a844d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/07/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              05/03",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "4400.66",
        "Check or Slip #": "",
        "TransactionId": "78c12ca80ef2a68ff244ed620aa073b2"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "05/04/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "338.24",
        "Type": "ACH_CREDIT",
        "Balance": "4409.2",
        "Check or Slip #": "",
        "TransactionId": "0d70d7fb3d2165830bb9713311464ac6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/03/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/02",
        "Amount": "-3",
        "Type": "DEBIT_CARD",
        "Balance": "4070.96",
        "Check or Slip #": "",
        "TransactionId": "2ff368608701164a71b07338366d0c1b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/03/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/02",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "4073.96",
        "Check or Slip #": "",
        "TransactionId": "23a515c686783c6ad968dd9835d99d60"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/02/2018",
        "Description": "SQC*TIMOTHY 8774174551 CA                    05/01",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "4078.96",
        "Check or Slip #": "",
        "TransactionId": "1a46eca0bb1f37642383ffacfc83f59c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/02/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                05/01",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "4083.96",
        "Check or Slip #": "",
        "TransactionId": "f14d79b322ff15250d85b525b2a88923"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/02/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              04/29",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "4084.96",
        "Check or Slip #": "",
        "TransactionId": "988062ddacbaa89276a8b64599f482ed"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/02/2018",
        "Description": "Steamgames.com42595229 425-9522985 WA        05/01",
        "Amount": "-29.99",
        "Type": "DEBIT_CARD",
        "Balance": "4093.5",
        "Check or Slip #": "",
        "TransactionId": "c67efdec3685ea4d486600d6d16996bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "05/01/2018",
        "Description": "SQC*KEVENITUS 8774174551 CA                  04/30",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "4123.49",
        "Check or Slip #": "",
        "TransactionId": "367345ccf45777c45248b6496294995f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              04/29",
        "Amount": "-35",
        "Type": "DEBIT_CARD",
        "Balance": "4128.49",
        "Check or Slip #": "",
        "TransactionId": "d02a4812e8bd35c3cd993bc450b9a6df"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2018",
        "Description": "BURGER KING #2119 LONG BEACH CA              04/28",
        "Amount": "-7.93",
        "Type": "DEBIT_CARD",
        "Balance": "4163.49",
        "Check or Slip #": "",
        "TransactionId": "d8c6d66f30878c4857b44da3e77de91d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2018",
        "Description": "SQC*JON PRITCHARD 8774174551 CA              04/28",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "4171.42",
        "Check or Slip #": "",
        "TransactionId": "de1386263792084117ef8e4558759260"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                04/27",
        "Amount": "-1.05",
        "Type": "DEBIT_CARD",
        "Balance": "4176.42",
        "Check or Slip #": "",
        "TransactionId": "0a68d37da7a959f51e90f2b2c1c56cd4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2018",
        "Description": "CARL'S JR #1100037 LONG BEACH CA             04/27",
        "Amount": "-9.65",
        "Type": "DEBIT_CARD",
        "Balance": "4177.47",
        "Check or Slip #": "",
        "TransactionId": "4549f3f641b12dbc0fee4f7ba0baeccc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/30/2018",
        "Description": "STARBUCKS STORE 05721 LONG BEACH CA          04/26",
        "Amount": "-2.37",
        "Type": "DEBIT_CARD",
        "Balance": "4187.12",
        "Check or Slip #": "",
        "TransactionId": "0793bd7eac0f24347f46c534676e9006"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/27/2018",
        "Description": "ALDI 79047 LONG BEACH CA             654725  04/27",
        "Amount": "-11.29",
        "Type": "DEBIT_CARD",
        "Balance": "4189.49",
        "Check or Slip #": "",
        "TransactionId": "c0faa3d9a3ec305ca0113181b2a87efd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/27/2018",
        "Description": "ATM WITHDRAWAL                       000454  04/273901 ATLA",
        "Amount": "-100",
        "Type": "ATM",
        "Balance": "4200.78",
        "Check or Slip #": "",
        "TransactionId": "3bc3d4c5449de5b8e64f5974d401aa62"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/27/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                04/26",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "4300.78",
        "Check or Slip #": "",
        "TransactionId": "f25af257be4266b264262a25aefc5d82"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/27/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "346.11",
        "Type": "ACH_CREDIT",
        "Balance": "4301.78",
        "Check or Slip #": "",
        "TransactionId": "4673f8c2f52a091dab9edd0166f40612"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/26/2018",
        "Description": "SQC*JACK 8774174551 CA                       04/25",
        "Amount": "-4.75",
        "Type": "DEBIT_CARD",
        "Balance": "3955.67",
        "Check or Slip #": "",
        "TransactionId": "d5f6b92bea861c889aad4fcb9998a57c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/25/2018",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    04/24",
        "Amount": "-5.68",
        "Type": "DEBIT_CARD",
        "Balance": "3960.42",
        "Check or Slip #": "",
        "TransactionId": "26673c473f32e772fd866f762fe96f2d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/25/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              04/22",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "3966.1",
        "Check or Slip #": "",
        "TransactionId": "6fbc01f16451e6f9accafaa5eec0a4ae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/24/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                04/23",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "3974.64",
        "Check or Slip #": "",
        "TransactionId": "2a8ee3f28f80c2f5f58c8257eaa6b309"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/24/2018",
        "Description": "TACO BELL 2828 LONG BEACH CA                 04/23",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "3975.64",
        "Check or Slip #": "",
        "TransactionId": "4f089fb00d32c7667ff81d43de0f1295"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         04/23",
        "Amount": "-22.57",
        "Type": "DEBIT_CARD",
        "Balance": "3981.15",
        "Check or Slip #": "",
        "TransactionId": "0d83545e29922ec0c30727532a92be18"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              04/22",
        "Amount": "-34",
        "Type": "DEBIT_CARD",
        "Balance": "4003.72",
        "Check or Slip #": "",
        "TransactionId": "984af17db4e620e9442d42d9e583ca54"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2018",
        "Description": "COSTCO WHSE #1050 LAKEWOOD CA        578144  04/22",
        "Amount": "-4.93",
        "Type": "DEBIT_CARD",
        "Balance": "4037.72",
        "Check or Slip #": "",
        "TransactionId": "b71774421b40006cea0f9d03e72a87fa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         04/22",
        "Amount": "-14.99",
        "Type": "DEBIT_CARD",
        "Balance": "4042.65",
        "Check or Slip #": "",
        "TransactionId": "1250a64416dac4b9cb12f89c66a94ad9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2018",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    04/21",
        "Amount": "-8.76",
        "Type": "DEBIT_CARD",
        "Balance": "4057.64",
        "Check or Slip #": "",
        "TransactionId": "1e01e04f1dbe095d20925d8d5eca2dfd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             04/21",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "4066.4",
        "Check or Slip #": "",
        "TransactionId": "0ece51151a28fa4da162a191b2649449"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2018",
        "Description": "DENNY'S #7212 18007336 LONG BEACH CA         04/20",
        "Amount": "-22.58",
        "Type": "DEBIT_CARD",
        "Balance": "4067.5",
        "Check or Slip #": "",
        "TransactionId": "6f136887c337ca68af32a5ff788060ea"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              04/18",
        "Amount": "-8.54",
        "Type": "DEBIT_CARD",
        "Balance": "4090.08",
        "Check or Slip #": "",
        "TransactionId": "2edd4330087c8e7104f471b0446719e5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2018",
        "Description": "SQC*Square Cash VISA DIRECT CA       310428  04/22",
        "Amount": "14.77",
        "Type": "DEBIT_CARD",
        "Balance": "4098.62",
        "Check or Slip #": "",
        "TransactionId": "d994587a1574a3eaeccf45f54d5bacec"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/23/2018",
        "Description": "SQC*Square Cash VISA DIRECT CA       321779  04/22",
        "Amount": "14.78",
        "Type": "DEBIT_CARD",
        "Balance": "4083.85",
        "Check or Slip #": "",
        "TransactionId": "db6b6389af58c3d2146cee0521676cec"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/20/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "336.96",
        "Type": "ACH_CREDIT",
        "Balance": "4069.07",
        "Check or Slip #": "",
        "TransactionId": "f9ba9ccf47f5a138adc1f7e4d4b63175"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/18/2018",
        "Description": "BURGER KING #2119 LONG BEACH CA              04/16",
        "Amount": "-9.36",
        "Type": "DEBIT_CARD",
        "Balance": "3732.11",
        "Check or Slip #": "",
        "TransactionId": "b118e82e53268c462201cba1bee3e296"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/17/2018",
        "Description": "SQC*SQUARE CASH 8774174551 CA                04/16",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "3741.47",
        "Check or Slip #": "",
        "TransactionId": "9d88ea412ddfed9ddc7b68744c2e9f75"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/16/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         04/16",
        "Amount": "-25.63",
        "Type": "DEBIT_CARD",
        "Balance": "3746.47",
        "Check or Slip #": "",
        "TransactionId": "cde4a22322a5aee1be4158146c34e179"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/16/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              04/15",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "3772.1",
        "Check or Slip #": "",
        "TransactionId": "22217e9a7a41b7114289df104d317c69"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/16/2018",
        "Description": "TACO BELL 2828 LONG BEACH CA                 04/15",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "3809.1",
        "Check or Slip #": "",
        "TransactionId": "477f2a6af8669ad2f780a36281187eb0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/16/2018",
        "Description": "JACK IN THE BOX 5409 SIGNAL HILLS CA         04/14",
        "Amount": "-6.22",
        "Type": "DEBIT_CARD",
        "Balance": "3814.61",
        "Check or Slip #": "",
        "TransactionId": "81b55ee7defede2d76e442ecf6196b15"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/16/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             04/14",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "3820.83",
        "Check or Slip #": "",
        "TransactionId": "58d942fce6d1e43c1d9b0fda17b15507"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/16/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             04/13",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "3821.93",
        "Check or Slip #": "",
        "TransactionId": "a9c9ce0e78c4ff057b9891e407a6f671"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/16/2018",
        "Description": "PACIFIC BAPTIST CHURCH LONG BEACH CA         04/13",
        "Amount": "-498.5",
        "Type": "DEBIT_CARD",
        "Balance": "3823.03",
        "Check or Slip #": "",
        "TransactionId": "a742933ae38a644d376d85b8ad3e3a29"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/13/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "367.04",
        "Type": "ACH_CREDIT",
        "Balance": "4321.53",
        "Check or Slip #": "",
        "TransactionId": "8605eeb3a284d20ec3d0849cfad630b9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/12/2018",
        "Description": "COSTCO WHSE #0424 SIGNAL HILL CA     090767  04/12",
        "Amount": "-3.45",
        "Type": "DEBIT_CARD",
        "Balance": "3954.49",
        "Check or Slip #": "",
        "TransactionId": "dab9c23a4d8b29612e29595850140ab2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/10/2018",
        "Description": "TACO BELL 2828 LONG BEACH CA                 04/09",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "3957.94",
        "Check or Slip #": "",
        "TransactionId": "4c9600edc555beee9415773f35371f78"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/09/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         04/09",
        "Amount": "-24.92",
        "Type": "DEBIT_CARD",
        "Balance": "3963.45",
        "Check or Slip #": "",
        "TransactionId": "d465be99dc52cfa0aa4c8c37f54c30be"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/09/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              04/08",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "3988.37",
        "Check or Slip #": "",
        "TransactionId": "b3334f790aed3a876eb40ff0462c503c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/09/2018",
        "Description": "BURGER KING #2119 LONG BEACH CA              04/07",
        "Amount": "-8.81",
        "Type": "DEBIT_CARD",
        "Balance": "4024.37",
        "Check or Slip #": "",
        "TransactionId": "069da8dd9a4a26e1eba47211ef29f66a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/09/2018",
        "Description": "TRIPLE-T GARDENA CA                          04/08",
        "Amount": "-6.87",
        "Type": "DEBIT_CARD",
        "Balance": "4033.18",
        "Check or Slip #": "",
        "TransactionId": "6d4c8abf3dc781a8e08bf6d9cb7b3d35"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/09/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             04/06",
        "Amount": "-2.63",
        "Type": "DEBIT_CARD",
        "Balance": "4040.05",
        "Check or Slip #": "",
        "TransactionId": "d68055badf41dfb1e31feea28eed0ace"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "04/06/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "355.55",
        "Type": "ACH_CREDIT",
        "Balance": "4042.68",
        "Check or Slip #": "",
        "TransactionId": "20401a7ae2e812c583f07a7e7025db6f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/05/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             04/03",
        "Amount": "-3.96",
        "Type": "DEBIT_CARD",
        "Balance": "3687.13",
        "Check or Slip #": "",
        "TransactionId": "0be1bbf7972f345461085f20a0137dac"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/04/2018",
        "Description": "GOOGLE *Pay g.co/walleth# CA                 04/03",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "3691.09",
        "Check or Slip #": "",
        "TransactionId": "f4d8f927b8d33b21d72237e6fd24d821"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/04/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             04/02",
        "Amount": "-3.31",
        "Type": "DEBIT_CARD",
        "Balance": "3692.09",
        "Check or Slip #": "",
        "TransactionId": "81b453ee68663b3950a6604ad262cd44"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/03/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         04/03",
        "Amount": "-26.87",
        "Type": "DEBIT_CARD",
        "Balance": "3695.4",
        "Check or Slip #": "",
        "TransactionId": "e1768e3c99c40311b673c1f2465bc902"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/02/2018",
        "Description": "PHO AMERICA LONG BEACH CA                    04/01",
        "Amount": "-4.85",
        "Type": "DEBIT_CARD",
        "Balance": "3722.27",
        "Check or Slip #": "",
        "TransactionId": "00c33d77a65fe721012b92ea9d44ad79"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/02/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              04/01",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "3727.12",
        "Check or Slip #": "",
        "TransactionId": "ec42ad31e7ba842283a6cd3751b568a0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/02/2018",
        "Description": "ALBARITOS MEXICAN FRES LONG BEACH CA         04/01",
        "Amount": "-9.03",
        "Type": "DEBIT_CARD",
        "Balance": "3764.12",
        "Check or Slip #": "",
        "TransactionId": "ae5a3cd5d4682e51b2b776893120d7ed"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/02/2018",
        "Description": "BASKIN #361369 Q35 LONG BEACH CA             03/31",
        "Amount": "-1.5",
        "Type": "DEBIT_CARD",
        "Balance": "3773.15",
        "Check or Slip #": "",
        "TransactionId": "1dcf59e30def29a37be92963fd867008"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/02/2018",
        "Description": "TACO BELL 2828 LONG BEACH CA                 03/31",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "3774.65",
        "Check or Slip #": "",
        "TransactionId": "b6669ab57567f75c418c1839368c9aae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/02/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             03/31",
        "Amount": "-3.19",
        "Type": "DEBIT_CARD",
        "Balance": "3780.16",
        "Check or Slip #": "",
        "TransactionId": "6474cfcebe262cc5f1d8b8bd53e6c2e1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "04/02/2018",
        "Description": "OLIVE GARDEN  00044313 CARSON CA             03/31",
        "Amount": "-31.03",
        "Type": "DEBIT_CARD",
        "Balance": "3783.35",
        "Check or Slip #": "",
        "TransactionId": "0bec5cbe06cbb7719fb7a02a19fcbb0d"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/30/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "369.26",
        "Type": "ACH_CREDIT",
        "Balance": "3814.38",
        "Check or Slip #": "",
        "TransactionId": "f4ff306a19ff9003c050d4a292fc2b69"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/29/2018",
        "Description": "GOOGLE *Pay g.co/walleth# CA                 03/28",
        "Amount": "-8",
        "Type": "DEBIT_CARD",
        "Balance": "3445.12",
        "Check or Slip #": "",
        "TransactionId": "e082a731483ae97f28a5c7e104199b8c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/28/2018",
        "Description": "AmazonPrime Membersh amzn.com/prme WA        03/28",
        "Amount": "-109.15",
        "Type": "DEBIT_CARD",
        "Balance": "3453.12",
        "Check or Slip #": "",
        "TransactionId": "a211554d7a9e6ed3ad8a7ddc8a3537cc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/28/2018",
        "Description": "SQC*SQUARE CASH .  / CA                      03/27",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "3562.27",
        "Check or Slip #": "",
        "TransactionId": "1ae75a7b180018c5d784cd5743b89ec0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/28/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              03/25",
        "Amount": "-0.33",
        "Type": "DEBIT_CARD",
        "Balance": "3572.27",
        "Check or Slip #": "",
        "TransactionId": "a6c9e4fc08d6345c7daf0cce51390b06"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/28/2018",
        "Description": "AmazonPrime Membersh amzn.com/prme WA        03/28",
        "Amount": "109.15",
        "Type": "DEBIT_CARD",
        "Balance": "3572.6",
        "Check or Slip #": "",
        "TransactionId": "581f2037d604680f93b91ba1b07cbea3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              03/25",
        "Amount": "-60",
        "Type": "DEBIT_CARD",
        "Balance": "3463.45",
        "Check or Slip #": "",
        "TransactionId": "30e50aa12edc2a043a132d0b90052cd6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2018",
        "Description": "TACO BELL 2828 LONG BEACH CA                 03/25",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "3523.45",
        "Check or Slip #": "",
        "TransactionId": "e0237069ab9fac8bc73762d2cf0396eb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2018",
        "Description": "WIENERSCHNITZEL 150 LONG BEACH CA            03/25",
        "Amount": "-6.37",
        "Type": "DEBIT_CARD",
        "Balance": "3528.96",
        "Check or Slip #": "",
        "TransactionId": "ecf86e0018dd7f4581b23ef358e80329"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2018",
        "Description": "WIENERSCHNITZEL 150 LONG BEACH CA            03/25",
        "Amount": "-3.96",
        "Type": "DEBIT_CARD",
        "Balance": "3535.33",
        "Check or Slip #": "",
        "TransactionId": "99e61e8bf317b73cd9e094325139f2ef"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2018",
        "Description": "SMART & FINAL 4 LONG BEACH CA                03/24",
        "Amount": "-40.64",
        "Type": "DEBIT_CARD",
        "Balance": "3539.29",
        "Check or Slip #": "",
        "TransactionId": "c806ab9d0f383b0edeb80355b2e74c72"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2018",
        "Description": "PHILLYS BEST LONG BEACH CA                   03/24",
        "Amount": "-9.41",
        "Type": "DEBIT_CARD",
        "Balance": "3579.93",
        "Check or Slip #": "",
        "TransactionId": "572066305e19a0b8a27a49f7c1a6588c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2018",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               03/23",
        "Amount": "-3.63",
        "Type": "DEBIT_CARD",
        "Balance": "3589.34",
        "Check or Slip #": "",
        "TransactionId": "991c178f6832beb7a591ac7e19384f0a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/26/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               03/23",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "3592.97",
        "Check or Slip #": "",
        "TransactionId": "0fd7dfbb1ca07e074798d663cededba1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/23/2018",
        "Description": "RAISING CANE'S #337 LAKEWOOD CA              03/20",
        "Amount": "-8.87",
        "Type": "DEBIT_CARD",
        "Balance": "3598.48",
        "Check or Slip #": "",
        "TransactionId": "e1286b47a2e3e93a99d9d10f94c09595"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/23/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "367.36",
        "Type": "ACH_CREDIT",
        "Balance": "3607.35",
        "Check or Slip #": "",
        "TransactionId": "eb270134a68dbc5f16b4cbc0b729986a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/22/2018",
        "Description": "POLLY'S PIES #203 LONG BEACH CA              03/21",
        "Amount": "-8.81",
        "Type": "DEBIT_CARD",
        "Balance": "3239.99",
        "Check or Slip #": "",
        "TransactionId": "3d18a92de997ec8cc6be8bc8321d7416"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/21/2018",
        "Description": "IRS  TREAS 310     TAX REF                  PPD ID: 9111736946",
        "Amount": "225",
        "Type": "ACH_CREDIT",
        "Balance": "3248.8",
        "Check or Slip #": "",
        "TransactionId": "2c1a26ea452d583c89915744dc7cf926"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/20/2018",
        "Description": "PANERA BREAD #601118 LAKEWOOD CA             03/19",
        "Amount": "-4.59",
        "Type": "DEBIT_CARD",
        "Balance": "3023.8",
        "Check or Slip #": "",
        "TransactionId": "6a05017373d2849c69d738670c885cba"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/20/2018",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    03/19",
        "Amount": "-8.76",
        "Type": "DEBIT_CARD",
        "Balance": "3028.39",
        "Check or Slip #": "",
        "TransactionId": "b37cd448b02d48de124c0115902aa149"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/20/2018",
        "Description": "Amazon.com AMZN.COM/BILL WA                  03/20",
        "Amount": "-23.13",
        "Type": "DEBIT_CARD",
        "Balance": "3037.15",
        "Check or Slip #": "",
        "TransactionId": "796a267c6187ac9065b51f782e46010b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/19/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              03/18",
        "Amount": "-34",
        "Type": "DEBIT_CARD",
        "Balance": "3060.28",
        "Check or Slip #": "",
        "TransactionId": "0259929da0274839bb221b06ea6e3449"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/19/2018",
        "Description": "SQ *HANS' HOMEMADE ICE Anaheim CA            03/17",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "3094.28",
        "Check or Slip #": "",
        "TransactionId": "f2c5217e2841d25a07f29e2e4070054d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/19/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             03/17",
        "Amount": "-4.51",
        "Type": "DEBIT_CARD",
        "Balance": "3099.78",
        "Check or Slip #": "",
        "TransactionId": "aeaceb4c8698774b9b90d25b261783b3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/19/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             03/16",
        "Amount": "-3.96",
        "Type": "DEBIT_CARD",
        "Balance": "3104.29",
        "Check or Slip #": "",
        "TransactionId": "b501f6eaca32b527ae710d974ee3f5cf"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/16/2018",
        "Description": "FRANCHISE TAX BD CASTTAXRFD                 PPD ID: 9282532045",
        "Amount": "37",
        "Type": "ACH_CREDIT",
        "Balance": "3108.25",
        "Check or Slip #": "",
        "TransactionId": "3dd3f262fb4a90ef7992da97edd543f6"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/16/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "306.08",
        "Type": "ACH_CREDIT",
        "Balance": "3071.25",
        "Check or Slip #": "",
        "TransactionId": "c0918bb0e250aaec872e592e19f468ad"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/15/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             03/13",
        "Amount": "-3.96",
        "Type": "DEBIT_CARD",
        "Balance": "2765.17",
        "Check or Slip #": "",
        "TransactionId": "31efe514fc7bad4c1094559477a435f5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/13/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA         03/13",
        "Amount": "-21.35",
        "Type": "DEBIT_CARD",
        "Balance": "2769.13",
        "Check or Slip #": "",
        "TransactionId": "8fe5fae60dadc549479d9136289b0eee"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/12/2018",
        "Description": "WENDY'S 844 LONG BEACH CA                    03/11",
        "Amount": "-4.41",
        "Type": "DEBIT_CARD",
        "Balance": "2790.48",
        "Check or Slip #": "",
        "TransactionId": "6ac229c1d5e7a811446265d6e2dd302b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/12/2018",
        "Description": "AFTERS ICE CREAM LONG BEACH CA               03/12",
        "Amount": "-6.9",
        "Type": "DEBIT_CARD",
        "Balance": "2794.89",
        "Check or Slip #": "",
        "TransactionId": "fe3e910d2fe75e8035cb980d5a2d8b3f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/12/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              03/11",
        "Amount": "-31",
        "Type": "DEBIT_CARD",
        "Balance": "2801.79",
        "Check or Slip #": "",
        "TransactionId": "03e1858b5568bb8e7becf6f690002f82"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/12/2018",
        "Description": "TACO BELL 2828 LONG BEACH CA                 03/11",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "2832.79",
        "Check or Slip #": "",
        "TransactionId": "7af4327481ef55cf08f5feb14199e82c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/12/2018",
        "Description": "STARBUCKS STORE 05721 LONG BEACH CA          03/09",
        "Amount": "-3.6",
        "Type": "DEBIT_CARD",
        "Balance": "2838.3",
        "Check or Slip #": "",
        "TransactionId": "f0df6c522d7f2c0f022ef6f891bc5b07"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/12/2018",
        "Description": "PACIFIC BAPTIST CHURCH LONG BEACH CA         03/09",
        "Amount": "-499",
        "Type": "DEBIT_CARD",
        "Balance": "2841.9",
        "Check or Slip #": "",
        "TransactionId": "f9eba826741aed0dc50f9f2f2439155c"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/09/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "306.68",
        "Type": "ACH_CREDIT",
        "Balance": "3340.9",
        "Check or Slip #": "",
        "TransactionId": "a63e9af5dac268b1eefd30cb73a46810"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2018",
        "Description": "Amazon.com AMZN.COM/BILL WA                  03/07",
        "Amount": "-22.04",
        "Type": "DEBIT_CARD",
        "Balance": "3034.22",
        "Check or Slip #": "",
        "TransactionId": "4b5c31e4ba2c039084005a5280dd5246"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2018",
        "Description": "AMAZON MKTPLACE PMTS AMZN.COM/BILL WA        03/06",
        "Amount": "-5.68",
        "Type": "DEBIT_CARD",
        "Balance": "3056.26",
        "Check or Slip #": "",
        "TransactionId": "7e66b697131c8bbda3758a77ff544501"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/07/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             03/05",
        "Amount": "-2.86",
        "Type": "DEBIT_CARD",
        "Balance": "3061.94",
        "Check or Slip #": "",
        "TransactionId": "ef230298c686bf80c3b2a5b4da23d1f5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/05/2018",
        "Description": "ALDI 79047 LONG BEACH CA             596567  03/05",
        "Amount": "-21.8",
        "Type": "DEBIT_CARD",
        "Balance": "3064.8",
        "Check or Slip #": "",
        "TransactionId": "8cac2cb4ad4a6fa8eaff46f397dac2b0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/05/2018",
        "Description": "THE BUFFALO SPOT LONG BEACH CA               03/05",
        "Amount": "-16.16",
        "Type": "DEBIT_CARD",
        "Balance": "3086.6",
        "Check or Slip #": "",
        "TransactionId": "34085da071d77d412eb195af98f78887"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/05/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              03/04",
        "Amount": "-34",
        "Type": "DEBIT_CARD",
        "Balance": "3102.76",
        "Check or Slip #": "",
        "TransactionId": "077da6bb76bb64b87228c89fcf0a503f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/05/2018",
        "Description": "PANDA EXPRESS 783 LONG BEACH CA              03/03",
        "Amount": "-10.25",
        "Type": "DEBIT_CARD",
        "Balance": "3136.76",
        "Check or Slip #": "",
        "TransactionId": "1d09a92f3bdcff89163c921a07e3b787"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/05/2018",
        "Description": "MCDONALD'S F7765 714-952-3821 CA             03/03",
        "Amount": "-4.4",
        "Type": "DEBIT_CARD",
        "Balance": "3147.01",
        "Check or Slip #": "",
        "TransactionId": "3a00be00e786ab8bcf3df6b9074a3667"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "03/02/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "332.87",
        "Type": "ACH_CREDIT",
        "Balance": "3151.41",
        "Check or Slip #": "",
        "TransactionId": "fed507941bf9bc833f607492ac73d6ba"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "03/01/2018",
        "Description": "99 CENTS ONLY STORES #2 LONG BEACH CA        02/28",
        "Amount": "-4.46",
        "Type": "DEBIT_CARD",
        "Balance": "2818.54",
        "Check or Slip #": "",
        "TransactionId": "06e08e95c82294edb3211b501c52b6eb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/28/2018",
        "Description": "AMAZON MKTPLACE PMTS AMZN.COM/BILL WA        02/28",
        "Amount": "-20.93",
        "Type": "DEBIT_CARD",
        "Balance": "2823",
        "Check or Slip #": "",
        "TransactionId": "a7ddbdb2b37f5981ecb656178c663ef6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/27/2018",
        "Description": "BEST BUY #127 LAKEWOOD CA                    02/26",
        "Amount": "-227.75",
        "Type": "DEBIT_CARD",
        "Balance": "2843.93",
        "Check or Slip #": "",
        "TransactionId": "387dad88a717a3c5e87624d5f5a4307e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/27/2018",
        "Description": "PANERA BREAD #601118 LAKEWOOD CA             02/26",
        "Amount": "-4.89",
        "Type": "DEBIT_CARD",
        "Balance": "3071.68",
        "Check or Slip #": "",
        "TransactionId": "059267478477d0062479e463a8a6bb24"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/27/2018",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    02/26",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "3076.57",
        "Check or Slip #": "",
        "TransactionId": "a8e987318415e3584dee5fa377c2056b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/26/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              02/25",
        "Amount": "-31",
        "Type": "DEBIT_CARD",
        "Balance": "3080.95",
        "Check or Slip #": "",
        "TransactionId": "0b56615642ddd9a8fc9dea556b7fe4bc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/26/2018",
        "Description": "WAL-MART #2609 LAKEWOOD CA                   02/24",
        "Amount": "-36.14",
        "Type": "DEBIT_CARD",
        "Balance": "3111.95",
        "Check or Slip #": "",
        "TransactionId": "bd6874b7b93ad8b734486f494bdd6465"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/26/2018",
        "Description": "PAYPAL *WISH 402-935-7733 CA                 02/23",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "3148.09",
        "Check or Slip #": "",
        "TransactionId": "0d4ca8ff720043b0341585ad0e635cb6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/23/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         02/21",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "3149.09",
        "Check or Slip #": "",
        "TransactionId": "08ba38643f70bfe76bbb1e488e220db7"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/23/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "307.98",
        "Type": "ACH_CREDIT",
        "Balance": "3150.19",
        "Check or Slip #": "",
        "TransactionId": "aeb6a32037a26ae7caf7c2016ad58c55"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/21/2018",
        "Description": "DENNY'S #7212 18007336 LONG BEACH CA         02/19",
        "Amount": "-14.04",
        "Type": "DEBIT_CARD",
        "Balance": "2842.21",
        "Check or Slip #": "",
        "TransactionId": "19213fc98c06b36c21035978be88bf4c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/20/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA 497921  02/20",
        "Amount": "-34.65",
        "Type": "DEBIT_CARD",
        "Balance": "2856.25",
        "Check or Slip #": "",
        "TransactionId": "09acb019d76ab9c3355bfdeeacacf8df"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/20/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              02/18",
        "Amount": "-37",
        "Type": "DEBIT_CARD",
        "Balance": "2890.9",
        "Check or Slip #": "",
        "TransactionId": "feff4575c7270f0cc1ffa703365d4501"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/20/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         02/16",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2927.9",
        "Check or Slip #": "",
        "TransactionId": "954d91b6f42d97af90e4f79bf563996d"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/16/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "370.14",
        "Type": "ACH_CREDIT",
        "Balance": "2929",
        "Check or Slip #": "",
        "TransactionId": "e923c48a2a95a878508c7f5bc5cb8190"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/14/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               02/12",
        "Amount": "-9.37",
        "Type": "DEBIT_CARD",
        "Balance": "2558.86",
        "Check or Slip #": "",
        "TransactionId": "a2d7a16229561a3ddd1cacfdbb9948d5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/12/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA 751125  02/12",
        "Amount": "-28.74",
        "Type": "DEBIT_CARD",
        "Balance": "2568.23",
        "Check or Slip #": "",
        "TransactionId": "cac06e189779da17c4cf7a502849b4e7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/12/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              02/11",
        "Amount": "-36",
        "Type": "DEBIT_CARD",
        "Balance": "2596.97",
        "Check or Slip #": "",
        "TransactionId": "a2ab0bc4359c152cff87a38f90f78aa0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/12/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         02/10",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2632.97",
        "Check or Slip #": "",
        "TransactionId": "c924c77adaf3496d6a19e2f216408308"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/12/2018",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               02/08",
        "Amount": "-3.31",
        "Type": "DEBIT_CARD",
        "Balance": "2634.07",
        "Check or Slip #": "",
        "TransactionId": "cd26c021cdcf5942fcc2470069fd2806"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/09/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "356.11",
        "Type": "ACH_CREDIT",
        "Balance": "2637.38",
        "Check or Slip #": "",
        "TransactionId": "42e8fbcd154617a80e50f4f4ed7b010e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/08/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA 119571  02/08",
        "Amount": "-6.97",
        "Type": "DEBIT_CARD",
        "Balance": "2281.27",
        "Check or Slip #": "",
        "TransactionId": "ecea73f72bb22d2b5095278409cc0e5e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/07/2018",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               02/05",
        "Amount": "-7.7",
        "Type": "DEBIT_CARD",
        "Balance": "2288.24",
        "Check or Slip #": "",
        "TransactionId": "714ad6cf02491f3197757f389c0b0dcb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/06/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              02/05",
        "Amount": "-40",
        "Type": "DEBIT_CARD",
        "Balance": "2295.94",
        "Check or Slip #": "",
        "TransactionId": "7a3b6f5ed63529803c84d011c7101e0d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/05/2018",
        "Description": "ALDI 79047 LONG BEACH CA             905321  02/05",
        "Amount": "-28.81",
        "Type": "DEBIT_CARD",
        "Balance": "2335.94",
        "Check or Slip #": "",
        "TransactionId": "14616be1b5e99c930cce6bb8656ae041"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/05/2018",
        "Description": "SQC*GEORGE OSPINA .  / CA                    02/04",
        "Amount": "-5.5",
        "Type": "DEBIT_CARD",
        "Balance": "2364.75",
        "Check or Slip #": "",
        "TransactionId": "ed437eb5315f86449a113a6a03e94f41"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/05/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         02/02",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2370.25",
        "Check or Slip #": "",
        "TransactionId": "f416de50d4346464aa0f418b7b97aab1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/05/2018",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               02/02",
        "Amount": "-3.19",
        "Type": "DEBIT_CARD",
        "Balance": "2371.35",
        "Check or Slip #": "",
        "TransactionId": "47c94e0d4ba2c04ed05456870a533c19"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/05/2018",
        "Description": "PACIFIC BAPTIST CHURCH LONG BEACH CA         02/02",
        "Amount": "-498",
        "Type": "DEBIT_CARD",
        "Balance": "2374.54",
        "Check or Slip #": "",
        "TransactionId": "133ab00d3eb835c43f658fb1886864b3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "02/02/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/31",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2872.54",
        "Check or Slip #": "",
        "TransactionId": "4b14f304d8cbfd8ede27f174887202a5"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "02/02/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "376.99",
        "Type": "ACH_CREDIT",
        "Balance": "2873.64",
        "Check or Slip #": "",
        "TransactionId": "791e1cf39fdb57567c3af828d8951671"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/30/2018",
        "Description": "ARBY'S #1314 LONG BEACH CA                   01/29",
        "Amount": "-7.25",
        "Type": "DEBIT_CARD",
        "Balance": "2496.65",
        "Check or Slip #": "",
        "TransactionId": "15562484ce0ee28bcf2901bb5a744b63"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2018",
        "Description": "ALDI 79047 LONG BEACH CA             510569  01/29",
        "Amount": "-25.77",
        "Type": "DEBIT_CARD",
        "Balance": "2503.9",
        "Check or Slip #": "",
        "TransactionId": "20143bfc577857bb9a3daff3f597cd7b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2018",
        "Description": "HOBBYLOBBY 4001 HARDWI LAKEWOOD CA   953886  01/29",
        "Amount": "-3.25",
        "Type": "DEBIT_CARD",
        "Balance": "2529.67",
        "Check or Slip #": "",
        "TransactionId": "1194e02342a3c66e7a1893e6c222d3b7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2018",
        "Description": "WAL-MART #2609 LAKEWOOD CA                   01/29",
        "Amount": "-6.12",
        "Type": "DEBIT_CARD",
        "Balance": "2532.92",
        "Check or Slip #": "",
        "TransactionId": "24c1ce05293f4d89cb7d7abfaf0c0a59"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2018",
        "Description": "SQC*TIMOTHY .  / CA                          01/28",
        "Amount": "-10",
        "Type": "DEBIT_CARD",
        "Balance": "2539.04",
        "Check or Slip #": "",
        "TransactionId": "f47d4a1f1c801863f23fa2c2c2ae1a45"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              01/28",
        "Amount": "-31",
        "Type": "DEBIT_CARD",
        "Balance": "2549.04",
        "Check or Slip #": "",
        "TransactionId": "3da4577e84df9631b41c4059bba312c5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2018",
        "Description": "SQC*GEORGE OSPINA .  / CA                    01/28",
        "Amount": "-7",
        "Type": "DEBIT_CARD",
        "Balance": "2580.04",
        "Check or Slip #": "",
        "TransactionId": "5b610644a9fdbc4809c8b02e29ba819a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/29/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/27",
        "Amount": "-1.7",
        "Type": "DEBIT_CARD",
        "Balance": "2587.04",
        "Check or Slip #": "",
        "TransactionId": "deaa6f12e2c8ad433cb1c7ef53c4f13a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/26/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/25",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2588.74",
        "Check or Slip #": "",
        "TransactionId": "c0a6e321844e0b56d5c808ff4d622910"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/26/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "305.47",
        "Type": "ACH_CREDIT",
        "Balance": "2589.84",
        "Check or Slip #": "",
        "TransactionId": "c7258bca47825677c233842b6e504ccc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              01/21",
        "Amount": "-31",
        "Type": "DEBIT_CARD",
        "Balance": "2284.37",
        "Check or Slip #": "",
        "TransactionId": "ea087b5a92a2dbea108a5ef12842af57"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2018",
        "Description": "ALDI 79047 LONG BEACH CA             419294  01/20",
        "Amount": "-25.51",
        "Type": "DEBIT_CARD",
        "Balance": "2315.37",
        "Check or Slip #": "",
        "TransactionId": "19a4782794821647c532178617faf68b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2018",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               01/20",
        "Amount": "-2.21",
        "Type": "DEBIT_CARD",
        "Balance": "2340.88",
        "Check or Slip #": "",
        "TransactionId": "c90d09d9c18e6b08b9f88230a8506f1e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/19",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2343.09",
        "Check or Slip #": "",
        "TransactionId": "b993e4d9e19864a30a80e187c9eec096"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/22/2018",
        "Description": "SQC*JENNIFER ESPOSI .  / CA                  01/19",
        "Amount": "-12",
        "Type": "DEBIT_CARD",
        "Balance": "2344.19",
        "Check or Slip #": "",
        "TransactionId": "662192a1e40f6330ea158372bc496847"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/19/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/18",
        "Amount": "-0.6",
        "Type": "DEBIT_CARD",
        "Balance": "2356.19",
        "Check or Slip #": "",
        "TransactionId": "175a12c7eb2678e332411075ae9337a3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/19/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/17",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2356.79",
        "Check or Slip #": "",
        "TransactionId": "c4b2b8afdf5f76f9ca70a352e88b32d2"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/19/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "307.35",
        "Type": "ACH_CREDIT",
        "Balance": "2357.89",
        "Check or Slip #": "",
        "TransactionId": "08eb7b72875a1846e2a222f7ed1b95a8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/18/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/17",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2050.54",
        "Check or Slip #": "",
        "TransactionId": "b92769899c4775a94dd354d21f886246"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/18/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/16",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2051.64",
        "Check or Slip #": "",
        "TransactionId": "35c985c9353ae8fdc9c18d697c0e5663"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/17/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/16",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2052.74",
        "Check or Slip #": "",
        "TransactionId": "676ddde8a940326aedca2b736cacb806"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/17/2018",
        "Description": "SQC*JOSEPH ESPOSITO .  / CA                  01/16",
        "Amount": "-9",
        "Type": "DEBIT_CARD",
        "Balance": "2053.84",
        "Check or Slip #": "",
        "TransactionId": "8dddad7eb7493551cfab0c22e826adb0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/16/2018",
        "Description": "ALDI 79047 LONG BEACH CA             690027  01/15",
        "Amount": "-6.67",
        "Type": "DEBIT_CARD",
        "Balance": "2062.84",
        "Check or Slip #": "",
        "TransactionId": "f4bc362a621caaa790351ea43d7365e1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/16/2018",
        "Description": "GAMESTOP #3812 4010 AT LONG BEACH CA 624019  01/15",
        "Amount": "-9.36",
        "Type": "DEBIT_CARD",
        "Balance": "2069.51",
        "Check or Slip #": "",
        "TransactionId": "8cd85f780a353fa973a51363899d14fa"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/16/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              01/14",
        "Amount": "-38",
        "Type": "DEBIT_CARD",
        "Balance": "2078.87",
        "Check or Slip #": "",
        "TransactionId": "13749a171b4f4082d807832916ef0255"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/16/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA 770137  01/14",
        "Amount": "-21.9",
        "Type": "DEBIT_CARD",
        "Balance": "2116.87",
        "Check or Slip #": "",
        "TransactionId": "34bb3ff40e0cf4867c6215035580b28e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/16/2018",
        "Description": "SQC*JONATHAN .  / CA                         01/13",
        "Amount": "-2.21",
        "Type": "DEBIT_CARD",
        "Balance": "2138.77",
        "Check or Slip #": "",
        "TransactionId": "1ba524fd7a4547a69d606559be7ced9f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/16/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/12",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2140.98",
        "Check or Slip #": "",
        "TransactionId": "0f51f264a4e6b5da9bc69410cf2d4bf0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/16/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/11",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2142.08",
        "Check or Slip #": "",
        "TransactionId": "14a0d4e1b2cf17847496bd90172f91f1"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/12/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "117.41",
        "Type": "ACH_CREDIT",
        "Balance": "2143.18",
        "Check or Slip #": "",
        "TransactionId": "43bb0b89fd0adb9737a00cfe0870d4c7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/10/2018",
        "Description": "PACIFIC BAPTIST CHURCH LONG BEACH CA         01/08",
        "Amount": "-498.5",
        "Type": "DEBIT_CARD",
        "Balance": "2025.77",
        "Check or Slip #": "",
        "TransactionId": "7497e3afcad5f09e3e3e70b4c399819d"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "01/05/2018",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "306.13",
        "Type": "ACH_CREDIT",
        "Balance": "2524.27",
        "Check or Slip #": "",
        "TransactionId": "ff0ba49f22ee0dc22397eb4391456a5e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/04/2018",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         01/02",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2218.14",
        "Check or Slip #": "",
        "TransactionId": "47b99bdaac5a7fc16fabc37d1350a754"
    },
    {
        "Details": "DSLIP",
        "Posting Date": "01/04/2018",
        "Description": "REMOTE ONLINE DEPOSIT #          1",
        "Amount": "25",
        "Type": "CHECK_DEPOSIT",
        "Balance": "2219.24",
        "Check or Slip #": "1",
        "TransactionId": "3ea14969b82e9204235503bee04fd65a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/03/2018",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               01/01",
        "Amount": "-4.41",
        "Type": "DEBIT_CARD",
        "Balance": "2194.24",
        "Check or Slip #": "",
        "TransactionId": "4e9db0b664faeabb4f93b077ceaeb196"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2018",
        "Description": "JACK IN THE BOX 5409 SIGNAL HILLS CA         01/02",
        "Amount": "-4.14",
        "Type": "DEBIT_CARD",
        "Balance": "2198.65",
        "Check or Slip #": "",
        "TransactionId": "dce5a7d59df418804e9e0edee5444d63"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2018",
        "Description": "WIENERSCHNITZEL 150 LONG BEACH CA            01/01",
        "Amount": "-2.18",
        "Type": "DEBIT_CARD",
        "Balance": "2202.79",
        "Check or Slip #": "",
        "TransactionId": "c31d2990e9539cee1016084f21ef8456"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2018",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA 356745  12/31",
        "Amount": "-22.9",
        "Type": "DEBIT_CARD",
        "Balance": "2204.97",
        "Check or Slip #": "",
        "TransactionId": "1c5e0759f4d6c2feb3dee068fbaa7528"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2018",
        "Description": "CARLS JR 1100228 LONG BEACH CA               12/31",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "2227.87",
        "Check or Slip #": "",
        "TransactionId": "153d48f8e98b94c19a8c4d6de051738e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              12/31",
        "Amount": "-31",
        "Type": "DEBIT_CARD",
        "Balance": "2233.38",
        "Check or Slip #": "",
        "TransactionId": "3878d5457d5259f5edb16ed78ca0fd86"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2018",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              12/31",
        "Amount": "-31",
        "Type": "DEBIT_CARD",
        "Balance": "2264.38",
        "Check or Slip #": "",
        "TransactionId": "687456e1ab7ba4b05acc133882014593"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "01/02/2018",
        "Description": "TACO BELL 2828 LONG BEACH CA                 12/30",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "2295.38",
        "Check or Slip #": "",
        "TransactionId": "3416b805bd5eb25852b5b43f083f429a"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/29/2017",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "301.44",
        "Type": "ACH_CREDIT",
        "Balance": "2300.89",
        "Check or Slip #": "",
        "TransactionId": "8cbdd94e0de404c20c4489cd010ef251"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2017",
        "Description": "OLIVE GARDEN 877-579-8439 FL                 12/25",
        "Amount": "-50",
        "Type": "DEBIT_CARD",
        "Balance": "1999.45",
        "Check or Slip #": "",
        "TransactionId": "abad6a68a9b2e0416f463ca4b2d353b3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2017",
        "Description": "CARLS JR 1100228 LONG BEACH CA               12/24",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "2049.45",
        "Check or Slip #": "",
        "TransactionId": "eb94fe651a47dc6d935ef8b7e0ec74b6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2017",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA 110191  12/24",
        "Amount": "-21.54",
        "Type": "DEBIT_CARD",
        "Balance": "2054.96",
        "Check or Slip #": "",
        "TransactionId": "e89e7a44d4681526296d551a1f185efe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2017",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              12/24",
        "Amount": "-25",
        "Type": "DEBIT_CARD",
        "Balance": "2076.5",
        "Check or Slip #": "",
        "TransactionId": "d0325c029b15e0b0416b2eeddfce0994"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2017",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    12/23",
        "Amount": "-5.68",
        "Type": "DEBIT_CARD",
        "Balance": "2101.5",
        "Check or Slip #": "",
        "TransactionId": "e1fd56f0de98579e1c19db196a586331"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2017",
        "Description": "ATM WITHDRAWAL                       006746  12/233901 ATLA",
        "Amount": "-20",
        "Type": "ATM",
        "Balance": "2107.18",
        "Check or Slip #": "",
        "TransactionId": "e84f2ffca815c32608b38c3e6ccf7414"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2017",
        "Description": "LONG BEACH CYCLERY LONG BEACH CA     946195  12/23",
        "Amount": "-4.41",
        "Type": "DEBIT_CARD",
        "Balance": "2127.18",
        "Check or Slip #": "",
        "TransactionId": "7f4853491fe45f9503e7066831557e97"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/26/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         12/22",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2131.59",
        "Check or Slip #": "",
        "TransactionId": "cfce2d6413605443b9844948a603eeda"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/22/2017",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "241.91",
        "Type": "ACH_CREDIT",
        "Balance": "2132.69",
        "Check or Slip #": "",
        "TransactionId": "482e080bd20f7dee873ddac13e43aeed"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/21/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         12/20",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1890.78",
        "Check or Slip #": "",
        "TransactionId": "84f2e98d809523188fde46ca5dc6aee7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/20/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         12/19",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1891.88",
        "Check or Slip #": "",
        "TransactionId": "b952d169c02f2d171209913264a64fa7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/20/2017",
        "Description": "IN N OUT BURGER 171 SANTA CLARITA CA         12/19",
        "Amount": "-6.46",
        "Type": "DEBIT_CARD",
        "Balance": "1892.98",
        "Check or Slip #": "",
        "TransactionId": "33e6e299c0a627443e3f341a7da3a733"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/19/2017",
        "Description": "SQC*JOSIAH MEYERS .  / CA                    12/19",
        "Amount": "-6",
        "Type": "DEBIT_CARD",
        "Balance": "1899.44",
        "Check or Slip #": "",
        "TransactionId": "e6959880216ac2d1b5d6fb67b12b32c2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/19/2017",
        "Description": "BEST LOCKERS-SFMMDP VALENCIA CA              12/18",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1905.44",
        "Check or Slip #": "",
        "TransactionId": "f832eec34d8fe653b7438bf0f080a4fc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/19/2017",
        "Description": "WENDY'S 4156 TARZANA CA                      12/18",
        "Amount": "-4.37",
        "Type": "DEBIT_CARD",
        "Balance": "1906.44",
        "Check or Slip #": "",
        "TransactionId": "6aa3cf7dc1d389b16f9bd1ebec54deff"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/18/2017",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA 907589  12/17",
        "Amount": "-13.94",
        "Type": "DEBIT_CARD",
        "Balance": "1910.81",
        "Check or Slip #": "",
        "TransactionId": "50af1c5699233cd2c6a8dcd1d6b405b0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/18/2017",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              12/17",
        "Amount": "-34",
        "Type": "DEBIT_CARD",
        "Balance": "1924.75",
        "Check or Slip #": "",
        "TransactionId": "6efe2f18d6791110476a63e7cc9c938a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/18/2017",
        "Description": "FUDDRUCKERS 3078 LAKEWOOD CA                 12/17",
        "Amount": "-7.67",
        "Type": "DEBIT_CARD",
        "Balance": "1958.75",
        "Check or Slip #": "",
        "TransactionId": "38fe2e92532f2015e2a09eddfc0175ae"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/18/2017",
        "Description": "ALDI 79047 LONG BEACH CA             192540  12/16",
        "Amount": "-12.71",
        "Type": "DEBIT_CARD",
        "Balance": "1966.42",
        "Check or Slip #": "",
        "TransactionId": "5f600313fb7739a74b743d057d267ca9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/18/2017",
        "Description": "VONS     Store  3519 LONG BEACH CA   563817  12/16",
        "Amount": "-9.65",
        "Type": "DEBIT_CARD",
        "Balance": "1979.13",
        "Check or Slip #": "",
        "TransactionId": "1152728e9655d6a819ecf62036fd44a2"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/18/2017",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    12/15",
        "Amount": "-1.3",
        "Type": "DEBIT_CARD",
        "Balance": "1988.78",
        "Check or Slip #": "",
        "TransactionId": "d1bf6ea50ef661775bf5333276ac8fe3"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/15/2017",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "331.13",
        "Type": "ACH_CREDIT",
        "Balance": "1990.08",
        "Check or Slip #": "",
        "TransactionId": "faa401c05ed94003b45b0fbf2f2d5877"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/14/2017",
        "Description": "WM SUPERC Wal-Mart Sup LAKEWOOD CA           12/13",
        "Amount": "-6.66",
        "Type": "DEBIT_CARD",
        "Balance": "1658.95",
        "Check or Slip #": "",
        "TransactionId": "7b4dbf934f5e706e0fb2cf17fc114b01"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/14/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         12/13",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1665.61",
        "Check or Slip #": "",
        "TransactionId": "6e0758062c1237cebf8b421e9152013a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/13/2017",
        "Description": "DENNY'S #7212 18007336 LONG BEACH CA         12/12",
        "Amount": "-19.42",
        "Type": "DEBIT_CARD",
        "Balance": "1666.71",
        "Check or Slip #": "",
        "TransactionId": "d9561f402cbfd7906e39e0e89af09d0b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/12/2017",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    12/11",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "1686.13",
        "Check or Slip #": "",
        "TransactionId": "92049c5ca63fb7e642f1d396b6fc7cdb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/12/2017",
        "Description": "SQC*Square Cash VISA DIRECT CA       168381  12/12",
        "Amount": "13.36",
        "Type": "DEBIT_CARD",
        "Balance": "1690.51",
        "Check or Slip #": "",
        "TransactionId": "e363e056d61ec0a0ba183dad39a87ed8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/11/2017",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              12/10",
        "Amount": "-31",
        "Type": "DEBIT_CARD",
        "Balance": "1677.15",
        "Check or Slip #": "",
        "TransactionId": "f3f23d158a982dd15ce8989bc16f371a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/11/2017",
        "Description": "JACK IN THE BOX 5409 SIGNAL HILLS CA         12/10",
        "Amount": "-4.12",
        "Type": "DEBIT_CARD",
        "Balance": "1708.15",
        "Check or Slip #": "",
        "TransactionId": "c16c926bd483332cc7a3e14352fcaa83"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/11/2017",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA 410309  12/09",
        "Amount": "-28.47",
        "Type": "DEBIT_CARD",
        "Balance": "1712.27",
        "Check or Slip #": "",
        "TransactionId": "ee434faf485e9a47a03697bcc3ec96d9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/11/2017",
        "Description": "WIENERSCHNITZEL 150 LONG BEACH CA            12/09",
        "Amount": "-4.07",
        "Type": "DEBIT_CARD",
        "Balance": "1740.74",
        "Check or Slip #": "",
        "TransactionId": "c2c908c8e273a1eb4da5a2a95b5b4c77"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/11/2017",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               12/09",
        "Amount": "-1.64",
        "Type": "DEBIT_CARD",
        "Balance": "1744.81",
        "Check or Slip #": "",
        "TransactionId": "fab095167ab8faaf7465b849ba1b1eef"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/11/2017",
        "Description": "TARGET T- 950 E 33rd S SIGNAL HILL CA        12/10",
        "Amount": "10.94",
        "Type": "DEBIT_CARD",
        "Balance": "1746.45",
        "Check or Slip #": "",
        "TransactionId": "8d26c69ca1950f600fc338637f7a5413"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/08/2017",
        "Description": "BURGER KING #2119 LONG BEACH CA              12/07",
        "Amount": "-4.4",
        "Type": "DEBIT_CARD",
        "Balance": "1735.51",
        "Check or Slip #": "",
        "TransactionId": "76d888b0a515c86ae38986c4e8c3fa99"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/08/2017",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "306.3",
        "Type": "ACH_CREDIT",
        "Balance": "1739.91",
        "Check or Slip #": "",
        "TransactionId": "1725fed6f8304ca4541d051dd18ee374"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/06/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         12/05",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1433.61",
        "Check or Slip #": "",
        "TransactionId": "1049402076f07b180d5369ee701d1f13"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/06/2017",
        "Description": "SQC*TIMOTHY .  / CA                          12/05",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "1434.71",
        "Check or Slip #": "",
        "TransactionId": "03a60a56d43cf359bec0ce10844c4112"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/05/2017",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA 628247  12/04",
        "Amount": "-28.2",
        "Type": "DEBIT_CARD",
        "Balance": "1439.71",
        "Check or Slip #": "",
        "TransactionId": "c761cf5cf4935533cde4a32acaa3f7da"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/05/2017",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    12/04",
        "Amount": "-2.18",
        "Type": "DEBIT_CARD",
        "Balance": "1467.91",
        "Check or Slip #": "",
        "TransactionId": "3e5c6e5cd1bc4f4f5ccf9b1f242449fe"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/05/2017",
        "Description": "WENDY'S #1467 LAKEWOOD CA                    12/04",
        "Amount": "-4.38",
        "Type": "DEBIT_CARD",
        "Balance": "1470.09",
        "Check or Slip #": "",
        "TransactionId": "3ee997955efc672b9bf7b40e7b732946"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/05/2017",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               12/03",
        "Amount": "-1.64",
        "Type": "DEBIT_CARD",
        "Balance": "1474.47",
        "Check or Slip #": "",
        "TransactionId": "984195a90fca39aa7646b7b25a4a1d03"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/04/2017",
        "Description": "WM SUPERC Wal-Mart Sup LONG BEACH CA         12/04",
        "Amount": "-15.38",
        "Type": "DEBIT_CARD",
        "Balance": "1476.11",
        "Check or Slip #": "",
        "TransactionId": "d0754b565002700aaf150bf4e9d17fbd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/04/2017",
        "Description": "GIV*PACIFIC BAPT 562-4247714 CA              12/03",
        "Amount": "-16",
        "Type": "DEBIT_CARD",
        "Balance": "1491.49",
        "Check or Slip #": "",
        "TransactionId": "41016ea320142818f73bd5b5337994ff"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/04/2017",
        "Description": "CARLS JR 1100228 LONG BEACH CA               12/02",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1507.49",
        "Check or Slip #": "",
        "TransactionId": "ddcccdba700222861c5a4e23309806c0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/04/2017",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               12/02",
        "Amount": "-4.07",
        "Type": "DEBIT_CARD",
        "Balance": "1513",
        "Check or Slip #": "",
        "TransactionId": "da703d6d12890ac64d47c89104cfcdd7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "12/04/2017",
        "Description": "PACIFIC BAPTIST CHURCH LONG BEACH CA         12/01",
        "Amount": "-498.5",
        "Type": "DEBIT_CARD",
        "Balance": "1517.07",
        "Check or Slip #": "",
        "TransactionId": "87c69d6732f6c2dc3e81ee46e1ee9024"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "12/01/2017",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "159.22",
        "Type": "ACH_CREDIT",
        "Balance": "2015.57",
        "Check or Slip #": "",
        "TransactionId": "4a07a8b62ce7b4919bfc69d96015b736"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/28",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1856.35",
        "Check or Slip #": "",
        "TransactionId": "f005cf605317f100af13a5cb03ad5c21"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/29/2017",
        "Description": "BURGER KING #2119 LONG BEACH CA              11/28",
        "Amount": "-3.31",
        "Type": "DEBIT_CARD",
        "Balance": "1857.45",
        "Check or Slip #": "",
        "TransactionId": "0eba475330e9783020a524880bf5a7f3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/28/2017",
        "Description": "PACIFIC BAPTIST CHURCH 562-4247714 CA        11/26",
        "Amount": "-32",
        "Type": "DEBIT_CARD",
        "Balance": "1860.76",
        "Check or Slip #": "",
        "TransactionId": "fe87ae21dd5b260dfd1d936f42042fd0"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/27/2017",
        "Description": "PAYPAL           VERIFYBANK                 PPD ID: PAYPALRD33",
        "Amount": "-0.2",
        "Type": "ACH_DEBIT",
        "Balance": "1892.76",
        "Check or Slip #": "",
        "TransactionId": "978b216198353aef958da13f618dc1f7"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/27/2017",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA 325679  11/25",
        "Amount": "-29.04",
        "Type": "DEBIT_CARD",
        "Balance": "1892.96",
        "Check or Slip #": "",
        "TransactionId": "805329592071f9dc7d10e5560ec896ea"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/27/2017",
        "Description": "TACO BELL 2828 LONG BEACH CA                 11/25",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1922",
        "Check or Slip #": "",
        "TransactionId": "288517cf21aceb5bd72da5cf31df609c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/27/2017",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               11/25",
        "Amount": "-1.64",
        "Type": "DEBIT_CARD",
        "Balance": "1927.51",
        "Check or Slip #": "",
        "TransactionId": "410994575673e81125120747c9aa9a3b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/27/2017",
        "Description": "WENDY'S 9060 SANTA CLARITA CA                11/24",
        "Amount": "-4.82",
        "Type": "DEBIT_CARD",
        "Balance": "1929.15",
        "Check or Slip #": "",
        "TransactionId": "644d83e1dcb0087dbc152d3ce5d1eb70"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/27/2017",
        "Description": "SQC*JONATHAN .  / CA                         11/25",
        "Amount": "-4.99",
        "Type": "DEBIT_CARD",
        "Balance": "1933.97",
        "Check or Slip #": "",
        "TransactionId": "cf236fb17d935d88db67fa4d7e9dd185"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/27/2017",
        "Description": "AMAZON MKTPLACE PMTS AMZN.COM/BILL WA        11/27",
        "Amount": "-20.49",
        "Type": "DEBIT_CARD",
        "Balance": "1938.96",
        "Check or Slip #": "",
        "TransactionId": "34d7c599e90aa1dfceb74002db3d081a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/27/2017",
        "Description": "SQC*GERVINE MARANAN .  / CA                  11/24",
        "Amount": "-7.5",
        "Type": "DEBIT_CARD",
        "Balance": "1959.45",
        "Check or Slip #": "",
        "TransactionId": "20d9222238a5cf5a6bdd6dbc7fabfcda"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/27/2017",
        "Description": "PAYPAL           VERIFYBANK                 PPD ID: PAYPALRD33",
        "Amount": "0.09",
        "Type": "ACH_CREDIT",
        "Balance": "1966.95",
        "Check or Slip #": "",
        "TransactionId": "2860b09bf9a5a50bdc59261408753e35"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/27/2017",
        "Description": "PAYPAL           VERIFYBANK                 PPD ID: PAYPALRD33",
        "Amount": "0.11",
        "Type": "ACH_CREDIT",
        "Balance": "1966.86",
        "Check or Slip #": "",
        "TransactionId": "e7bdf2c10f0c8b358e1217eb433dee87"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/27/2017",
        "Description": "PAYPAL           TRANSFER                   PPD ID: PAYPALSD11",
        "Amount": "10",
        "Type": "ACH_CREDIT",
        "Balance": "1966.75",
        "Check or Slip #": "",
        "TransactionId": "c8352d4b532ce70cf0caadd8693d5538"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/24/2017",
        "Description": "SIX FLAGS MAGIC MOUNTA VALENCIA CA           11/24",
        "Amount": "-6.56",
        "Type": "DEBIT_CARD",
        "Balance": "1956.75",
        "Check or Slip #": "",
        "TransactionId": "fc00c3f3fdb78e18ef8bdc995de270f1"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/24/2017",
        "Description": "PAYPAL *SIXFLAGSENT 402-935-7733 NY          11/23",
        "Amount": "-93.98",
        "Type": "DEBIT_CARD",
        "Balance": "1963.31",
        "Check or Slip #": "",
        "TransactionId": "dd02a45a3c93c88ebfcbf630511907bb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/24/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/22",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "2057.29",
        "Check or Slip #": "",
        "TransactionId": "d5e732400576194890027b1c42b14325"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/24/2017",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "313.73",
        "Type": "ACH_CREDIT",
        "Balance": "2058.39",
        "Check or Slip #": "",
        "TransactionId": "68aeea777ee07fb47822d6b2b44d3519"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/21/2017",
        "Description": "SOUPLANTATION 6 Q02 LAKEWOOD CA              11/20",
        "Amount": "-10.94",
        "Type": "DEBIT_CARD",
        "Balance": "1744.66",
        "Check or Slip #": "",
        "TransactionId": "917f18b9ecd6c77a8e0c685dee23713a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/21/2017",
        "Description": "PACIFIC BAPTIST CHURCH 562-4247714 CA        11/19",
        "Amount": "-31",
        "Type": "DEBIT_CARD",
        "Balance": "1755.6",
        "Check or Slip #": "",
        "TransactionId": "7a6e4839167f8032af9cb0a621354bca"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/21/2017",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               11/19",
        "Amount": "-3.3",
        "Type": "DEBIT_CARD",
        "Balance": "1786.6",
        "Check or Slip #": "",
        "TransactionId": "96ea035c3f8266bdc0586dd7166c70c8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2017",
        "Description": "NON-CHASE ATM FEE-WITH",
        "Amount": "-2.5",
        "Type": "FEE_TRANSACTION",
        "Balance": "1789.9",
        "Check or Slip #": "",
        "TransactionId": "e5775ca528860e77013b9870b14b9119"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2017",
        "Description": "TARGET T- 141 Lakewood LAKEWOOD CA           11/20",
        "Amount": "-10.94",
        "Type": "DEBIT_CARD",
        "Balance": "1792.4",
        "Check or Slip #": "",
        "TransactionId": "7a295d6212a9ae8a77f9a09381f48799"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2017",
        "Description": "CARL'S JR #1100037 LONG BEACH CA             11/18",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1803.34",
        "Check or Slip #": "",
        "TransactionId": "4a8d8a0f3c2d5851519797af23eda24e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2017",
        "Description": "NON-CHASE ATM WITHDRAW               855450  11/18BIXBY KNO",
        "Amount": "-43",
        "Type": "ATM",
        "Balance": "1808.85",
        "Check or Slip #": "",
        "TransactionId": "5809f78652dd2bd46dbb47e6531b0c18"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2017",
        "Description": "SQC*JONATHAN .  / CA                         11/18",
        "Amount": "-3.6",
        "Type": "DEBIT_CARD",
        "Balance": "1851.85",
        "Check or Slip #": "",
        "TransactionId": "2eb0609187f54a7029d5f23659592e4f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/17",
        "Amount": "-0.85",
        "Type": "DEBIT_CARD",
        "Balance": "1855.45",
        "Check or Slip #": "",
        "TransactionId": "d33d45b24f6823c8a8f3fdba787064d8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2017",
        "Description": "PAYPAL *1MICHELLELO 402-935-7733 CA          11/17",
        "Amount": "-68.79",
        "Type": "DEBIT_CARD",
        "Balance": "1856.3",
        "Check or Slip #": "",
        "TransactionId": "656c9c4d754f725c2acdf50a7b840084"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/20/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/16",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1925.09",
        "Check or Slip #": "",
        "TransactionId": "8f29bc21900af84332c1200ad2fb1c98"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/20/2017",
        "Description": "ATM CHECK DEPOSIT 11/18 3901 ATLANTIC AVE LONG BEACH CA",
        "Amount": "200",
        "Type": "ATM_DEPOSIT",
        "Balance": "1926.19",
        "Check or Slip #": "",
        "TransactionId": "377940f2e96293bb0e2cad5c5b2f34f1"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/20/2017",
        "Description": "ATM CHECK DEPOSIT 11/18 3901 ATLANTIC AVE LONG BEACH CA",
        "Amount": "390",
        "Type": "ATM_DEPOSIT",
        "Balance": "1726.19",
        "Check or Slip #": "",
        "TransactionId": "b0f8a1ecace8dba8c5bcfd8c8a324759"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/17/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/16",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1336.19",
        "Check or Slip #": "",
        "TransactionId": "6812d02c4d484c855eda47f7c037110c"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/17/2017",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "307.67",
        "Type": "ACH_CREDIT",
        "Balance": "1337.29",
        "Check or Slip #": "",
        "TransactionId": "2261cf41c047a3335444999d4811e0d6"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/16/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/14",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1029.62",
        "Check or Slip #": "",
        "TransactionId": "95491f9cd2cff17b41b69686e9e41b34"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/15/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/14",
        "Amount": "-0.85",
        "Type": "DEBIT_CARD",
        "Balance": "1030.72",
        "Check or Slip #": "",
        "TransactionId": "1af89f81ceb86a2d482180cd4822eddc"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/15/2017",
        "Description": "CARLS JR 1100228 LONG BEACH CA               11/13",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1031.57",
        "Check or Slip #": "",
        "TransactionId": "3457309f8577324201777d737db66212"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2017",
        "Description": "ALBERTSONS STORE  0132 LONG BEACH CA 110457  11/13",
        "Amount": "-19.84",
        "Type": "DEBIT_CARD",
        "Balance": "1037.08",
        "Check or Slip #": "",
        "TransactionId": "fa5d9db5e0fcae89e741d3b89dbb9a14"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2017",
        "Description": "SQC*GERVINE MARANAN .  / CA                  11/11",
        "Amount": "-1.75",
        "Type": "DEBIT_CARD",
        "Balance": "1056.92",
        "Check or Slip #": "",
        "TransactionId": "bc07592c40e44a0e97d20348c99e949f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2017",
        "Description": "PAYPAL *DIAMONDWIRE 402-935-7733 CA          11/11",
        "Amount": "-209.94",
        "Type": "DEBIT_CARD",
        "Balance": "1058.67",
        "Check or Slip #": "",
        "TransactionId": "678f421067b9f84debaf55257540b923"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/10",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1268.61",
        "Check or Slip #": "",
        "TransactionId": "626b1ed2b977b4199e8c20914d837cc5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2017",
        "Description": "PACIFIC BAPTIST CHURCH 562-4247714 CA        11/10",
        "Amount": "-82",
        "Type": "DEBIT_CARD",
        "Balance": "1269.71",
        "Check or Slip #": "",
        "TransactionId": "7ece068cfeedd53c855eb8d5ad5fc4a9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/13/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/09",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1351.71",
        "Check or Slip #": "",
        "TransactionId": "1304d9e31b147564ebb398e043e75a96"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/10/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/09",
        "Amount": "-0.6",
        "Type": "DEBIT_CARD",
        "Balance": "1352.81",
        "Check or Slip #": "",
        "TransactionId": "edf717ee68af4748b33bb0f0e939d7d8"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/10/2017",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "300.57",
        "Type": "ACH_CREDIT",
        "Balance": "1353.41",
        "Check or Slip #": "",
        "TransactionId": "4c381035a488cb6551e90677d403a308"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/08/2017",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               11/06",
        "Amount": "-1.64",
        "Type": "DEBIT_CARD",
        "Balance": "1052.84",
        "Check or Slip #": "",
        "TransactionId": "844d8dda6d0eaeaef57254f5046b115b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/07/2017",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               11/05",
        "Amount": "-2.75",
        "Type": "DEBIT_CARD",
        "Balance": "1054.48",
        "Check or Slip #": "",
        "TransactionId": "f3cffdd8a9ae21c71d8df67bff792cf9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2017",
        "Description": "ALDI 79047 LONG BEACH CA             298193  11/05",
        "Amount": "-27.85",
        "Type": "DEBIT_CARD",
        "Balance": "1057.23",
        "Check or Slip #": "",
        "TransactionId": "a16e6f5ab2c80b959d83c0f51d03d647"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2017",
        "Description": "BURGER KING #2119 LONG BEACH CA              11/05",
        "Amount": "-3.85",
        "Type": "DEBIT_CARD",
        "Balance": "1085.08",
        "Check or Slip #": "",
        "TransactionId": "a2f24ebcba836b3d291c18d37b8dd4e3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2017",
        "Description": "SQC*TIMOTHY .  / CA                          11/04",
        "Amount": "-5",
        "Type": "DEBIT_CARD",
        "Balance": "1088.93",
        "Check or Slip #": "",
        "TransactionId": "ea5212ba8fb1f21c1646a8d117deec96"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/03",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1093.93",
        "Check or Slip #": "",
        "TransactionId": "c5c7aafdcf8a57571fe75fb1548b6ad5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/03",
        "Amount": "-0.85",
        "Type": "DEBIT_CARD",
        "Balance": "1095.03",
        "Check or Slip #": "",
        "TransactionId": "ce53393dfcce887bba2834780fca090c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/06/2017",
        "Description": "PACIFIC BAPTIST CHURCH LONG BEACH CA         11/03",
        "Amount": "-498.5",
        "Type": "DEBIT_CARD",
        "Balance": "1095.88",
        "Check or Slip #": "",
        "TransactionId": "b1228af50899addbd120cadc20a4ddeb"
    },
    {
        "Details": "DSLIP",
        "Posting Date": "11/06/2017",
        "Description": "REMOTE ONLINE DEPOSIT #          1",
        "Amount": "250",
        "Type": "CHECK_DEPOSIT",
        "Balance": "1594.38",
        "Check or Slip #": "1",
        "TransactionId": "f6423f2e0dcd2882eaf4e58f80a360bd"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/03/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/02",
        "Amount": "-2.6",
        "Type": "DEBIT_CARD",
        "Balance": "1344.38",
        "Check or Slip #": "",
        "TransactionId": "af09fc554b00aab98a53aef1ee51873d"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/03/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/02",
        "Amount": "-1.1",
        "Type": "DEBIT_CARD",
        "Balance": "1346.98",
        "Check or Slip #": "",
        "TransactionId": "fd66ac36ab4ea32c63b33de9ff129c95"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/03/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/01",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "1348.08",
        "Check or Slip #": "",
        "TransactionId": "52d4c8c335816349b51e09d398b8c19b"
    },
    {
        "Details": "CREDIT",
        "Posting Date": "11/03/2017",
        "Description": "STAFFMARK INVEST DIR DEP                    PPD ID: 2710841417",
        "Amount": "304.57",
        "Type": "ACH_CREDIT",
        "Balance": "1349.03",
        "Check or Slip #": "",
        "TransactionId": "076bd1f6a0cc95d3ade150811170befb"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/02/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/01",
        "Amount": "-0.85",
        "Type": "DEBIT_CARD",
        "Balance": "1044.46",
        "Check or Slip #": "",
        "TransactionId": "eef0427365937e17824bb32acbf304c4"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/02/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         11/01",
        "Amount": "-0.85",
        "Type": "DEBIT_CARD",
        "Balance": "1045.31",
        "Check or Slip #": "",
        "TransactionId": "e789fdbbc0457679ccea961fcf1cc2c5"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/01/2017",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               10/30",
        "Amount": "-1.64",
        "Type": "DEBIT_CARD",
        "Balance": "1046.16",
        "Check or Slip #": "",
        "TransactionId": "721f3986c94497537b3bea63e5805cd9"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/01/2017",
        "Description": "BURGER KING #2119 LONG BEACH CA              10/31",
        "Amount": "-2.08",
        "Type": "DEBIT_CARD",
        "Balance": "1047.8",
        "Check or Slip #": "",
        "TransactionId": "9d3a9fea78f104ef4bfb6aa08ea6b923"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "11/01/2017",
        "Description": "BURGER KING #2119 LONG BEACH CA              10/31",
        "Amount": "-3.85",
        "Type": "DEBIT_CARD",
        "Balance": "1049.88",
        "Check or Slip #": "",
        "TransactionId": "cf57ec9287485f8019fc7d3ce2b5433e"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/31/2017",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               10/29",
        "Amount": "-1.64",
        "Type": "DEBIT_CARD",
        "Balance": "1053.73",
        "Check or Slip #": "",
        "TransactionId": "947b17a22ada5b2963850dcd030f71bf"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2017",
        "Description": "SQC*JONATHAN .  / CA                         10/29",
        "Amount": "-15",
        "Type": "DEBIT_CARD",
        "Balance": "1055.37",
        "Check or Slip #": "",
        "TransactionId": "c393164ca0159f69ed0855a27f18c4d3"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2017",
        "Description": "ALDI 79047 LONG BEACH CA             335172  10/28",
        "Amount": "-18.39",
        "Type": "DEBIT_CARD",
        "Balance": "1070.37",
        "Check or Slip #": "",
        "TransactionId": "eaac7d780f265a9de9853ef239332642"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2017",
        "Description": "LONG BEACH CYCLERY LONG BEACH CA     214267  10/28",
        "Amount": "-12.13",
        "Type": "DEBIT_CARD",
        "Balance": "1088.76",
        "Check or Slip #": "",
        "TransactionId": "a60690c297fd60015434b4c3830e7d9b"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2017",
        "Description": "MCDONALD'S F25973 LONG BEACH CA              10/28",
        "Amount": "-4.39",
        "Type": "DEBIT_CARD",
        "Balance": "1100.89",
        "Check or Slip #": "",
        "TransactionId": "b35fad71f012c469e33be6faf161a803"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         10/27",
        "Amount": "-0.6",
        "Type": "DEBIT_CARD",
        "Balance": "1105.28",
        "Check or Slip #": "",
        "TransactionId": "00af454ebaba85e704dc7d375842541c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         10/27",
        "Amount": "-0.85",
        "Type": "DEBIT_CARD",
        "Balance": "1105.88",
        "Check or Slip #": "",
        "TransactionId": "e08b576b49d24a97bb63f287004e2d69"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         10/27",
        "Amount": "-0.95",
        "Type": "DEBIT_CARD",
        "Balance": "1106.73",
        "Check or Slip #": "",
        "TransactionId": "7f0c90a1e6c0439e53535be088c9ff2f"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/30/2017",
        "Description": "SQC*Square Cash VISA DIRECT CA       243869  10/28",
        "Amount": "1.98",
        "Type": "DEBIT_CARD",
        "Balance": "1107.68",
        "Check or Slip #": "",
        "TransactionId": "4e6f2545e5de9eabbcd8e39115f32c4c"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         10/24",
        "Amount": "-0.85",
        "Type": "DEBIT_CARD",
        "Balance": "1105.7",
        "Check or Slip #": "",
        "TransactionId": "592e9aea6e591281f9f804493c6f953a"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2017",
        "Description": "CMSVEND*VILLAS VENDING LONG BEACH CA         10/24",
        "Amount": "-1",
        "Type": "DEBIT_CARD",
        "Balance": "1106.55",
        "Check or Slip #": "",
        "TransactionId": "3bcf7626e0f80bca38e219e01e132729"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/25/2017",
        "Description": "CARLS JR 1100228 LONG BEACH CA               10/23",
        "Amount": "-5.51",
        "Type": "DEBIT_CARD",
        "Balance": "1107.55",
        "Check or Slip #": "",
        "TransactionId": "35acdf10ad8a8d6d3bd02301bc9e0cd8"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/24/2017",
        "Description": "MCDONALD'S F7765 LONG BEACH CA               10/22",
        "Amount": "-2.75",
        "Type": "DEBIT_CARD",
        "Balance": "1113.06",
        "Check or Slip #": "",
        "TransactionId": "a1f0431d6b7f281a3ba5691941830a46"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/23/2017",
        "Description": "WM SUPERC Wal-Mart Sup LAKEWOOD CA           10/21",
        "Amount": "-14.9",
        "Type": "DEBIT_CARD",
        "Balance": "1115.81",
        "Check or Slip #": "",
        "TransactionId": "b2d5df8117bd1b197d42bba230064360"
    },
    {
        "Details": "DEBIT",
        "Posting Date": "10/23/2017",
        "Description": "SQC*JONATHAN .  / CA                         10/21",
        "Amount": "-3.3",
        "Type": "DEBIT_CARD",
        "Balance": "1130.71",
        "Check or Slip #": "",
        "TransactionId": "a766d7b3df608e0fc4f191408cee76a5"
    }
]
 





const grouped = []
// go through each transaction name to compare
dat.forEach((transaction,i)=>{
    // reduce
    let descriptionString = transaction.Description.split(/\b(\s)/)
    let reducedDescription = ""
    for(let i=0;i<4;i++){
        reducedDescription = reducedDescription + descriptionString[i]
        reducedDescription = reducedDescription.toLowerCase()
    }
    
    // set foundGroup value to index of grouped where d matches
    let foundGroup = undefined;
    
    // compare d with the first of each array in grouped
    grouped.forEach((g,i) => {
        //compare
        let compared = ss.compareTwoStrings(g.names[0],reducedDescription)
        // found matching grouped, so set index of grouped array that d will be added to
        if(compared > 0.6){
            foundGroup = i
        }
    })
    // push to existing group in grouped, or create new group in grouped
    if(foundGroup !== undefined){
        grouped[foundGroup].names.push(reducedDescription)
        grouped[foundGroup].ids.push(transaction.TransactionId)
    }else{
        grouped.push({names:[reducedDescription],ids:[transaction.TransactionId]})
    }
})

                
const Analysis = () => {

    // Transaction objects with category are added after clicking button to set category for each group
    const afterCategories = []
    
    const setCat = (cat,id) => {
        // hide card
        document.getElementById(id+"div").style.display = "none"
        
        // list of ids in the group
        let ids = grouped.find(x => x.ids[0] == id).ids
        
        // push new values to afterCategories
        ids.forEach(id=>{
            let temp = dat.find(x => x.TransactionId == id)
            temp.Category = cat
            afterCategories.push(temp)
        })
    }

    return (
        <React.Fragment>
            {
                grouped.map((t,i) => {
                    return(
                        <div key={i} id={t.ids[0]+"div"} style={{padding:"12px",margin:"24px 10px",border:"1px solid #000",fontSize:"12px"}}>
                            Name: {dat.find(x => x.TransactionId == t.ids[0]).Description}
                            <br></br>
                            Amount: {dat.find(x => x.TransactionId == t.ids[0]).Amount}
                            <div onClick={e=>{setCat("ignore",t.ids[0])}} style={{textAlign:"center",padding:"8px",marginTop:"8px",fontSize:"14px",backgroundColor:"#DDD",color:"#222"}}>ignore</div>
                            <div onClick={e=>{setCat("misc",t.ids[0])}} style={{textAlign:"center",padding:"8px",marginTop:"8px",fontSize:"14px",backgroundColor:"#DDD",color:"#222"}}>misc</div>
                            <div onClick={e=>{setCat("food",t.ids[0])}} style={{textAlign:"center",padding:"8px",marginTop:"8px",fontSize:"14px",backgroundColor:"#DDD",color:"#222"}}>food</div>
                            <div onClick={e=>{setCat("entertainment",t.ids[0])}} style={{textAlign:"center",padding:"8px",marginTop:"8px",fontSize:"14px",backgroundColor:"#DDD",color:"#222"}}>entertainment</div>
                            <div onClick={e=>{setCat("transportation",t.ids[0])}} style={{textAlign:"center",padding:"8px",marginTop:"8px",fontSize:"14px",backgroundColor:"#DDD",color:"#222"}}>transportation</div>
                            <div onClick={e=>{setCat("household",t.ids[0])}} style={{textAlign:"center",padding:"8px",marginTop:"8px",fontSize:"14px",backgroundColor:"#DDD",color:"#222"}}>household</div>
                            <div onClick={e=>{setCat("utilities",t.ids[0])}} style={{textAlign:"center",padding:"8px",marginTop:"8px",fontSize:"14px",backgroundColor:"#DDD",color:"#222"}}>utilities</div>
                            <div onClick={e=>{setCat("housing",t.ids[0])}} style={{textAlign:"center",padding:"8px",marginTop:"8px",fontSize:"14px",backgroundColor:"#DDD",color:"#222"}}>housing</div>
                            <div onClick={e=>{setCat("clothing",t.ids[0])}} style={{textAlign:"center",padding:"8px",marginTop:"8px",fontSize:"14px",backgroundColor:"#DDD",color:"#222"}}>clothing</div>
                            <div onClick={e=>{setCat("gifts",t.ids[0])}} style={{textAlign:"center",padding:"8px",marginTop:"8px",fontSize:"14px",backgroundColor:"#DDD",color:"#222"}}>gifts</div>
                            <div onClick={e=>{setCat("medical",t.ids[0])}} style={{textAlign:"center",padding:"8px",marginTop:"8px",fontSize:"14px",backgroundColor:"#DDD",color:"#222"}}>medical</div>
                        </div>
                    )
                })
            }
            <div onClick={()=>{console.log(afterCategories)}} style={{textAlign:"center",padding:"8px",marginTop:"8px",marginBottom:"96px",fontSize:"14px",backgroundColor:"#DDD",color:"#222"}}>Done</div>
        </React.Fragment>
    )
}

export default Analysis