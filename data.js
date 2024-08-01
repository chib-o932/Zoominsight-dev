var citiesToInclude = ["London", "Birmingham", "Mumbai", "Dubai"];

const containerData = [
    { id: 1, content: 'This is the content for container 1' },
    { id: 2, content: 'This is the content for container 2' },
    { id: 3, content: 'This is the content for container 3' }
];

const projectData = [
    { id: 1, region: 'Europe', location: 'London', title: 'School', subject: 'Education', status: 'open', start: '15 Mar 2018', end: '25 Nov 2023', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', lead: 'Diana Prince', contact: 'Joe Bloggs' },
    { id: 2, region: 'Europe', location: 'Birmingham', title: 'School', subject: 'Education', status: 'closed', start: '20 Jun 2018', end: '30 Aug 2020', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', lead: 'Bruce Wayne', contact: 'Clark Kent' },
    { id: 3, region: 'Asia', location: 'Dubai', title: 'School', subject: 'Education', status: 'open', start: '10 Sep 2018', end: '15 May 2024', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', lead: 'Peter Parker', contact: 'Tony Stark' },
    { id: 4, region: 'Asia', location: 'Mumbai', title: 'School', subject: 'Education', status: 'completed', start: '25 Feb 2018', end: '15 Dec 2019', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', lead: 'Natasha Romanoff', contact: 'Steve Rogers' },
    { id: 5, region: 'Asia', location: 'Mumbai', title: 'School', subject: 'Education', status: 'completed', start: '25 Feb 2018', end: '15 Dec 2019', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', lead: 'Natasha Romanoff', contact: 'Steve Rogers' },
    { id: 6, region: 'Asia', location: 'Mumbai', title: 'School', subject: 'Education', status: 'completed', start: '25 Feb 2018', end: '15 Dec 2019', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', lead: 'Natasha Romanoff', contact: 'Steve Rogers' },
    { id: 17, region: 'Asia', location: 'Mumbai', title: 'School', subject: 'Education', status: 'completed', start: '25 Feb 2018', end: '15 Dec 2019', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', lead: 'Natasha Romanoff', contact: 'Steve Rogers' },
    { id: 83, region: 'Asia', location: 'Mumbai', title: 'School', subject: 'Education', status: 'completed', start: '25 Feb 2018', end: '15 Dec 2019', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', lead: 'Natasha Romanoff', contact: 'Steve Rogers' },
    { id: 96, region: 'Asia', location: 'Mumbai', title: 'School', subject: 'Education', status: 'completed', start: '25 Feb 2018', end: '15 Dec 2019', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', lead: 'Natasha Romanoff', contact: 'Steve Rogers' },
    { id: 100, region: 'Asia', location: 'Dubai', title: 'School', subject: 'Education', status: 'completed', start: '05 Jul 2018', end: '10 Sep 2023', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', lead: 'Wanda Maximoff', contact: 'Vision' }
];

const visitData = [
    { id: 1, date: '01 Jan 2018', time: '14:30', venue: 'London', visitors: 'James Lee', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', agenda: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', action: 'Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', rating: 3, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.'},
    { id: 2, date: '01 Jan 2018', time: '14:30', venue: 'London', visitors: 'James Lee', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', agenda: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', action: 'Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', rating: 4, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.'},
    { id: 3, date: '01 Jan 2018', time: '14:30', venue: 'London', visitors: 'James Lee', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', agenda: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', action: 'Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', rating: 2, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.'},
    { id: 4, date: '01 Jan 2018', time: '14:30', venue: 'London', visitors: 'James Lee', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', agenda: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', action: 'Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', rating: 1, notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.'}
];

const meetingData = [
    { id: 1, date: '01 Jan 2018', time: '14:30', attendees: 'James Lee', minutes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', action: 'Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.'},
    { id: 2, date: '01 Jan 2018', time: '14:30', attendees: 'James Lee', minutes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', action: 'Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.'},
    { id: 3, date: '01 Jan 2018', time: '14:30', attendees: 'James Lee', minutes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', action: 'Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.'},
    { id: 4, date: '01 Jan 2018', time: '14:30', attendees: 'James Lee', minutes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.', action: 'Proin at venenatis leo. Quisque lacinia orci vitae semper pretium.'}
];

const partnerData = [
    { id: 1, content: 'This is the content for container 1', conten: 'This is the content for container 1' },
    { id: 2, content: 'This is the content for container 2', conten: 'This is the content for container 1' },
    { id: 3, content: 'This is the content for container 3', conten: 'This is the content for container 1' }
];




