const fs = require('fs');
const path = require('path');

console.log('🔍 Testing image access...');

// Check if uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads', 'profiles');
console.log('Uploads directory:', uploadsDir);
console.log('Directory exists:', fs.existsSync(uploadsDir));

if (fs.existsSync(uploadsDir)) {
  const files = fs.readdirSync(uploadsDir);
  console.log('Files in uploads/profiles:');
  files.forEach(file => {
    if (file !== '.gitkeep') {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      console.log(`- ${file} (${(stats.size / 1024).toFixed(2)}KB)`);
      console.log(`  URL: http://localhost:8000/uploads/profiles/${file}`);
    }
  });
  
  console.log('\n💡 Test URLs:');
  console.log('You can test these URLs in your browser to see if images load');
  console.log('Static files are served from: /uploads');
} else {
  console.log('❌ Uploads directory does not exist!');
  console.log('Creating directory...');
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Directory created');
}

console.log('\n🔧 Server static file configuration:');
console.log('Route: app.use(\'/uploads\', express.static(path.join(__dirname, \'../uploads\')))');
console.log('This serves files from: server/uploads/*');
console.log('Accessible at: http://localhost:8000/uploads/*'); 