$(function () {
    const $tasksList = $('#tasksList')
    const $taskInput = $('#taskInput')
    const colorSet = ['#f16d69', '#f278a1', '#916fcb', '#5db3f6', '#67d7e5', '#ffe083']
    const $colorsBlock = $('#selectcolor')
    let colorRandom = null

    colorSet.slice(0).reverse().forEach((el) => {
        $colorsBlock.prepend(
            `<button class="colorSelector" style="background-color:${el}"></button>`
        )
    })

    $('.colorSelector').on('click', function () {
        colorRandom = $(this).css('background-color')

        $('.completed').each(function () {
            $(this).css({
                'background-color': colorRandom
            })
        })

    })

    $("#taskInput").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#taskAdd").click()
        }
    });

    $('#taskAdd').on('click',function () {
        if ($taskInput.val().trim() === '') return

        const checkbox = $('<input type="checkbox"/>')
        const checkboxContainer = $('<span class="checkContainer"></span>').prepend(checkbox)

        if (colorRandom === null) {
            colorRandom = colorSet[Math.floor((Math.random() * colorSet.length))]
        }

        $(`<li> <span class='todoText'>${$taskInput.val()}</span> </li>`).appendTo($tasksList).css({
            'background-color': colorRandom,
        }).prepend(checkboxContainer)
        colorRandom = null
        $taskInput.val('')

        checkbox.on('click', function () {
            if ($(this).closest('li').hasClass("completed")) {
                $(this).closest('li').removeClass("completed")
            } else {
                $(this).closest('li').addClass("completed")
            }
        });

    })
})