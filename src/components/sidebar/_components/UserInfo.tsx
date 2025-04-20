"use client";
import React, { useState, useEffect } from "react";
import styles from "../sidebar.module.sass";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postUser } from "@/hooks/user";
import { useAppContext } from "@/context/AppProvider";

const UserInfo = ({
  userModal,
  setUserModal,
  user,
  setUser,
}: {
  userModal: boolean;
  setUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: {
    image: any;
    name: string;
    email: string;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [formData, setFormData] = useState({
    username: "",
    name: user.name,
    subtitle: "",
    password: "",
    confirmPassword: "",
    about: "",
    email: user.email,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { setNotification } = useAppContext();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const usernameRegex = /^[a-zA-Z0-9-_]+$/;
    const passwordRegex = /^[a-zA-Z0-9-_]{6,12}$/;

    if (!formData.username.trim()) {
      errors.username = "Username is required.";
    } else if (!usernameRegex.test(formData.username)) {
      errors.username =
        "Username can only contain English letters, numbers, dashes (-), and underscores (_).";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be between 6-12 characters and can only contain letters, numbers, dashes (-), and underscores (_).";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.about.trim()) {
      errors.about = "About section cannot be empty.";
    }

    setFormErrors(errors);
    setIsFormValid(
      Object.keys(errors).length === 0 &&
        Object.values(formData).every((value) => value.trim() !== "")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateForm();
    const req = await postUser(formData, setNotification, user, setUserModal);
    setUser(req);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div
      style={
        userModal
          ? { opacity: 1, transition: "0.3s all ease", zIndex: 1 }
          : { width: 0, height: 0, opacity: 0, zIndex: -10 }
      }
    >
      <div className={styles.modal}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Tell us about yourself</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="@username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            {formErrors.username && (
              <span className={styles.error}>{formErrors.username}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={user.name}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              disabled
              readOnly
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="subtitle">Subtitle</label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              required
              placeholder="E.g., Software Developer, Artist, etc."
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                minLength={6}
                maxLength={12}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formErrors.password && (
              <span className={styles.error}>{formErrors.password}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formErrors.confirmPassword && (
              <span className={styles.error}>{formErrors.confirmPassword}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="about">About</label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us something about yourself..."
              required
            ></textarea>
            {formErrors.about && (
              <span className={styles.error}>{formErrors.about}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isFormValid}
          >
            Save
          </button>
        </form>
      </div>
      <div
        className={styles.bg}
        style={
          userModal
            ? { opacity: 1, transition: "0.3s all ease", zIndex: 1 }
            : { width: 0, height: 0, opacity: 0, zIndex: -10 }
        }
      />
    </div>
  );
};

export default UserInfo;
