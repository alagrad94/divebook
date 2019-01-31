export default {

        fetchFactory(fetchObject) {

        // "http://localhost:5002/users?_embed=friend" Gets user with

        let remoteURL = "http://localhost:5002"
        let dataSet = fetchObject.dataSet;
        let embedItem = fetchObject.embedItem;
        let fetchType = fetchObject.fetchType;
        let dataBaseObject = fetchObject.dataBaseObject;
        let putId = fetchObject.putId;
        let deleteId = fetchObject.deleteId;

        if (fetchType === "GET") {

        return fetch(`${remoteURL}/${dataSet}?${embedItem}`)
            .then(r => r.json())

        } else if (fetchType === "POST"){

        return fetch(`${remoteURL}/${dataSet}`, {
            method: `${fetchType}`,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(dataBaseObject),
        }).then(r => r.json())

        } else if(fetchType === "PUT"){

        return fetch(`${remoteURL}/${dataSet}/${putId}`, {
            method: `${fetchType}`,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(dataBaseObject),
        }).then(r => r.json())

        } else if (fetchType === "DELETE") {

        return fetch(`${remoteURL}/${dataSet}/${deleteId}`, {
            method: `${fetchType}`,
        }).then(r => r.json())

        } else {
            console.log ("YOU SCREWED IT UP")
        }
    }
}

// template for objects to pass into divebookData.fetchFactory() to

// GET
// let fetchTest = {

//     "dataSet" : "users",
//     "fetchType" : "GET",
//     "dataBaseObject" : "",
//     "embedItem" : "?_embed=events"
// }

// POST
// let fetchTest2 = {

//     "dataSet" : "events",
//     "fetchType" : "POST",
//     "dataBaseObject" : {
//       "userId": 1,
//       "eventName": "yet another toga party",
//       "eventDate": "2-12",
//       "eventTime": "3:00pm",
//       "eventLocation": "Vegas"
//     }
// }

// PUT
// let fetchTest3 = {

//     "putId" : 2,
//     "dataSet" : "events",
//     "fetchType" : "PUT",
//     "dataBaseObject" : {
//       "id" : 2,
//       "userId": 1,
//       "eventName": "another toga party",
//       "eventDate": "2-15",
//       "eventTime": "3:00pm",
//       "eventLocation": "Vegas"
//     }
// }

// DELETE
// let fetchTest4 = {

//     "deleteId" : 2,
//     "dataSet" : "events",
//     "fetchType" : "DELETE",
//     "dataBaseObject" : {
//       "userId": sessionStorage.getItem("userId")
//     }
// }