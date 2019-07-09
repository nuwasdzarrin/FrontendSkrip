// Index.vue

<template>
    <div>
        <h1>Items For Issuer</h1>

        <table class="table table-striped table-hover">
            <thead class="thead-light">
            <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Actions</th>
                <th>Actions</th>
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
                <tr>
                    <td>1</td>
                    <td>Buku Apik</td>
                    <td>100000</td>
                    <td><button class="btn btn-primary">Edit</button></td>
                    <td><button class="btn btn-danger">Delete</button></td>
                </tr>
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
<style>
.table{
  width: 99%;
}
</style>
