export default {
    'siemens': {
          's7-300': ['modbus-tcp', 's7-connection'],
          's7-1200': ['modbus-tcp', 's7-connection'],
          's7-1500': ['modbus-tcp', 's7-connection', 'opc-ua'],
      },
  
      'schneider': {
          
      },
  
      'mitsubishi': {
  
      },
  
      getLabelOfValue: function(value){
        const map = {
          'siemens': 'Siemens',
          'schneider': 'Schneider',
          'mitsubishi': 'Mitsubishi',
          's7-300': 'S7 300',
          's7-1200': 'S7 1200',
          's7-1500': 'S7-1500',
          'modbus-tcp': 'Modbus TCP',
          's7-connection': 'S7 Connection',
          'opc-ua': 'OPC UA'
        }
        return map[value] || value.toUpperCase();
      }
  }