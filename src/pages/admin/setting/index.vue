<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import type { Admin } from "@/types/admin";
import { useAdminStore } from "@/stores/admin";
import { useToast } from "primevue";
import { getCurrentUser } from "vuefire";

const store = useAdminStore();
const toast = useToast();
const admin = reactive<Admin>({
  uid: "",
  displayName: "",
  email: "",
  photoURL: "",
  phoneNumber: "",
  password: "",
});

const newPassword = ref("");
const confirmPassword = ref("");

const image = ref();

onMounted(async () => {
  const data = await getCurrentUser();
  if (data) {
    admin.uid = data.uid;
    admin.displayName = data.displayName || "";
    admin.email = data.email || "";
    admin.photoURL = data.photoURL || "/default.jpg";
    admin.phoneNumber = data.phoneNumber || "";
  }
});

const selectedFile = ref();
function onFileSelect(event: any) {
  selectedFile.value = event;
  const file = event.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    image.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

function validatePassword() {
  if (newPassword.value !== confirmPassword.value) {
    toast.add({
      severity: "error",
      summary: "Password Error!",
      detail: "Password does not match!",
      life: 3000,
    });
    return false;
  }
  admin.password = newPassword.value;
  return true;
}

async function updateProfile(payload: any) {
  if (!validatePassword()) return;

  const res = await store.updateAdmin({
    uid: payload.uid,
    body: { ...payload, photoURL: selectedFile.value },
  });
  toast.add({
    severity: res.status,
    summary: res.statusMessage || "Upload Status",
    detail: res.message,
    life: 3000,
  });
}
</script>
<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 p-4 py-6 md:p-6 border rounded-lg"
  >
    <div class="text-lg font-semibold">Account setting</div>
    <div class="flex flex-col gap-4 mt-4">
      <div class="flex gap-2 items-end">
        <Avatar :image="image" class="mr-2" size="xlarge" v-if="image" />
        <Avatar
          :image="admin.photoURL"
          class="mr-2"
          size="xlarge"
          v-else-if="admin.photoURL"
        />
        <Avatar image="/default.jpg" class="mr-2" size="xlarge" v-else />
        <FileUpload
          mode="basic"
          @select="onFileSelect($event)"
          customUpload
          auto
          severity="secondary"
          class="p-button-outlined"
        />
      </div>
      <div>
        <label for="name">Fullname</label><br />
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText
            v-model="admin.displayName"
            placeholder="Enter your full name"
          />
        </InputGroup>
      </div>
      <div>
        <label for="email">Email</label><br />
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-envelope"></i>
          </InputGroupAddon>
          <InputText v-model="admin.email" placeholder="Email" />
        </InputGroup>
      </div>
      <div>
        <label for="phone">Phone number</label><br />
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-envelope"></i>
          </InputGroupAddon>
          <InputText v-model="admin.phoneNumber" placeholder="Phone Number" />
        </InputGroup>
      </div>

      <div class="p-4 border rounded-lg">
        <span class="text-lg font-semibold">Change Password</span><br />
        <div class="flex gap-4 flex-wrap">
          <div>
            <label for="password">New Password</label><br />
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <Password
                v-model="newPassword"
                placeholder="new password"
                :feedback="false"
                toggleMask
              />
            </InputGroup>
          </div>
          <div>
            <label for="password">Confirm password</label><br />
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <Password
                v-model="confirmPassword"
                placeholder="confirm password"
                :feedback="false"
                toggleMask
              />
            </InputGroup>
          </div>
        </div>
      </div>
      <div>
        <Button
          label="Update"
          :loading="store.isLoading"
          @click="updateProfile(admin)"
        />
      </div>
    </div>
  </div>
</template>
