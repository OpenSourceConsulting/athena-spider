'''
Created on 2014. 9. 5.

@author: jerryj
'''

import requests
import json
import sys
import unittest

class FlaskMainTestCase(unittest.TestCase):
	def testRegisterVMHost(self):
		jsonData = {
		    "hostname": "kvmhost001",
		    "token": "token008",
		    "type":"kvm",
		    "addresses": [
		        {
		            "nic": "eth1",
		            "addr": "10.10.10.1"
		        }
			]
		}
		
		headers = {'content-type': 'application/json'}
		
		results = requests.post('http://localhost:5001/vmhost/register', data=json.dumps(jsonData), headers=headers)
		
		print json.dumps(results.json(), indent=4)
	
	def testRegisterVM(self):
		jsonData = {
			"vmhost": "KVMHost#12",
		    "type":"nfv",
		    "hostname":"vm099",
		    "vmtype":"kvm",
		    "vendor":"vyatta",
		    "addresses":[
		        {
		            "nic":"eth1",
		            "addr":"10.10.10.1"
		        }
		    ]
		}
		
		headers = {'content-type': 'application/json'}
		
		results = requests.post('http://localhost:5001/vm/register', data=json.dumps(jsonData), headers=headers)
		if results.status_code == 200:
			print json.dumps(results.json(), indent=4)
		else:
			print results.status_code, results.content
	
	def testGetVMHost(self):
		results = requests.get('http://localhost:5001/mon/vmhost/_all')
		if results.status_code == 200:
			print json.dumps(results.json(), indent=4)
		else:
			print results.status_code, results.content
	
	def testGetVM(self):
		results = requests.get('http://localhost:5001/mon/vm/_all')
		if results.status_code == 200:
			print json.dumps(results.json(), indent=4)
		else:
			print results.status_code, results.content
	
	def testGetVMByHost(self):
		results = requests.get('http://localhost:5001/mon/vmbyhost/c8b31078-d8d3-4b02-a1ad-c56841176b671')
		if results.status_code == 200:
			print json.dumps(results.json(), indent=4)
		else:
			print results.status_code, results.content
	
	def testGraphite(self):
		results = requests.get('http://localhost:5001/mon/graphite?width=786&height=508&_salt=1410357564.227&target=vyatta.cpu.0.cpu.user.value&from=-3minutes')
		if results.status_code == 200:
			print json.dumps(results.json(), indent=4)
		else:
			print results.status_code, results.content

if __name__ == "__main__":
	unittest.main()

