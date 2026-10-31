export const notes=[
  {slug:"design-before-motion",category:"DESIGN ENGINEERING",title:"Design before motion.",summary:"Why strong composition should work even when animation is switched off.",body:[
    "Motion can amplify an interface, but it cannot rescue weak hierarchy. Good work begins with content, a point of view and a visual structure that holds attention without moving.",
    "Start with typography, spacing, rhythm and contrast. Choose a memorable truth for each section. Only after the still frame works should interaction add information, feedback or delight.",
    "For portfolios, useful movement makes transitions easier to follow, reveals relationships between projects and communicates care. It should never keep visitors from reading or navigating."
  ]},
  {slug:"performance-is-design",category:"ENGINEERING",title:"Performance is part of design.",summary:"Beautiful interfaces must remain usable under ordinary network and device constraints.",body:[
    "Performance is not a score to chase after launch. Fast response, stable layouts and readable first paint change how an experience feels long before a user notices the individual pixels.",
    "Start with what needs to load. Reserve dimensions for media. Keep interaction code isolated. Delay heavyweight visuals until they matter, and render composed fallbacks whenever WebGL or motion is unavailable.",
    "A premium site should be enjoyable on a modest phone, not only on a designer's desktop."
  ]},
  {slug:"reliable-systems",category:"WORDPRESS / INFRA",title:"Craft doesn't stop at deploy.",summary:"Where frontend polish meets uptime, maintenance and production responsibility.",body:[
    "Interfaces are only one side of web quality. Behind every interaction sit domains, certificates, backups, hosting, email systems and a path to recovery when something breaks.",
    "The most resilient projects treat deployment and ongoing maintenance as parts of the design process, not invisible chores postponed until emergencies.",
    "Great experiences balance visual ambition with operational simplicity: easy to update, safe to maintain and practical to hand over."
  ]}
] as const;
