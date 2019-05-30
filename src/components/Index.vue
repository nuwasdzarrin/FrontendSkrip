// Index.vue

<template>
    <div>
        <h1>Items</h1>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Item Name</td>
                <td>Item Price</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>Buku Apik</td>
                    <td>100000</td>
                    <td><button class="btn btn-primary">Edit</button></td>
                    <td><button class="btn btn-danger">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    
}
</script>