#!/usr/bin/env node

/**
 * Skills Management Utility
 * A helper script to easily update skills data
 *
 * Usage:
 *   node skills-manager.js add "Skill Name" 85 "Frontend" "Description here"
 *   node skills-manager.js update "JavaScript" 98
 *   node skills-manager.js remove "Skill Name"
 *   node skills-manager.js list
 */

const fs = require('fs');
const path = require('path');

const SKILLS_FILE = path.join(__dirname, 'skills.json');

// Load skills data
function loadSkills() {
  try {
    const data = fs.readFileSync(SKILLS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading skills.json:', error.message);
    process.exit(1);
  }
}

// Save skills data
function saveSkills(data) {
  try {
    data.lastUpdated = new Date().toISOString().split('T')[0];
    fs.writeFileSync(SKILLS_FILE, JSON.stringify(data, null, 2));
    console.log('✅ Skills data updated successfully!');
  } catch (error) {
    console.error('Error saving skills.json:', error.message);
    process.exit(1);
  }
}

// Find skill by name
function findSkill(skillsData, skillName) {
  for (const category of skillsData.skillCategories) {
    const skillIndex = category.skills.findIndex(
      skill => skill.name.toLowerCase() === skillName.toLowerCase()
    );
    if (skillIndex !== -1) {
      return { category, skillIndex, skill: category.skills[skillIndex] };
    }
  }
  return null;
}

// Commands
const commands = {
  add(skillName, level, categoryName, description) {
    const skillsData = loadSkills();
    const category = skillsData.skillCategories.find(
      cat => cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (!category) {
      console.error(`❌ Category "${categoryName}" not found!`);
      console.log('Available categories:', skillsData.skillCategories.map(c => c.name).join(', '));
      return;
    }

    const existingSkill = findSkill(skillsData, skillName);
    if (existingSkill) {
      console.error(`❌ Skill "${skillName}" already exists!`);
      return;
    }

    category.skills.push({
      name: skillName,
      level: parseInt(level),
      description: description || `Professional experience with ${skillName}`
    });

    // Sort skills by level (highest first)
    category.skills.sort((a, b) => b.level - a.level);

    saveSkills(skillsData);
    console.log(`✅ Added "${skillName}" to ${categoryName} category`);
  },

  update(skillName, newLevel, newDescription) {
    const skillsData = loadSkills();
    const found = findSkill(skillsData, skillName);

    if (!found) {
      console.error(`❌ Skill "${skillName}" not found!`);
      return;
    }

    if (newLevel) found.skill.level = parseInt(newLevel);
    if (newDescription) found.skill.description = newDescription;

    // Re-sort skills in category
    found.category.skills.sort((a, b) => b.level - a.level);

    saveSkills(skillsData);
    console.log(`✅ Updated "${skillName}"`);
  },

  remove(skillName) {
    const skillsData = loadSkills();
    const found = findSkill(skillsData, skillName);

    if (!found) {
      console.error(`❌ Skill "${skillName}" not found!`);
      return;
    }

    found.category.skills.splice(found.skillIndex, 1);
    saveSkills(skillsData);
    console.log(`✅ Removed "${skillName}"`);
  },

  list() {
    const skillsData = loadSkills();
    console.log('\n📊 Current Skills:');
    console.log('==================');

    skillsData.skillCategories.forEach(category => {
      console.log(`\n${category.name}:`);
      category.skills.forEach(skill => {
        const level = skill.level >= 90 ? '🔥' : skill.level >= 75 ? '⭐' : '📈';
        console.log(`  ${level} ${skill.name}: ${skill.level}% - ${skill.description}`);
      });
    });

    console.log(`\nLast updated: ${skillsData.lastUpdated}`);
  },

  help() {
    console.log(`
📚 Skills Manager - Help
========================

Commands:
  add <name> <level> <category> [description]  Add a new skill
  update <name> [level] [description]          Update existing skill
  remove <name>                               Remove a skill
  list                                        Show all skills
  help                                        Show this help

Examples:
  node skills-manager.js add "Docker" 85 "DevOps & Tools" "Container orchestration"
  node skills-manager.js update "JavaScript" 98 "Advanced ES6+, frameworks"
  node skills-manager.js remove "Old Framework"
  node skills-manager.js list
        `);
  }
};

// Parse command line arguments
const [, , command, ...args] = process.argv;

if (!command || !commands[command]) {
  console.error('❌ Invalid command!');
  commands.help();
  process.exit(1);
}

// Execute command
try {
  commands[command](...args);
} catch (error) {
  console.error('❌ Error executing command:', error.message);
  commands.help();
  process.exit(1);
}
