jQuery.getJSON('https://petition.parliament.uk/petitions/131215.json',
function (DATA) {
    var ctx = document.getElementById('pie').getContext('2d');

    var countries = DATA.data.attributes.signatures_by_country,
        organised = {
            labels: [],
            datasets: [{
                data:[],
                backgroundColor: [],
                hoverBackgroundColor: []
            }]
        };

    countries.forEach(function (ctr) {
        organised.labels.push(ctr.name + ' (' + ctr.signature_count +')');
        organised.datasets[0].data.push(ctr.signature_count);
        organised.datasets[0].backgroundColor.push(rCol());
        organised.datasets[0].hoverBackgroundColor.push(rCol());
        if (ctr.name == 'United Kingdom') {
            jQuery('#num').text(ctr.signature_count);
        }
    });

    function rCol () {
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    }

    var myPieChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: organised
    });
});
