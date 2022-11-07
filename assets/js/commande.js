$(function() {

    var qte = $("#qte ").val();
    var prix = $("#PrixProduit").val();
    var res = qte * prix;
    $("#PrixCommande").val(res);
    $("#qte").keyup(function() {
        qte = $(this).val();
        prix = $("#PrixProduit").val();
        res = qte * prix;
        $("#PrixCommande").val(res);

    });
    $("#qte").change(function() {
        qte = $(this).val();
        prix = $("#PrixProduit").val();
        res = qte * prix;
        $("#PrixCommande").val(res);

    });
})