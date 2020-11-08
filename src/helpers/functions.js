import firebase from "../utils/firebase";

const reference = firebase
    .firestore()
    .collection("recipes")

export function create(args) {
    reference
        .add(...args)
}

export function deleteEntry(id) {
    reference
        .doc(id)
        .delete()
}

export function addItems(id, field, items) {
    switch (field) {
        case "tags":
            reference
                .doc(id)
                .update({
                    "tags": firebase.firestore.FieldValue.arrayUnion(items)
                })
            break;
        case "notes":
            reference
                .doc(id)
                .update({
                    "notes": firebase.firestore.FieldValue.arrayUnion(items)
                })
            break;
        default:
            break;
    }
}

export function removeItems(id, field, items) {
    switch (field) {
        case "tags":
            reference
                .doc(id)
                .update({
                    "tags": firebase.firestore.FieldValue.arrayRemove(items)
                })
            break;
        case "notes":
            reference
                .doc(id)
                .update({
                    "notes": firebase.firestore.FieldValue.arrayRemove(items)
                })
            break;
        default:
            break;
    }
}

export function updateItem(id, boolean) {
    reference
        .doc(id)
        .update({
            "hasMade": !boolean
        })
} 
