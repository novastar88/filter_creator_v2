import create from 'zustand'


export const syncthingEntries = create(() => ({}));

export function syncthingEntriesChange(val) {
    syncthingEntries.setState(val)
    console.log(Object(val), "syncthingEntries")}


export const dropItEntries = create(() => ({}));

export function dropItEntriesChange(val) {
    dropItEntries.setState(val)
    console.log(Object(val), "dropItEntries")}


export const editState = create(() => ({}));

export function editStateChange(val) {
    editState.setState(val)
    console.log(val, "editState")}


export const editDetails = create(() => ({}));

export function editDetailsChange(val) {
    editDetails.setState(val)
    console.log(val, "editDetails")}

