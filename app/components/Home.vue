<template>
    <Frame>
        <Page>
            <ActionBar title="CollectionView" />

            <GridLayout rows="auto, *, auto">
                <Label row="0" class="px-4 py-3 text-sm text-gray-500" :text="status" />

                <CollectionView
                    row="1"
                    :items="items"
                    colWidth="50%"
                    rowHeight="120"
                    @itemTap="onItemTap"
                >
                    <template #default="{ item, index }">
                        <GridLayout rows="auto, *, auto" class="m-2 p-3 rounded-2xl" :backgroundColor="item.color">
                            <Label row="0" :text="item.name" class="text-white text-base font-bold" />
                            <Label row="2" :text="`#${index} · ${item.color}`" class="text-white text-xs" />
                        </GridLayout>
                    </template>
                </CollectionView>

                <GridLayout row="2" columns="*, *, *" class="px-2 py-3">
                    <Button col="0" text="Add" class="btn" @tap="addItem" />
                    <Button col="1" text="Update first" class="btn" @tap="updateFirst" />
                    <Button col="2" text="Remove last" class="btn" @tap="removeLast" />
                </GridLayout>
            </GridLayout>
        </Page>
    </Frame>
</template>

<script setup lang="ts">
import { ObservableArray } from '@nativescript/core'
import { ref } from 'nativescript-vue'
import type { CollectionViewItemEventData } from '@nativescript-community/ui-collectionview'

interface Swatch {
    name: string
    color: string
}

const PALETTE: Swatch[] = [
    { name: 'Turquoise', color: '#1abc9c' },
    { name: 'Emerald', color: '#2ecc71' },
    { name: 'Peter River', color: '#3498db' },
    { name: 'Amethyst', color: '#9b59b6' },
    { name: 'Wet Asphalt', color: '#34495e' },
    { name: 'Green Sea', color: '#16a085' },
    { name: 'Nephritis', color: '#27ae60' },
    { name: 'Belize Hole', color: '#2980b9' },
    { name: 'Wisteria', color: '#8e44ad' },
    { name: 'Midnight Blue', color: '#2c3e50' },
    { name: 'Sun Flower', color: '#f1c40f' },
    { name: 'Carrot', color: '#e67e22' },
    { name: 'Alizarin', color: '#e74c3c' },
    { name: 'Clouds', color: '#bdc3c7' },
    { name: 'Concrete', color: '#95a5a6' },
    { name: 'Orange', color: '#f39c12' },
    { name: 'Pumpkin', color: '#d35400' },
    { name: 'Pomegranate', color: '#c0392b' },
    { name: 'Silver', color: '#7f8c8d' },
    { name: 'Asbestos', color: '#7f8c8d' },
]

// The list notifies the CollectionView itself on push/pop/setItem; a plain array would need a manual refresh().
const items = new ObservableArray<Swatch>(PALETTE)
const status = ref(`${items.length} items · tap a card`)

function onItemTap(args: CollectionViewItemEventData) {
    const item = args.item as Swatch
    status.value = `Tapped #${args.index}: ${item.name}`
}

function addItem() {
    const base = PALETTE[items.length % PALETTE.length]
    items.push({ ...base, name: `${base.name} ${items.length + 1}` })
    status.value = `Added · ${items.length} items`
}

function updateFirst() {
    const next = PALETTE[Math.floor(Math.random() * PALETTE.length)]
    items.setItem(0, { ...next, name: `${next.name} ★` })
    status.value = `Updated #0 → ${next.name}`
}

function removeLast() {
    if (items.length === 0) return
    // Not pop()/shift(): their 'delete' event carries addedCount 0, and the iOS CollectionView
    // sizes its delete batch from addedCount, so UIKit throws on an empty batch. splice() emits
    // 'splice' with removed.length, which it handles.
    items.splice(items.length - 1, 1)
    status.value = `Removed · ${items.length} items`
}
</script>

<style scoped>
.btn {
    margin: 0 4;
    padding: 10 0;
    border-radius: 10;
    background-color: #65adf1;
    color: white;
    font-weight: bold;
    text-transform: none;
}
</style>
