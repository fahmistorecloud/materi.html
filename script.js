// ================================================================
//  EDUSCIENCE KOCAK - SCRIPT.JS
//  Full: Login, Register, Member Online, Tes IQ, Video, Download
// ================================================================

(function() {
    "use strict";

    // ============================================================
    //  DATA SOAL TES IQ (30 Soal)
    // ============================================================
    const soalData = [
        { kategori: "fisika", soal: "Apa yang menyebabkan benda jatuh ke bumi?", opsi: ["Gravitasi", "Magnet", "Angin", "Listrik"], jawaban: 0 },
        { kategori: "fisika", soal: "Satuan gaya dalam SI adalah...", opsi: ["Joule", "Watt", "Newton", "Pascal"], jawaban: 2 },
        { kategori: "fisika", soal: "Bunyi merambat paling cepat melalui...", opsi: ["Udara", "Air", "Baja", "Vakum"], jawaban: 2 },
        { kategori: "fisika", soal: "Hukum Ohm menghubungkan arus dan...", opsi: ["Tegangan", "Gaya", "Energi", "Suhu"], jawaban: 0 },
        { kategori: "fisika", soal: "Cahaya termasuk gelombang...", opsi: ["Mekanik", "Elektromagnetik", "Bunyi", "Air"], jawaban: 1 },
        { kategori: "fisika", soal: "Sifat benda yang mempertahankan gerak adalah...", opsi: ["Inersia", "Momentum", "Energi", "Tekanan"], jawaban: 0 },
        { kategori: "fisika", soal: "Rumus energi kinetik adalah...", opsi: ["½mv²", "mgh", "F.s", "P.t"], jawaban: 0 },
        { kategori: "fisika", soal: "Penghantar listrik yang baik disebut...", opsi: ["Isolator", "Konduktor", "Semikonduktor", "Dielektrik"], jawaban: 1 },
        { kategori: "matematika", soal: "Hasil dari 2 + 3 × 4 = ...", opsi: ["14", "20", "24", "9"], jawaban: 0 },
        { kategori: "matematika", soal: "Akar kuadrat dari 144 = ...", opsi: ["10", "11", "12", "13"], jawaban: 2 },
        { kategori: "matematika", soal: "Bentuk sederhana dari 8/12 = ...", opsi: ["2/3", "4/6", "3/4", "1/2"], jawaban: 0 },
        { kategori: "matematika", soal: "Luas lingkaran dengan r=7 cm = ...", opsi: ["49π", "14π", "7π", "28π"], jawaban: 0 },
        { kategori: "matematika", soal: "Nilai x dari 2x+3=11 = ...", opsi: ["3", "4", "5", "6"], jawaban: 1 },
        { kategori: "matematika", soal: "5! (faktorial) = ...", opsi: ["60", "120", "24", "720"], jawaban: 1 },
        { kategori: "matematika", soal: "Gradien garis y = 2x + 3 = ...", opsi: ["2", "3", "-2", "-3"], jawaban: 0 },
        { kategori: "astronomi", soal: "Planet terbesar di tata surya adalah...", opsi: ["Saturnus", "Jupiter", "Uranus", "Neptunus"], jawaban: 1 },
        { kategori: "astronomi", soal: "Bintang terdekat dengan Bumi adalah...", opsi: ["Alpha Centauri", "Proxima Centauri", "Matahari", "Sirius"], jawaban: 2 },
        { kategori: "astronomi", soal: "Gerhana bulan terjadi karena...", opsi: ["Bumi di antara Matahari & Bulan", "Bulan di antara Bumi & Matahari", "Bulan & Bumi sejajar", "Semua salah"], jawaban: 0 },
        { kategori: "astronomi", soal: "Planet dengan cincin terindah adalah...", opsi: ["Jupiter", "Saturnus", "Uranus", "Neptunus"], jawaban: 1 },
        { kategori: "astronomi", soal: "Galaksi terdekat dengan Bima Sakti adalah...", opsi: ["Andromeda", "Triangulum", "Sombrero", "Canis Major"], jawaban: 0 },
        { kategori: "astronomi", soal: "Lubang hitam memiliki gravitasi kuat karena...", opsi: ["Massa besar", "Kepadatan tinggi", "Ukuran kecil", "Semua benar"], jawaban: 3 },
        { kategori: "astronomi", soal: "Planet yang disebut 'Bumi Kembar' adalah...", opsi: ["Mars", "Venus", "Merkurius", "Jupiter"], jawaban: 1 },
        { kategori: "coding", soal: "HTML adalah singkatan dari...", opsi: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], jawaban: 0 },
        { kategori: "coding", soal: "CSS digunakan untuk...", opsi: ["Struktur halaman", "Styling halaman", "Logika halaman", "Database"], jawaban: 1 },
        { kategori: "coding", soal: "JavaScript berjalan di...", opsi: ["Server", "Browser/Client", "Database", "Semua benar"], jawaban: 1 },
        { kategori: "coding", soal: "Output console.log('Hello' + 'World') = ...", opsi: ["HelloWorld", "Hello World", "Hello+World", "Error"], jawaban: 0 },
        { kategori: "coding", soal: "Tag HTML untuk membuat link adalah...", opsi: ["<link>", "<a>", "<href>", "<url>"], jawaban: 1 },
        { kategori: "coding", soal: "Python adalah bahasa...", opsi: ["Interpreted", "Compiled", "Assembly", "Machine Code"], jawaban: 0 },
        { kategori: "coding", soal: "Algoritma adalah...", opsi: ["Langkah logis selesaikan masalah", "Bahasa pemrograman", "Aplikasi komputer", "Database"], jawaban: 0 },
        { kategori: "coding", soal: "Tag HTML untuk gambar adalah...", opsi: ["<img>", "<image>", "<pic>", "<src>"], jawaban: 0 }
    ];

    // ============================================================
    //  STORAGE & AUTH
    // ============================================================
    let users = [];

    function loadUsers() {
        const stored = localStorage.getItem("eduscience_users");
        if (stored) {
            try { users = JSON.parse(stored); } catch (e) { users = []; }
        } else {
            users = [{ username: "admin", email: "admin@test.com", password: "admin123" }];
            saveUsers();
        }
    }

    function saveUsers() {
        localStorage.setItem("eduscience_users", JSON.stringify(users));
    }

    let currentUser = null;

    function checkSession() {
        const session = localStorage.getItem("eduscience_session");
        if (session) {
            try {
                const parsed = JSON.parse(session);
                const found = users.find(u => u.username === parsed.username && u.password === parsed.password);
                if (found) { currentUser = found; return true; }
            } catch (e) { return false; }
        }
        return false;
    }

    function saveSession(user) {
        localStorage.setItem("eduscience_session", JSON.stringify({ username: user.username, password: user.password }));
        currentUser = user;
    }

    function clearSession() {
        localStorage.removeItem("eduscience_session");
        currentUser = null;
    }

    // ============================================================
    //  MEMBER ONLINE SYSTEM
    // ============================================================
    let onlineMembers = [];
    let activityLog = [];

    function loadMemberData() {
        const stored = localStorage.getItem("eduscience_online");
        if (stored) {
            try {
                const data = JSON.parse(stored);
                onlineMembers = data.online || [];
                activityLog = data.activity || [];
            } catch (e) {
                onlineMembers = [];
                activityLog = [];
            }
        }
        if (checkSession() && currentUser) {
            const isOnline = onlineMembers.find(m => m.username === currentUser.username);
            if (!isOnline) {
                onlineMembers.push({
                    username: currentUser.username,
                    status: 'online',
                    lastActive: new Date().toISOString(),
                    activity: 'Online'
                });
                addActivity(currentUser.username, '🟢 Login', 'online');
                saveMemberData();
            }
        }
    }

    function saveMemberData() {
        localStorage.setItem("eduscience_online", JSON.stringify({
            online: onlineMembers,
            activity: activityLog
        }));
    }

    function addActivity(username, action, status) {
        const time = new Date().toLocaleTimeString();
        activityLog.unshift({
            username: username,
            action: action,
            status: status,
            time: time,
            timestamp: new Date().toISOString()
        });
        if (activityLog.length > 50) {
            activityLog = activityLog.slice(0, 50);
        }
        saveMemberData();
    }

    // Fungsi global untuk update member list
    window.updateMemberList = function() {
        const memberList = document.getElementById('memberList');
        const totalMember = document.getElementById('totalMember');
        const onlineMember = document.getElementById('onlineMember');
        const offlineMember = document.getElementById('offlineMember');
        const onlineCount = document.getElementById('onlineCount');
        const sidebarBadge = document.getElementById('sidebarBadge');
        const lastUpdate = document.getElementById('lastUpdate');

        const allUsers = users;
        const online = onlineMembers.filter(m => m.status === 'online');
        const offlineCount = allUsers.length - online.length;
        
        if (totalMember) totalMember.textContent = allUsers.length;
        if (onlineMember) onlineMember.textContent = online.length;
        if (offlineMember) offlineMember.textContent = offlineCount >= 0 ? offlineCount : 0;
        if (onlineCount) onlineCount.textContent = online.length;
        if (sidebarBadge) sidebarBadge.textContent = online.length;

        const now = new Date();
        if (lastUpdate) lastUpdate.textContent = `Terakhir update: ${now.toLocaleTimeString()} ${now.toLocaleDateString()}`;

        updateStatistikTentang();

        if (!memberList) return;

        if (allUsers.length === 0) {
            memberList.innerHTML = `
                <div class="member-empty">
                    <i class="fas fa-users"></i>
                    <p>Belum ada member yang terdaftar</p>
                </div>
            `;
            return;
        }

        memberList.innerHTML = '';
        allUsers.forEach(user => {
            const isOnline = onlineMembers.find(m => m.username === user.username && m.status === 'online');
            const memberData = onlineMembers.find(m => m.username === user.username);
            
            const div = document.createElement('div');
            div.className = 'member-item';
            div.innerHTML = `
                <div class="member-username">
                    <span class="online-dot ${isOnline ? 'online' : 'offline'}"></span>
                    ${user.username} ${user.username === 'admin' ? '👑' : ''}
                </div>
                <span class="member-status ${isOnline ? 'online' : 'offline'}">
                    ${isOnline ? '🟢 Online' : '⚪ Offline'}
                </span>
                <span class="member-activity-time">
                    ${isOnline ? (memberData?.activity || 'Online') : '-'}
                </span>
            `;
            memberList.appendChild(div);
        });

        const activityLogEl = document.getElementById('activityLog');
        if (!activityLogEl) return;
        
        if (activityLog.length === 0) {
            activityLogEl.innerHTML = '<p class="activity-empty">Belum ada aktivitas</p>';
        } else {
            activityLogEl.innerHTML = activityLog.slice(0, 15).map(log => `
                <div class="activity-item">
                    <span class="activity-icon">${log.action.includes('🟢') ? '🟢' : log.action.includes('🔴') ? '🔴' : '📱'}</span>
                    <span><strong>${log.username}</strong> ${log.action}</span>
                    <span class="activity-time">${log.time}</span>
                </div>
            `).join('');
        }
    };

    // ============================================================
    //  UPDATE STATISTIK TENTANG
    // ============================================================
    function updateStatistikTentang() {
        const statMember = document.getElementById('statMember');
        if (statMember) {
            statMember.textContent = users.length;
        }
    }

    // ============================================================
    //  DOM Elements
    // ============================================================
    const registerModal = document.getElementById("registerModal");
    const loginModal = document.getElementById("loginModal");
    const regUsername = document.getElementById("regUsername");
    const regEmail = document.getElementById("regEmail");
    const regPassword = document.getElementById("regPassword");
    const regConfirmPassword = document.getElementById("regConfirmPassword");
    const registerBtn = document.getElementById("registerBtn");
    const loginUsername = document.getElementById("loginUsername");
    const loginPassword = document.getElementById("loginPassword");
    const loginModalBtn = document.getElementById("loginModalBtn");
    const switchToLogin = document.getElementById("switchToLogin");
    const switchToRegister = document.getElementById("switchToRegister");

    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sidebarLogin = document.getElementById("sidebarLogin");
    const sidebarLogout = document.getElementById("sidebarLogout");
    const sidebarAdmin = document.getElementById("sidebarAdmin");

    const adminPanel = document.getElementById("page-admin");
    const loginStatus = document.getElementById("loginStatus");
    const adminUsername = document.getElementById("adminUsername");
    const resetTawkBtn = document.getElementById("resetTawkBtn");

    const userGreeting = document.getElementById("userGreeting");
    const greetingUsername = document.getElementById("greetingUsername");

    const tesContainer = document.getElementById("tesContainer");
    const submitTesBtn = document.getElementById("submitTesBtn");
    const resetTesBtn = document.getElementById("resetTesBtn");
    const hasilTes = document.getElementById("hasilTes");

    const videoModal = document.getElementById("videoModal");
    const videoIframe = document.getElementById("videoIframe");
    const videoTitle = document.getElementById("videoTitle");

    const bgMusic = document.getElementById("bgMusic");
    const musicToggleBtn = document.getElementById("musicToggleBtn");
    const musicStatus = document.getElementById("musicStatus");

    let isMusicPlaying = false;
    let musicStarted = false;
    let jawabanUser = {};

    // ============================================================
    //  NAVIGASI HALAMAN (Global)
    // ============================================================
    window.navigateTo = function(page) {
        document.querySelectorAll('.page-content').forEach(el => {
            el.classList.remove('active');
            el.style.display = 'none';
        });

        const targetPage = document.getElementById('page-' + page);
        if (targetPage) {
            targetPage.style.display = 'block';
            setTimeout(() => { targetPage.classList.add('active'); }, 50);
            
            if (page === 'member') {
                window.updateMemberList();
            }
            if (page === 'tentang') {
                updateStatistikTentang();
            }
        }

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });

        closeSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ============================================================
    //  SIDEBAR
    // ============================================================
    function openSidebar() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }
    menuToggle.addEventListener('click', openSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
    sidebarClose.addEventListener('click', closeSidebar);

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            
            if (page === 'admin') {
                if (!checkSession()) {
                    alert('⚠️ Login dulu untuk akses Admin!');
                    closeSidebar();
                    return;
                }
                window.navigateTo('admin');
                return;
            }
            if (page === 'logout') {
                handleLogout();
                closeSidebar();
                return;
            }
            if (page === 'login') {
                if (checkSession()) {
                    alert('🤪 Udah login kok!');
                    closeSidebar();
                    return;
                }
                loginModal.classList.remove('hidden');
                closeSidebar();
                return;
            }
            window.navigateTo(page);
        });
    });

    // ============================================================
    //  VIDEO
    // ============================================================
    window.playVideo = function(url, title) {
        if (!videoTitle || !videoIframe || !videoModal) return;
        videoTitle.textContent = title || 'Video Pembelajaran';
        videoIframe.src = url;
        videoModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    window.closeVideo = function() {
        if (!videoModal || !videoIframe) return;
        videoModal.classList.remove('show');
        videoIframe.src = '';
        document.body.style.overflow = '';
    };

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { window.closeVideo(); }
    });
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) { window.closeVideo(); }
        });
    }

    // ============================================================
    //  DOWNLOAD
    // ============================================================
    window.downloadFile = function(filename, message) {
        alert(message || '📥 ' + filename + ' sedang di-download...');
        const link = document.createElement('a');
        link.href = '#';
        link.download = filename;
        link.click();
        setTimeout(() => {
            alert('✅ ' + filename + ' berhasil di-download!');
        }, 500);
    };

    // ============================================================
    //  RENDER SOAL
    // ============================================================
    function renderSoal() {
        if (!tesContainer) return;
        tesContainer.innerHTML = "";
        soalData.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "soal-item";
            const kategoriLabel = item.kategori.charAt(0).toUpperCase() + item.kategori.slice(1);
            const huruf = ['A', 'B', 'C', 'D'];
            div.innerHTML = `
                <div class="soal-header">
                    <span class="soal-nomor">${index + 1}</span>
                    <span class="soal-kategori ${item.kategori}">${kategoriLabel}</span>
                </div>
                <div class="soal-text">${item.soal}</div>
                <div class="soal-opsi">
                    ${item.opsi.map((opsi, i) => `
                        <label>
                            <input type="radio" name="soal${index}" value="${i}" />
                            <span class="opsi-huruf">${huruf[i]}.</span> ${opsi}
                        </label>
                    `).join('')}
                </div>
            `;
            tesContainer.appendChild(div);
            if (jawabanUser[index] !== undefined) {
                const radio = div.querySelector(`input[value="${jawabanUser[index]}"]`);
                if (radio) radio.checked = true;
            }
            div.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    jawabanUser[index] = parseInt(this.value);
                });
            });
        });
    }

    // ============================================================
    //  SUBMIT TES
    // ============================================================
    function submitTes() {
        let benar = 0;
        let kategoriBenar = { fisika: 0, matematika: 0, astronomi: 0, coding: 0 };
        let kategoriTotal = { fisika: 0, matematika: 0, astronomi: 0, coding: 0 };

        soalData.forEach((item, index) => {
            const jawaban = jawabanUser[index];
            const kat = item.kategori;
            kategoriTotal[kat] = (kategoriTotal[kat] || 0) + 1;
            if (jawaban !== undefined && jawaban === item.jawaban) {
                benar++;
                kategoriBenar[kat] = (kategoriBenar[kat] || 0) + 1;
            }
        });

        const total = soalData.length;
        const nilai = Math.round((benar / total) * 100);

        const hasilIcon = document.getElementById("hasilIcon");
        const hasilTitle = document.getElementById("hasilTitle");
        const nilaiAkhir = document.getElementById("nilaiAkhir");
        const hasilMessage = document.getElementById("hasilMessage");
        const benarCount = document.getElementById("benarCount");
        const totalSoal = document.getElementById("totalSoal");
        const hasilKategori = document.getElementById("hasilKategori");

        if (hasilIcon) hasilIcon.textContent = nilai >= 80 ? "🧠" : nilai >= 60 ? "🤓" : nilai >= 40 ? "😅" : "🤣";
        if (hasilTitle) hasilTitle.textContent = "Hasil Tes IQ Kamu!";
        if (nilaiAkhir) nilaiAkhir.textContent = nilai + "%";
        if (hasilMessage) hasilMessage.textContent = nilai >= 80 ? "Wah! Kamu benar-benar jenius! 🤯" : nilai >= 60 ? "Cukup pintar! Terus belajar! 📚" : nilai >= 40 ? "Belajar lagi! 💪" : "Santuy! Ini cuma tes kocak! 😂";
        if (benarCount) benarCount.textContent = benar;
        if (totalSoal) totalSoal.textContent = total;
        
        const kategori = nilai >= 80 ? "⭐ GENIUS!" : nilai >= 60 ? "📖 PINTAR" : nilai >= 40 ? "📝 BELAJAR LAGI" : "😜 KOCAK!";
        const warna = nilai >= 80 ? "#27ae60" : nilai >= 60 ? "#f39c12" : nilai >= 40 ? "#e67e22" : "#e74c3c";
        if (hasilKategori) {
            hasilKategori.textContent = kategori;
            hasilKategori.style.color = warna;
            hasilKategori.style.border = `3px solid ${warna}`;
        }

        const rincianFisika = document.getElementById("rincianFisika");
        const rincianMatematika = document.getElementById("rincianMatematika");
        const rincianAstronomi = document.getElementById("rincianAstronomi");
        const rincianCoding = document.getElementById("rincianCoding");
        
        if (rincianFisika) rincianFisika.textContent = `Fisika: ${kategoriBenar.fisika || 0}/${kategoriTotal.fisika || 0}`;
        if (rincianMatematika) rincianMatematika.textContent = `Matematika: ${kategoriBenar.matematika || 0}/${kategoriTotal.matematika || 0}`;
        if (rincianAstronomi) rincianAstronomi.textContent = `Astronomi: ${kategoriBenar.astronomi || 0}/${kategoriTotal.astronomi || 0}`;
        if (rincianCoding) rincianCoding.textContent = `Coding: ${kategoriBenar.coding || 0}/${kategoriTotal.coding || 0}`;

        if (tesContainer) tesContainer.style.display = "none";
        if (submitTesBtn) submitTesBtn.style.display = "none";
        if (hasilTes) {
            hasilTes.style.display = "block";
            hasilTes.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    function resetTes() {
        jawabanUser = {};
        if (hasilTes) hasilTes.style.display = "none";
        if (tesContainer) tesContainer.style.display = "flex";
        if (submitTesBtn) submitTesBtn.style.display = "flex";
        renderSoal();
        if (tesContainer) tesContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // ============================================================
    //  MUSIC
    // ============================================================
    if (bgMusic) { bgMusic.volume = 0.25; bgMusic.loop = true; }
    function startMusic() {
        if (!bgMusic || musicStarted) return;
        bgMusic.play().then(() => { isMusicPlaying = true; musicStarted = true; updateMusicUI(); }).catch(() => { isMusicPlaying = false; updateMusicUI(); });
    }
    function toggleMusic() {
        if (!bgMusic) return;
        if (bgMusic.paused) {
            bgMusic.play().then(() => { isMusicPlaying = true; updateMusicUI(); }).catch(() => { isMusicPlaying = false; updateMusicUI(); });
        } else {
            bgMusic.pause();
            isMusicPlaying = false;
            updateMusicUI();
        }
    }
    function updateMusicUI() {
        if (!musicToggleBtn || !musicStatus) return;
        if (isMusicPlaying) {
            musicToggleBtn.classList.add("playing");
            musicToggleBtn.innerHTML = '<i class="fas fa-music"></i>';
            musicStatus.textContent = "🎵 Musik diputar 🎶";
            musicStatus.className = "status-playing";
        } else {
            musicToggleBtn.classList.remove("playing");
            musicToggleBtn.innerHTML = '<i class="fas fa-music"></i>';
            musicStatus.textContent = "⏸️ Musik dijeda";
            musicStatus.className = "status-paused";
        }
    }

    // ============================================================
    //  REGISTER, LOGIN, LOGOUT
    // ============================================================
    function handleRegister() {
        const username = regUsername.value.trim();
        const email = regEmail.value.trim();
        const password = regPassword.value.trim();
        const confirmPass = regConfirmPassword.value.trim();
        if (!username || username.length < 3) { alert("⚠️ Username minimal 3 karakter!"); return; }
        if (!email || !email.includes("@")) { alert("⚠️ Email tidak valid!"); return; }
        if (!password || password.length < 4) { alert("⚠️ Password minimal 4 karakter!"); return; }
        if (password !== confirmPass) { alert("⚠️ Password tidak sama!"); return; }
        if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) { alert("❌ Username sudah dipakai!"); return; }
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) { alert("❌ Email sudah terdaftar!"); return; }
        
        users.push({ username, email, password });
        saveUsers();
        alert("🎉 Registrasi berhasil! Login yuk!");
        
        regUsername.value = ""; regEmail.value = ""; regPassword.value = ""; regConfirmPassword.value = "";
        registerModal.classList.add("hidden");
        loginModal.classList.remove("hidden");
        setTimeout(() => { loginUsername.value = username; loginPassword.focus(); }, 300);
        
        updateStatistikTentang();
    }

    function handleLoginModal() {
        const username = loginUsername.value.trim();
        const password = loginPassword.value.trim();
        if (!username || !password) { alert("⚠️ Isi semua!"); return; }
        const found = users.find(u => u.username === username && u.password === password);
        if (found) {
            saveSession(found);
            
            const isOnline = onlineMembers.find(m => m.username === username);
            if (!isOnline) {
                onlineMembers.push({
                    username: username,
                    status: 'online',
                    lastActive: new Date().toISOString(),
                    activity: 'Online'
                });
                addActivity(username, '🟢 Login', 'online');
                saveMemberData();
            }
            
            alert("🎉 Login berhasil!");
            loginModal.classList.add("hidden");
            updateUI();
            if (!musicStarted) startMusic();
            window.navigateTo('beranda');
            window.updateMemberList();
            updateStatistikTentang();
        } else {
            alert("❌ Username atau password salah!");
            loginPassword.value = "";
            loginPassword.focus();
        }
    }

    function handleLogout() {
        if (confirm("Yakin logout? 😅")) {
            if (currentUser) {
                onlineMembers = onlineMembers.filter(m => m.username !== currentUser.username);
                addActivity(currentUser.username, '🔴 Logout', 'offline');
                saveMemberData();
            }
            clearSession();
            alert("👋 Logout berhasil!");
            updateUI();
            loginModal.classList.remove("hidden");
            window.navigateTo('beranda');
            window.updateMemberList();
            updateStatistikTentang();
        }
    }

    function updateUI() {
        const isLoggedIn = checkSession();
        if (isLoggedIn && currentUser) {
            if (sidebarLogin) sidebarLogin.style.display = "none";
            if (sidebarLogout) sidebarLogout.style.display = "flex";
            if (sidebarAdmin) sidebarAdmin.style.display = "flex";
            if (userGreeting) userGreeting.style.display = "inline-block";
            if (greetingUsername) greetingUsername.textContent = currentUser.username;
            if (loginStatus) loginStatus.innerHTML = `<i class="fas fa-check-circle" style="color:#27ae60;"></i> ✅ Login: <strong>${currentUser.username}</strong>`;
            if (adminUsername) adminUsername.textContent = currentUser.username;
        } else {
            if (sidebarLogin) sidebarLogin.style.display = "flex";
            if (sidebarLogout) sidebarLogout.style.display = "none";
            if (sidebarAdmin) sidebarAdmin.style.display = "none";
            if (userGreeting) userGreeting.style.display = "none";
        }
    }

    // ============================================================
    //  RESET TAWK.TO
    // ============================================================
    function resetTawk() {
        if (!checkSession()) { alert("⚠️ Login dulu!"); return; }
        document.querySelectorAll('script[src*="tawk.to"]').forEach(s => s.remove());
        setTimeout(() => {
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/67e8b1c6d2e7f3a1e7b9c5d4/1i9n8m7l6k';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
            alert("🔄 Tawk.to di-reset!");
        }, 300);
    }

    // ============================================================
    //  EVENT LISTENERS
    // ============================================================
    if (registerBtn) registerBtn.addEventListener("click", handleRegister);
    if (regConfirmPassword) {
        regConfirmPassword.addEventListener("keydown", e => { if (e.key === "Enter") registerBtn.click(); });
    }
    if (loginModalBtn) loginModalBtn.addEventListener("click", handleLoginModal);
    if (loginPassword) {
        loginPassword.addEventListener("keydown", e => { if (e.key === "Enter") loginModalBtn.click(); });
    }
    if (loginUsername) {
        loginUsername.addEventListener("keydown", e => { if (e.key === "Enter") loginPassword.focus(); });
    }
    if (switchToLogin) {
        switchToLogin.addEventListener("click", e => { e.preventDefault(); registerModal.classList.add("hidden"); loginModal.classList.remove("hidden"); });
    }
    if (switchToRegister) {
        switchToRegister.addEventListener("click", e => { e.preventDefault(); loginModal.classList.add("hidden"); registerModal.classList.remove("hidden"); });
    }
    if (submitTesBtn) submitTesBtn.addEventListener("click", submitTes);
    if (resetTesBtn) resetTesBtn.addEventListener("click", resetTes);
    if (resetTawkBtn) resetTawkBtn.addEventListener("click", resetTawk);
    if (musicToggleBtn) musicToggleBtn.addEventListener("click", toggleMusic);
    
    document.addEventListener("click", function firstClick() { 
        if (!musicStarted) startMusic(); 
        document.removeEventListener("click", firstClick); 
    }, { once: true });

    // Auto update setiap 30 detik
    setInterval(() => {
        const pageMember = document.getElementById('page-member');
        if (pageMember && pageMember.classList.contains('active')) {
            window.updateMemberList();
        }
        const online = onlineMembers.filter(m => m.status === 'online');
        const sidebarBadge = document.getElementById('sidebarBadge');
        const onlineCount = document.getElementById('onlineCount');
        if (sidebarBadge) sidebarBadge.textContent = online.length;
        if (onlineCount) onlineCount.textContent = online.length;
    }, 30000);

    // ============================================================
    //  INISIALISASI
    // ============================================================
    loadUsers();
    loadMemberData();
    renderSoal();

    if (checkSession()) {
        if (registerModal) registerModal.classList.add("hidden");
        if (loginModal) loginModal.classList.add("hidden");
        updateUI();
        setTimeout(startMusic, 500);
        window.navigateTo('beranda');
    } else {
        if (registerModal) registerModal.classList.remove("hidden");
        if (loginModal) loginModal.classList.add("hidden");
        updateUI();
        window.navigateTo('beranda');
    }
    updateMusicUI();
    window.updateMemberList();
    updateStatistikTentang();

    console.log("✅ EduScience Kocak siap!");
    console.log("📦 Menu: Beranda | Materi | Video | Download | Member Online | Tes IQ | Admin | Tentang");
    console.log("🔑 Login default: admin / admin123");
    console.log("📅 Didirikan tahun 2026!");
    console.log("👥 Fitur Member Online aktif!");
    console.log("🎬 Klik tombol Tonton untuk buka video!");
    console.log("📥 Klik tombol Download untuk download materi!");

})();