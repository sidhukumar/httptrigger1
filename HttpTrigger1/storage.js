
class Database {
  constructor(json) {
    this.JSONdata = json;
  }
  /**
   * Returns department object
   * @param {number} id department id
   */
  getDepartmentById(id) {
    for (const department of this.JSONdata.departments) {
      if (department.id == id) return department;
    }
  }
  /**
   * Returns Array of persons
   * @param {array} array Array of person ids
   */
  getPersonsWithArrayOfIds(array) {
    let persons = [];
    for (const person of this.JSONdata.persons) {
      for (const personId of array) {
        if (person.id == personId) persons.push(person);
        if (persons.length == array.length) break;
      }
    }
    return persons;
  }
  /**
   * Returns team object 
   * @param {number} id team id
   */
  getTeamById(id) {
    for (const team of this.JSONdata.teams) {
      if (team.id == id) return team;
    }
  }
  /**
   * Returns the persons team object
   * @param {number} id Person id 
   */
  getTeamByPersonId(id) {
    for (const team of this.JSONdata.teams) {
      for (const personId of team.persons) {
        if (personId == id) return team;
      }
    }
  }
  /**
   * Returns person object 
   * @param {number} id Person id 
   */
  getPersonById(id) {
    for (const person of this.JSONdata.persons) {
      if (person.id == id) return person;
    }
  }
  /**
   * Returns technology object 
   * @param {string} name Name of technology
   */
  getTechnologyByName(name) {
    for (const technology of this.JSONdata.technologies) {
      if (technology.name == name) return technology;
    }
  }
  /**
   * Returns technology object 
   * @param {number} id Technology id 
   */
  getTechnologyById(id) {
    for (const technology of this.JSONdata.technologies) {
      if (technology.id == id) return technology;
    }
  }
  /**
   * Returns Array of person objects with givien technology 
   * @param {string} technology technology name 
   */
  getPersonsByTechnology(technology) {
    let result = [];
    let technologyId = this.getTechnologyByName(technology).id;

    for (const person of JSONdata.persons) {
      for (const techId of person.technologies) {
        if (techId == technologyId) result.push(person);
      }
    }

    return result;
  }
  /**
   * Returns role object 
   * @param {number} id Role id 
   */
  getRoleById(id) {
    for (const role of this.JSONdata.roles) {
      if (role.id == id) return role;
    }
  }
  /**
   * 
   * @param {string} prop property of model 
   * @param {array} array Result array
   */
  getPropertyByArrayOfIds(prop, array){
    if(!this.JSONdata[prop]) return [];
    let result = [];
    for (const id of array) {
      for (const property of this.JSONdata[prop]) {
        if (property.id == id) result.push(property);
      }
    }
    return result;
  }
  /**
   * return array of person objects 
   * @param {number} id Project id 
   */
  getPersonsByProjectId(id) {
    let result = [];
    for (const person of this.JSONdata.persons) {
      for (const project of person.projects) {
        if (project[0] == id) { result.push(person); }
      }
    }
    result.forEach(person => {
      let currentProject;
      for (const project of person.projects) {
        if (project[0] == id) { currentProject = project; break; }
      }
      person.projectRole = this.getRoleById(currentProject[1]).name;
    });
    return result;
  }
  /**
   * Returns all departments
   */
  getAllDepartments() {
    return this.JSONdata.departments;
  }
  /**
   * returns array of project objects 
   * @param {number} id Person id
   */
  getProjectsByPersonId(id) {
    let person = this.getPersonById(id);

    let personProjects = [];
    for (const personProject of person.projects) {
      personProjects.push(this.getProjectById(personProject[0]));
    }
    return personProjects;

  }
  /**
   * returns project object
   * @param {number} id project id
   */
  getProjectById(id) {
    for (const project of this.JSONdata.projects) {
      if (id == project.id) return project;
    }
  }
  /**
   * Returns array of project objects 
   * @param {number} x latest x projects
   */
  getFirstXProjects(x) {
    let arr = [];
    for (let i = this.JSONdata.projects.length - 1; i >= (this.JSONdata.projects.length) - x; i--) {
      arr.push(this.JSONdata.projects[i]);
    }
    return arr;
  }
  /**
   * returns all teams
   */
  getAllTeams() {
    return this.JSONdata.teams;
  }
  /**
   * returns all projects
   */
  getAllProjects() {
    return this.JSONdata.projects;
  }
  /**
   * returns array of technologies
   * @param {number} id person id
   */
  getPersonTechnologiesByPersonId(id) {
    let person = this.getPersonById(id);
    let result = [];
    for (const techonologyId of person.technologies) {
      result.push(this.getTechnologyById(techonologyId));
    }
    return result;
  }
  /**
   * 
   * @param {Array} checks 
   * @param {String} query search query
   * @param {Array} result 
   * @param {Object} element 
   */
  checkIncludes(checks, query, result, element) {
    for (const checking of checks) {
      for (const key in checking) {
        if (typeof checking[key] == "string" && checking[key].toLowerCase().includes(query.toLowerCase())) {
          result.push(element);
          return true
        }
      }
    }

  }
  /**
   * returns all result that match the query. 
   * @param {string} query Search query
   */
  search(query) {
    let result = {};
    for (const key in this.JSONdata) {
      result[key] = [];
      const element = this.JSONdata[key];
      for (const a in element) {
        for (const prop in element[a]) {
          if (typeof element[a][prop] == "string" && element[a][prop].toLowerCase().includes(query.toLowerCase())) {
            result[key].push(element[a]);
            break;
          } else if(typeof element[a][prop] == "object"){
            let property = this.getPropertyByArrayOfIds(prop, element[a][prop]);
            if(this.checkIncludes(property, query, result[key], element[a])) break;
          }
        }
      }
    }
    return result
  }
}
module.exports = { Database };

