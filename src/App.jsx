import { useState } from 'react'

export default function App() {
  const [selected, setSelected] = useState(0)
  const [showChat, setShowChat] = useState(false)
  const [showDrivers, setShowDrivers] = useState(true)
  const [showCreateOrder, setShowCreateOrder] = useState(false)

  const fleet = [
    { truck:'LT-421', driver:'M. Jonaitis', status:'Driving', speed:'82 km/h', route:'Hamburg → Rotterdam', eta:'14:25', alert:false, fuel:'78%', temp:'4°C' },
    { truck:'LT-118', driver:'A. Petrauskas', status:'Break', speed:'0 km/h', route:'Lyon → Warsaw', eta:'16:40', alert:true, fuel:'42%', temp:'6°C' },
    { truck:'LT-904', driver:'R. Kazlauskas', status:'Loading', speed:'0 km/h', route:'Berlin → Prague', eta:'11:05', alert:false, fuel:'65%', temp:'3°C' },
  ]

  const drivers = [
    { name:'M. Jonaitis', drive:'6h 12m', breakIn:'1h 08m', state:'OK' },
    { name:'A. Petrauskas', drive:'8h 45m', breakIn:'NOW', state:'Warning' },
    { name:'R. Kazlauskas', drive:'2h 01m', breakIn:'2h 34m', state:'OK' },
  ]

  const [orders, setOrders] = useState([
    { id:'#84721', client:'DHL Logistics', route:'Hamburg → Rotterdam', status:'In Transit', dispatcher:'Gabrielė', eta:'14:25' },
    { id:'#84722', client:'Maersk', route:'Lyon → Warsaw', status:'Delayed', dispatcher:'Mindaugas', eta:'16:40' },
  ])

  const [messages] = useState([
    'Traffic delay before Rotterdam.',
    'Driver taking 45m break.',
  ])

  const [newOrder, setNewOrder] = useState({
    client:'',
    pickup:'',
    unload:'',
    dispatcher:'Gabrielė',
    eta:'',
  })

  const active = fleet[selected]

  function createOrder() {
    if (!newOrder.client || !newOrder.pickup || !newOrder.unload) return

    const nextOrder = {
      id:'#' + Math.floor(85000 + Math.random() * 999),
      client:newOrder.client,
      route:`${newOrder.pickup} → ${newOrder.unload}`,
      status:'New',
      dispatcher:newOrder.dispatcher,
      eta:newOrder.eta || '--',
    }

    setOrders([nextOrder, ...orders])
    setNewOrder({ client:'', pickup:'', unload:'', dispatcher:'Gabrielė', eta:'' })
    setShowCreateOrder(false)
  }

  return (
    <div className="h-screen bg-[#edf2f7] flex flex-col overflow-hidden text-[#1e293b] relative">

      <div className="h-14 bg-white border-b flex items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold text-blue-600">
            DISPATCH CONTROL CENTER V11
          </div>

          <div className="flex gap-4 text-sm">
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold">48 ONLINE</div>
            <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg font-semibold">3 WARNINGS</div>
            <div className="bg-red-100 text-red-700 px-3 py-1 rounded-lg font-semibold">1 CRITICAL</div>
          </div>
        </div>

        <div className="flex gap-3">
          <input placeholder="Search..." className="border rounded-lg px-4 py-2 w-72 bg-[#f8fafc]" />

          <button onClick={() => setShowCreateOrder(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            + Create Order
          </button>

          <button onClick={() => setShowChat(!showChat)} className="bg-white border px-4 py-2 rounded-lg">
            Chat
          </button>

          <button onClick={() => setShowDrivers(!showDrivers)} className="bg-white border px-4 py-2 rounded-lg">
            Drivers
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[13%] bg-white border-r p-4">
          <div className="space-y-2 text-sm">
            {['Dashboard','Live Map','Fleet','Drivers','Orders','Planning','Fuel','Tachograph','Messages','Reports','Documents','Settings'].map((item, i) => (
              <div key={i} className={`px-3 py-2 rounded-lg cursor-pointer ${i === 0 ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-100'}`}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 border-b bg-[#f7f9fc]">
            <div className="bg-white border rounded-xl p-4">
              <div className="text-xs text-gray-500">ACTIVE ORDERS</div>
              <div className="text-3xl font-bold mt-2 text-blue-600">{orders.length}</div>
            </div>
            <div className="bg-white border rounded-xl p-4">
              <div className="text-xs text-gray-500">DRIVERS ON BREAK</div>
              <div className="text-3xl font-bold mt-2 text-yellow-500">14</div>
            </div>
            <div className="bg-white border rounded-xl p-4">
              <div className="text-xs text-gray-500">DELAYED LOADS</div>
              <div className="text-3xl font-bold mt-2 text-red-500">{orders.filter(o => o.status === 'Delayed').length}</div>
            </div>
            <div className="bg-white border rounded-xl p-4">
              <div className="text-xs text-gray-500">FUEL ALERTS</div>
              <div className="text-3xl font-bold mt-2 text-orange-500">2</div>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">

            <div className="w-[32%] bg-white border-r flex flex-col">
              <div className="p-3 border-b flex items-center justify-between">
                <div className="font-semibold">LIVE MAP</div>
                <div className="flex gap-2">
                  <button className="border px-2 py-1 rounded text-xs">Traffic</button>
                  <button className="border px-2 py-1 rounded text-xs">Satellite</button>
                </div>
              </div>

              <div className="flex-1 relative bg-[#d8eaff] overflow-hidden">
                <div className="absolute top-4 right-4 bg-white shadow-lg border rounded-xl p-3 w-52 z-20">
                  <div className="text-xs text-gray-500 mb-2">Live Vehicle Stats</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Fuel</span><span>{active.fuel}</span></div>
                    <div className="flex justify-between"><span>Temp</span><span>{active.temp}</span></div>
                    <div className="flex justify-between"><span>Signal</span><span className="text-green-600">Strong</span></div>
                  </div>
                </div>

                {fleet.map((item, i) => (
                  <div
                    key={item.truck}
                    onClick={() => setSelected(i)}
                    className={`absolute px-3 py-1 rounded-lg text-xs font-bold text-white shadow-lg cursor-pointer ${
                      i === selected ? 'bg-blue-700 scale-110' : i === 0 ? 'bg-green-500' : i === 1 ? 'bg-yellow-500' : 'bg-blue-500'
                    } ${
                      i === 0 ? 'top-[25%] left-[48%]' : i === 1 ? 'top-[48%] left-[58%]' : 'top-[70%] left-[44%]'
                    }`}
                  >
                    {item.truck}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[34%] bg-white border-r flex flex-col overflow-hidden">
              <div className="p-3 border-b flex items-center justify-between">
                <div className="font-semibold">Fleet Monitoring</div>
                <button className="border px-3 py-1 rounded text-xs">Refresh GPS</button>
              </div>

              <div className="grid grid-cols-8 text-[11px] font-semibold text-gray-500 px-4 py-2 border-b bg-gray-50">
                <div>Truck</div><div>Status</div><div>Speed</div><div>Route</div><div>ETA</div><div>Fuel</div><div>Temp</div><div>Alert</div>
              </div>

              <div className="overflow-auto flex-1 text-sm">
                {fleet.map((item, index) => (
                  <div key={index} onClick={() => setSelected(index)} className={`grid grid-cols-8 px-4 py-3 border-b hover:bg-blue-50 cursor-pointer ${selected === index ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}>
                    <div className="font-semibold">{item.truck}</div>
                    <div>
                      <span className={`px-2 py-1 rounded text-xs ${item.status === 'Driving' ? 'bg-green-100 text-green-700' : item.status === 'Break' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                        {item.status}
                      </span>
                    </div>
                    <div>{item.speed}</div>
                    <div>{item.route}</div>
                    <div>{item.eta}</div>
                    <div>{item.fuel}</div>
                    <div>{item.temp}</div>
                    <div>{item.alert ? '⚠️' : '—'}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[23%] bg-[#f8fafc] border-r overflow-auto">
              <div className="p-3 border-b bg-white font-semibold">Selected Transport</div>

              <div className="p-4 space-y-4">
                <div className="bg-white border rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><div className="text-xs text-gray-500">Truck</div><div className="font-bold mt-1">{active.truck}</div></div>
                    <div><div className="text-xs text-gray-500">Driver</div><div className="font-bold mt-1">{active.driver}</div></div>
                  </div>
                </div>

                <div className="bg-white border rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-3">Order Progress</div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-green-500"></div><div>Loaded</div></div>
                    <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-blue-500"></div><div>Driving To Unload</div></div>
                    <div className="flex items-center gap-3 opacity-40"><div className="w-3 h-3 rounded-full bg-gray-400"></div><div>Delivered</div></div>
                  </div>
                </div>

                <div className="bg-white border rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-2">Dispatcher Notes</div>
                  <textarea className="w-full border rounded-lg p-3 h-28 resize-none" defaultValue="Traffic delay before Rotterdam. Driver informed." />
                </div>
              </div>
            </div>

            {showDrivers && (
              <div className="flex-1 bg-white border-r flex flex-col">
                <div className="p-3 border-b font-semibold">Driver Hours</div>
                <div className="overflow-auto flex-1">
                  {drivers.map((d, i) => (
                    <div key={i} className="p-4 border-b hover:bg-blue-50">
                      <div className="font-semibold text-sm">{d.name}</div>
                      <div className="text-xs text-gray-500 mt-2">Drive Time</div>
                      <div className="text-sm">{d.drive}</div>
                      <div className="text-xs text-gray-500 mt-2">Break Required</div>
                      <div className={`text-sm font-semibold ${d.state === 'Warning' ? 'text-red-600' : 'text-green-600'}`}>{d.breakIn}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-[28%] bg-white border-t overflow-auto">
            <div className="grid grid-cols-6 text-xs font-semibold text-gray-500 px-4 py-2 border-b bg-[#f8fafc]">
              <div>Order</div><div>Client</div><div>Route</div><div>Status</div><div>Dispatcher</div><div>ETA</div>
            </div>

            {orders.map((order, i) => (
              <div key={i} className="grid grid-cols-6 px-4 py-3 border-b text-sm hover:bg-blue-50">
                <div>{order.id}</div><div>{order.client}</div><div>{order.route}</div>
                <div>
                  <span className={`px-2 py-1 rounded text-xs ${order.status === 'Delayed' ? 'bg-yellow-100 text-yellow-700' : order.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {order.status}
                  </span>
                </div>
                <div>{order.dispatcher}</div><div>{order.eta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showChat && (
        <div className="absolute bottom-4 right-4 w-80 bg-white border shadow-2xl rounded-2xl overflow-hidden z-50">
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="font-semibold">Driver Chat</div>
            <button onClick={() => setShowChat(false)}>✕</button>
          </div>
          <div className="p-4 space-y-3 h-64 overflow-auto bg-[#f8fafc]">
            {messages.map((msg, i) => <div key={i} className="bg-white border rounded-xl p-3 text-sm">{msg}</div>)}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input placeholder="Write message..." className="flex-1 border rounded-lg px-3 py-2 text-sm" />
            <button className="bg-blue-600 text-white px-4 rounded-lg">Send</button>
          </div>
        </div>
      )}

      {showCreateOrder && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[520px] overflow-hidden">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="font-bold text-lg">Create New Order</div>
              <button onClick={() => setShowCreateOrder(false)}>✕</button>
            </div>

            <div className="p-5 space-y-4">
              <input value={newOrder.client} onChange={(e) => setNewOrder({...newOrder, client:e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Client" />
              <div className="grid grid-cols-2 gap-3">
                <input value={newOrder.pickup} onChange={(e) => setNewOrder({...newOrder, pickup:e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Pickup" />
                <input value={newOrder.unload} onChange={(e) => setNewOrder({...newOrder, unload:e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Unload" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select value={newOrder.dispatcher} onChange={(e) => setNewOrder({...newOrder, dispatcher:e.target.value})} className="w-full border rounded-lg px-3 py-2">
                  <option>Gabrielė</option><option>Mindaugas</option><option>Other</option>
                </select>
                <input value={newOrder.eta} onChange={(e) => setNewOrder({...newOrder, eta:e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="ETA" />
              </div>
            </div>

            <div className="px-5 py-4 border-t flex justify-end gap-3">
              <button onClick={() => setShowCreateOrder(false)} className="border px-4 py-2 rounded-lg">Cancel</button>
              <button onClick={createOrder} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Create Order</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
