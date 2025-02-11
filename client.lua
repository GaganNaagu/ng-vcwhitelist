local inVoice = true

RegisterNetEvent('ng-vc:togglefreeze', function(state)
    inVoice = state
    -- Control player movements
    SetPlayerControl(PlayerId(), state, false)
    FreezeEntityPosition(GetPlayerPed(-1), not state)
    if not state then
        lib.showTextUI('Reconnect to a voice channel to continue.', {icon = 'fa-solid fa-triangle-exclamation', iconColor = 'red'})
    else
        lib.hideTextUI()
    end
end)

-- IF Not Using ox_lib for Warning players uncomment below


-- If the player is not in a voice channel, show the warning text
-- CreateThread(function()
--     while true do
--         Wait(0)
--         if not inVoice then
--             drawText()
--         end
--     end
-- end)

-- function drawText()
--     SetTextScale(0.5, 0.5)
--     SetTextEntry('STRING')
--     AddTextComponentString('Reconnect to a voice channel to continue.')
--     SetTextCentre(true)
--     SetTextColour(215, 0, 64, 255)
--     DrawText(0.5, 0.5)
-- end