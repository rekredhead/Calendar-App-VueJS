# Issues
- The Appointments can be extended and edited but cannot be dragged around (difficult to implement)
- After changing the startTime and endTime in a form submission, the changes will not react in the DOM unless the modes are changed
   - Reason: the startTime and endTime (for the ListView and WeeklyView) does not directly render the data from the appointment's props

# Tasks
- Dribble Demo: (https://dribbble.com/shots/15265805-Zendenta-Add-new-appointment)
- Use Vee Validate for form-submission and DateFNS for date manipulation
- Add the following features:
   - Date filtering [Done]
   - Appearing slide-over panel when date-time is clicked [Done]
   - Clickable & Draggable events [Done]

# Setup instructions
- Run <code>npm install</code> in the CLI to install all the modules
- Run <code>npm run dev</code> in the CLI to run the project in dev server