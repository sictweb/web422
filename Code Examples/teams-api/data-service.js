const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Added to get around the deprecation warning: "Mongoose: mpromise (mongoose's default promise library) is deprecated"

// Load the schemas
const employeeSchema = require('./models/employee.js');
const positionSchema = require('./models/position.js');
const projectSchema = require('./models/project.js');
const teamSchema = require('./models/team.js');

module.exports = function(mongoDBConnectionString){

    let Employee; // defined on connection to the new db instance
    let Position; // defined on connection to the new db instance
    let Project; // defined on connection to the new db instance
    let Team; // defined on connection to the new db instance

    return {
        connect: function(){
            return new Promise(function(resolve,reject){
                let db = mongoose.createConnection(mongoDBConnectionString, { useNewUrlParser: true });
                
                db.on('error', (err)=>{
                    reject(err);
                });
        
                db.once('open', ()=>{
                    Employee = db.model("Employee", employeeSchema);
                    Position = db.model("Position", positionSchema);
                    Project = db.model("Project", projectSchema);
                    Team = db.model("Team", teamSchema);

                    resolve();
                });
            });
        },
        getAllEmployees: function(){
            return new Promise(function(resolve,reject){

                Employee.find()
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .populate("Position") // populate the "Position" field
                .exec()
                .then((employees) => {
                    resolve(employees);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        getAllEmployeesRaw: function(){
            return new Promise(function(resolve,reject){
    
                Employee.find()
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .exec()
                .then((employees) => {
                    resolve(employees);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        getEmployeeById: function(employeeId){
            return new Promise(function(resolve,reject){

                Employee.find({_id: employeeId})
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .populate("Position") // populate the "Position" field
                .limit(1)
                .exec()
                .then((employees) => {
                    resolve(employees);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        getEmployeeByIdRaw: function(employeeId){
            return new Promise(function(resolve,reject){

                Employee.find({_id: employeeId})
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .limit(1)
                .exec()
                .then((employees) => {
                    resolve(employees);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        updateEmployeeById: function (employeeId, employeeData) {
            return new Promise(function (resolve, reject) {
                if (Object.keys(employeeData).length > 0) { // if there is data to update
                    Employee.update({ _id: employeeId }, // replace the current employee with data from employeeData
                        {
                            $set: employeeData
                        },
                        { multi: false })
                        .exec()
                        .then((data) => {
                            resolve(employeeId);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    resolve();
                }
            });
        },
        addEmployee: function (employeeData) {
            return new Promise(function (resolve, reject) {
                
                // Create a newEmployee from the employeeData
                var newEmployee = new Employee(employeeData);

                newEmployee.save((err,addedEmployee) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(addedEmployee._id);
                    }
                });
            });
        },
        getAllPositions: function(){
            return new Promise(function(resolve,reject){

                Position.find()
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .exec()
                .then((positions) => {
                    resolve(positions);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        getPositionById: function(positionId){
            return new Promise(function(resolve,reject){

                Position.find({_id: positionId})
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .limit(1)
                .exec()
                .then((positions) => {
                    resolve(positions);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        updatePositionById: function (positionId, positionData) {
            return new Promise(function (resolve, reject) {
                if (Object.keys(positionData).length > 0) { // if there is data to update
                    Position.update({ _id: positionId }, // replace the current position with data from positionData
                        {
                            $set: positionData
                        },
                        { multi: false })
                        .exec()
                        .then(() => {
                            resolve(positionId);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    resolve();
                }
            });
        },
        addPosition: function (positionData) {
            return new Promise(function (resolve, reject) {
                
                // Create a newPosition from the positionData
                var newPosition = new Position(positionData);

                newPosition.save((err,addedPosition) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(addedPosition._id);
                    }
                });
            });
        },
        getAllProjects: function(){
            return new Promise(function(resolve,reject){

                Project.find()
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .exec()
                .then((projects) => {
                    resolve(projects);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        getProjectById: function(projectId){
            return new Promise(function(resolve,reject){

                Project.find({_id: projectId})
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .limit(1)
                .exec()
                .then((projects) => {
                    resolve(projects);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        updateProjectById: function (projectId, projectData) {
            return new Promise(function (resolve, reject) {
                if (Object.keys(projectData).length > 0) { // if there is data to update
                    Project.update({ _id: projectId }, // replace the current project with data from projectData
                        {
                            $set: projectData
                        },
                        { multi: false })
                        .exec()
                        .then(() => {
                            resolve(projectId);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    resolve();
                }
            });
        },
        addProject: function (projectData) {
            return new Promise(function (resolve, reject) {
                
                // Create a newProject from the projectData
                var newProject = new Project(projectData);

                newProject.save((err,addedProject) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(addedProject._id);
                    }
                });
            });
        },
        getAllTeams: function(){
            return new Promise(function(resolve,reject){

                Team.find()
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .populate("Projects") // populate the "Projects" field
                .populate("Employees") // populate the "Employees" field
                .populate("TeamLead") // populate the "TeamLead" field
                .populate({ // Populate the nested "Position" for the team lead
                    path: 'TeamLead',
                    populate: {
                      path: 'Position',
                      model: 'Position'
                    } 
                 })
                 .populate({ // Populate the nested "Position" for the Employees
                    path: 'Employees',
                    populate: {
                    path: 'Position',
                    model: 'Position'
                    } 
                })
                .exec()
                .then((teams) => {
                    resolve(teams);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        getAllTeamsRaw: function(){
            return new Promise(function(resolve,reject){

                Team.find()
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .exec()
                .then((teams) => {
                    resolve(teams);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        getTeamById: function(teamId){
            return new Promise(function(resolve,reject){

                Team.find({_id: teamId})
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .populate("Projects") // populate the "Projects" field
                .populate("Employees") // populate the "Employees" field
                .populate("TeamLead") // populate the "TeamLead" field
                .populate({ // Populate the nested "Position" for the team lead
                    path: 'TeamLead',
                    populate: {
                    path: 'Position',
                    model: 'Position'
                    } 
                })
                .populate({ // Populate the nested "Position" for the Employees
                    path: 'Employees',
                    populate: {
                    path: 'Position',
                    model: 'Position'
                    } 
                })
                .limit(1)
                .exec()
                .then((teams) => {
                    resolve(teams);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        getTeamByIdRaw: function(teamId){
            return new Promise(function(resolve,reject){

                Team.find({_id: teamId})
                .limit(1)
                .exec()
                .then((teams) => {
                    resolve(teams);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        updateTeamById: function (teamId, teamData) {
            return new Promise(function (resolve, reject) {
                if (Object.keys(teamData).length > 0) { // if there is data to update
                    Team.update({ _id: teamId }, // replace the current team with data from teamData
                        {
                            $set: teamData
                        },
                        { multi: false })
                        .exec()
                        .then(() => {
                            resolve(teamId);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    resolve();
                }
            });
        },
        addTeam: function (teamData) {
            return new Promise(function (resolve, reject) {
                
                // Create a newTeam from the teamData
                var newTeam = new Team(teamData);

                newTeam.save((err,addedTeam) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(addedTeam._id);
                    }
                });
            });
        },
    }

}