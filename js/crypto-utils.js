export const CryptoUtils = {
    async deriveKey(password, salt) {
        const enc = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
            "raw",
            enc.encode(password),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        return window.crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: salt,
                iterations: 100000,
                hash: "SHA-256"
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
    },

    async encryptData(data, password) {
        try {
            const salt = window.crypto.getRandomValues(new Uint8Array(16));
            const key = await this.deriveKey(password, salt);
            return await this.encryptWithKey(data, key, salt);
        } catch (e) {
            console.error("Encryption failed:", e);
            throw new Error("Şifreleme başarısız oldu.");
        }
    },

    async encryptWithKey(data, key, salt) {
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const enc = new TextEncoder();
        const encodedData = enc.encode(JSON.stringify(data));

        const encryptedContent = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            encodedData
        );

        // Combine salt + iv + encrypted data
        // Salt is needed even if we have the key, to conform to the storage format
        // But wait, if we use a pre-derived key, the salt is fixed for that key.
        // However, our storage format expects [Salt(16) + IV(12) + Data].
        // So we must properly store the salt that was used to derive THIS key.

        const buffer = new Uint8Array(salt.byteLength + iv.byteLength + encryptedContent.byteLength);
        buffer.set(salt, 0);
        buffer.set(iv, salt.byteLength);
        buffer.set(new Uint8Array(encryptedContent), salt.byteLength + iv.byteLength);

        return btoa(String.fromCharCode.apply(null, buffer));
    },

    async decryptData(encryptedData, password) {
        try {
            const { salt, iv, data } = this.parseEncryptedData(encryptedData);
            const key = await this.deriveKey(password, salt);
            return await this.decryptWithKey(data, key, iv);
        } catch (e) {
            console.error("Decryption failed:", e);
            throw new Error("Şifre çözme başarısız oldu. Parola yanlış olabilir.");
        }
    },

    parseEncryptedData(encryptedData) {
        const binaryString = atob(encryptedData);
        const buffer = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            buffer[i] = binaryString.charCodeAt(i);
        }

        return {
            salt: buffer.slice(0, 16),
            iv: buffer.slice(16, 28),
            data: buffer.slice(28)
        };
    },

    async decryptWithKey(data, key, iv) {
        const decryptedContent = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            data
        );

        const dec = new TextDecoder();
        return JSON.parse(dec.decode(decryptedContent));
    }
};
