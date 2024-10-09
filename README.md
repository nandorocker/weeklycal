# weeklycal

A Google Apps Script that lets you create templates to generate calendar appointments weekly, according to specifications.

Created and maintained through ChatGPT.

## Setup

### Step 1: Access Google Apps Script

1. Go to script.google.com
2. Click "New Project"
3. Rename your project (e.g., "WeeklyCal")

### Step 2: Get Your Calendar ID

1. Go to calendar.google.com
2. Click the three dots ⋮ next to your calendar in the left sidebar
3. Click "Settings and sharing"
4. Scroll down to find your Calendar ID under "Integrate calendar"
    - It will look something like: `abc123xyz@group.calendar.google.com`

### Step 3: Set Script Property

1. In the Google Apps Script editor, click "Project Settings" on the sidebar. Under "Script Properties", click "Edit script properties"
2. Click "Add script property"
3. Create a property `CALENDAR_ID` with the value of your calendar's ID that you found previously.