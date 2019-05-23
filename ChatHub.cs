using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Chat
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string User, string Msg)
        {
            await Clients.All.SendAsync("ReceiveMessage", User, Msg);
        }
    }
}
