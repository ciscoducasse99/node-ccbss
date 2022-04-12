## Node-CCBSS - Cisco Ducasse

![Nodejs](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png)

#### Tech Stack/ Tools

- Node.js
- xml2js
- Smartsheet API
- Inquirer
- CCB API

I made this CLI to help my church with their updating our church-goers information. To explain why I made this, I'll explain what the old system was. For years, they've been using a free data-management system called "Community Church Builder." (_This starts the first set of problems but I'll explain later on_). They would also keep track of people's information (like phone number, address, emails, etc.) on a platform called Smartsheet on a week-to-week basis. They would eventually do a cleanup every couple of months and update church-goers information on CCB based off of the data on Smartsheet.

The problem is every couple of months, there would be hundreds of updates that would need to take place. The only way to do so was go row by row, cell by cell for each church-goer and manually check if the information on CCB was any different than the information on the updated Smartsheet row. So the process would look like

1. Check church-goer's information on Smartsheet. (First name, last name, phone number, email, address, etc.)
2. Go on CCB and scan through information. If there is any differences, log in as admin and manually change to Smartsheet data in corresponding data-fields.
3. Once complete, mark as complete on Smartsheet and move onto the next row

Doing a simple list of 15 people can take up to 30 minutes, nevermind doing hundreds of people, every 2 months.

**I realized code can automate this process and save hours of time.**

I wanted to make something can help with this specific automation, but also create room for more things to be implemented down the line. I decided to use Inquirer to ask the user what tasks they'd like to accomplish (for now, only ccb-smartsheet sync has been made.)

I also needed xml2js to help the process. Smartsheet API uses a regular JSON api to serve data, while CCB (which is extremely outdated) uses XML. I needed to convert XML to JSON to be able to correctly compare data between both platforms.

The process looks like

1. Get the created document on Smartsheet to extract JSON data.
2. Format Smartsheet elements to replicate XML2JS conversion of CCB data.
3. Loop through Smartsheet row and do an API call to CCB to retrieve data of corresponding user.
4. Check the difference between CCB data & Smartsheet Data. If difference has been found, report to client and make API calls to CCB and change with Smartsheet data.
5. Continue to next element and report all clients that have been updated at the end.

This code could correctly check & update hundreds of users within 60 seconds, saving hours and hours of work.
